#!/usr/bin/env node
// Smoke test for the RxSoft POS / website-order / purchase workflows.
//
// After seeding (seed: `npm run seed` + `npm run seed -- --http`), verifies the
// happy paths end-to-end against the running backend REST API:
//   login -> user-pos-config/organisation-config -> POS sale -> refund
//         -> website order -> confirm -> post-sale -> complete-sale
//         -> purchase order (approved) -> receive goods
//
// Resolves ids dynamically from list endpoints, so it works against either the
// DEFAULT org (admin/'password') or a freshly provisioned org
// (e.g. MYORG_OWNER/'password'). Exits non-zero on the first failure.
//
// Usage:
//   node scripts/smoke-workflow.mjs
//   RSOFT_BASE=http://localhost:8080/api RSOFT_USERNAME=admin RSOFT_PASSWORD=password node scripts/smoke-workflow.mjs
//
// No external dependencies — plain Node 18+ fetch (no playwright/axios).

const BASE = (process.env.RSOFT_BASE ?? 'http://localhost:8080/api').replace(/\/$/, '');
const USERNAME = process.env.RSOFT_USERNAME ?? 'admin';
const PASSWORD = process.env.RSOFT_PASSWORD ?? 'password';

const results = [];
let token = null;

function ok(label, value) {
  results.push({ label, pass: Boolean(value), detail: typeof value === 'string' ? value : '' });
  return Boolean(value);
}

async function api(path, opts = {}, retry = true) {
  const headers = { 'content-type': 'application/json', ...(opts.headers ?? {}) };
  if (token) headers.authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  if (res.status === 401 && retry && token) {
    await login(true);
    return api(path, opts, false);
  }
  const text = await res.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  return { status: res.status, ok: res.ok, body };
}

async function login(force = false) {
  if (token && !force) return;
  const { ok: loggedIn, body } = await api('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
  }, false);
  if (!loggedIn) throw new Error(`login failed for ${USERNAME} (${body?.message ?? 'unknown error'})`);
  token = body.accessToken;
}

function first(rows, predicate) {
  return (predicate ? rows?.find(predicate) : rows?.[0]) ?? null;
}
function listData(res) {
  return Array.isArray(res.body) ? res.body : res.body?.data ?? [];
}

async function main() {
  await login();
  ok('login', Boolean(token));

  // ── configs auto-create on first read ────────────────────────────────
  const upc = await api('/user-pos-config/me');
  ok('user-pos-config/me', upc.ok, `status ${upc.status}`);
  const orgCfg = await api('/organisation-config');
  ok('organisation-config', orgCfg.ok, `status ${orgCfg.status}`);

  // ── reference resolution ─────────────────────────────────────────────
  const itemsRes = await api('/items/me');
  ok('items/me (org whitelist)', itemsRes.ok, `status ${itemsRes.status}`);
  const items = listData(itemsRes);
  const item = first(items);
  ok('an item is whitelisted for the org', Boolean(item));

  let stockLocation = null;
  const stockRes = await api('/stock-locations?limit=20');
  ok('stock-locations list', stockRes.ok, `status ${stockRes.status}`);
  const stockLocations = listData(stockRes);
  stockLocation =
    first(stockLocations, (s) => s.locationType === 'inventory') ??
    first(stockLocations);
  ok('a sale stock location exists', Boolean(stockLocation), stockLocation?.code ?? '');

  let retailPrice = null;
  let priceListId = null;
  const plRes = await api('/price-lists?limit=50');
  ok('price-lists list', plRes.ok, `status ${plRes.status}`);
  const priceLists = listData(plRes);
  const pl = first(priceLists, (p) => p.isDefault) ?? first(priceLists);
  if (pl) {
    priceListId = pl.id;
    const pli = await api(`/price-lists/${pl.id}/items`);
    const pliRows = listData(pli);
    const row = first(pliRows, (r) => r.itemId === item?.id);
    retailPrice = row?.unitPrice ?? null;
  }
  ok('a default retail price list exists', Boolean(priceListId), pl?.code ?? '');

  const payRes = await api('/payment-methods?limit=50');
  const cash = first(listData(payRes), (m) => m.code === 'CASH') ?? first(listData(payRes));
  ok('a payment method (CASH preferred) exists', Boolean(cash), cash?.code ?? '');

  let customer = null;
  const custRes = await api('/customers?limit=5');
  if (custRes.ok) customer = first(listData(custRes));
  ok('a customer exists (optional)', true, customer ? '' : 'will use walk-in (no customerId)');

  let supplier = null;
  const supRes = await api('/suppliers?limit=5');
  ok('suppliers list', supRes.ok, `status ${supRes.status}`);
  supplier = first(listData(supRes));

  let warehouse = null;
  const whRes = await api('/warehouses?limit=5');
  ok('warehouses list', whRes.ok, `status ${whRes.status}`);
  warehouse = first(listData(whRes));

  const itemId = item?.id;
  const uomId = item?.saleUomId ?? item?.baseUomId ?? null;

  // ── POS sale + refund ────────────────────────────────────────────────
  const saleNumber = `SMOKE-${Date.now()}`;
  const salePayload = {
    saleNumber,
    saleChannel: 'pos',
    storeId: 'default',
    ...(stockLocation ? { stockLocationId: stockLocation.id } : {}),
    customerId: customer?.id ?? null,
    lines: [{ itemId, uomId, quantity: 1, unitPrice: retailPrice ?? 100, uomFactor: 1 }],
    payments: [{ paymentMethodId: cash?.id, amount: retailPrice ?? 100 }],
  };
  const saleRes = await api('/sales', { method: 'POST', body: JSON.stringify(salePayload) });
  ok(
    `create POS sale ${saleNumber}`,
    saleRes.ok && saleRes.body?.status === 'posted',
    `status=${saleRes.status} body=${JSON.stringify(saleRes.body ?? {}).slice(0, 200)}`,
  );
  const saleId = saleRes.body?.id;

  if (saleId) {
    const detail = await api(`/sales/${saleId}`);
    const saleLine = first(listData(detail) ?? detail.body?.lines ?? []);
    const refundRes = await api(`/sales/${saleId}/refunds`, {
      method: 'POST',
      body: JSON.stringify({
        reason: 'smoke test refund',
        lines: saleLine
          ? [{ saleLineId: saleLine.id, quantity: 1 }]
          : [],
      }),
    });
    ok('refund POS sale', refundRes.ok && refundRes.body?.status === 'posted', `status=${refundRes.status}`);
  }

  // ── website order -> confirm -> post-sale -> complete-sale ───────────
  let orderId = null;
  const orderRes = await api('/website/orders', {
    method: 'POST',
    body: JSON.stringify({
      paymentMethod: 'CASH',
      notes: 'smoke test',
      items: [{ itemId, quantity: 1, unitPrice: retailPrice ?? 100 }],
    }),
  });
  orderId = orderRes.body?.id ?? orderRes.body?.order?.id ?? null;
  ok(`create website order`, orderRes.ok && orderId, `status=${orderRes.status}`);

  if (orderId) {
    const confirmRes = await api(`/orders/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'confirmed' }),
    });
    ok('confirm website order', confirmRes.ok, `status=${confirmRes.status}`);
    const postRes = await api(`/orders/admin/orders/${orderId}/post-sale`, {
      method: 'POST',
      body: JSON.stringify({ stockLocationId: stockLocation?.id }),
    });
    const draftSaleId = postRes.body?.id ?? postRes.body?.saleId ?? null;
    ok('post order as draft sale', postRes.ok && draftSaleId, `status=${postRes.status}`);
    if (draftSaleId) {
      const completeRes = await api(`/orders/admin/complete-sale/${draftSaleId}`, {
        method: 'POST',
      });
      ok('complete draft sale', completeRes.ok, `status=${completeRes.status}`);
    }
  }

  // ── purchase order (approved) + receive goods ────────────────────────
  let poId = null;
  const poNumber = `SMOKE-PO-${Date.now()}`;
  const poRes = await api('/purchases', {
    method: 'POST',
    body: JSON.stringify({
      supplierId: supplier?.id,
      warehouseId: warehouse?.id,
      purchaseOrderNumber: poNumber,
      status: 'approved',
      lines: [{ itemId, uomId, orderedQty: 5, unitCost: 50, receivedQty: 0 }],
    }),
  });
  poId = poRes.body?.id ?? null;
  ok(
    `create approved purchase order ${poNumber}`,
    poRes.ok && poId && ['approved', 'received', 'partially_received'].includes(poRes.body?.status),
    `status=${poRes.status}`,
  );

  if (poId) {
    const receiveRes = await api(`/purchases/${poId}/receive`, {
      method: 'POST',
      body: JSON.stringify({
        purchaseOrderId: poId,
        receivedDate: new Date().toISOString(),
        receiptNumber: `SMOKE-GR-${Date.now()}`,
        lines: [{ itemId, receivedQty: 5, uomId, unitCost: 50 }],
      }),
    });
    ok('receive goods (stock in)', receiveRes.ok, `status=${receiveRes.status}`);
  }

  // ── report ───────────────────────────────────────────────────────────
  const width = Math.max(...results.map((r) => r.label.length)) + 2;
  let failed = 0;
  for (const r of results) {
    if (!r.pass) failed++;
    console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.label.padEnd(width)}${r.detail}`);
  }
  console.log(`\n${results.length - failed}/${results.length} passed`);
  if (failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error('SMOKE FAILED:', err.message);
  process.exitCode = 1;
});