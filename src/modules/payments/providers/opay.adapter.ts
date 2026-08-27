import axios from 'axios';
import { createHmac } from 'crypto';
import {
  InitiatePaymentInput,
  InitiatePaymentOutput,
  PaymentProviderAdapter,
  PosInitiateInput,
  PosInitiateOutput,
  ProviderContext,
  VerifyPaymentOutput,
  WebhookVerificationInput,
  WebhookVerificationOutput,
} from './payment-provider.adapter';
import { normalizeProviderStatus } from './status-map';

const DEFAULT_LIVE_BASE_URL = 'https://liveapi.opaycheckout.com';
const DEFAULT_SANDBOX_BASE_URL = 'https://testapi.opaycheckout.com';

function baseUrl(
  creds: ProviderContext['creds'],
  isProduction: boolean,
): string {
  if (isProduction) return creds.baseUrl || DEFAULT_LIVE_BASE_URL;
  return creds.sandboxBaseUrl || DEFAULT_SANDBOX_BASE_URL;
}

function requireMerchant(ctx: ProviderContext): {
  merchantId: string;
  publicKey: string;
  secretKey: string;
} {
  const merchantId = ctx.creds.merchantId;
  const publicKey = ctx.creds.publicKey;
  const secretKey = ctx.creds.secretKey;
  if (!merchantId) throw new Error('OPay merchantId is not configured');
  if (!publicKey) throw new Error('OPay publicKey is not configured');
  if (!secretKey) throw new Error('OPay secretKey is not configured');
  return { merchantId, publicKey, secretKey };
}

function hmacSha512(bodyJson: string, secret: string): string {
  return createHmac('sha512', secret).update(bodyJson).digest('hex');
}

function assertSuccess(
  response: { code?: string; message?: string },
  fallback: string,
) {
  if (response.code !== '00000') {
    throw new Error(response.message || fallback);
  }
}

export class OpayAdapter implements PaymentProviderAdapter {
  readonly type = 'opay' as const;

  async initialize(
    input: InitiatePaymentInput,
    ctx: ProviderContext,
  ): Promise<InitiatePaymentOutput> {
    const { merchantId, publicKey } = requireMerchant(ctx);
    const payload = {
      country: 'NG',
      reference: input.reference,
      amount: {
        total: Math.round(input.amount * 100),
        currency: input.currency || 'NGN',
      },
      returnUrl: input.returnUrl || 'https://rxsoft.health/payment-success',
      callbackUrl: input.callbackUrl || input.returnUrl,
      product: {
        name: input.descriptor || 'RxSoft Payment',
        description: input.descriptor || 'RxSoft online payment',
      },
      userInfo: {
        userEmail: input.email || 'payments@rxsoft.health',
        userId: input.userId || '',
        userName: input.customerName || 'Customer',
        userMobile: input.customerPhone || '',
      },
      expireAt: 30,
    };

    const response = await axios.post(
      `${baseUrl(ctx.creds, ctx.isProduction)}/api/v1/international/cashier/create`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicKey}`,
          MerchantId: merchantId,
        },
        timeout: 20000,
      },
    );
    const body = response.data ?? {};
    assertSuccess(body, 'OPay payment initialization failed');
    const data = body.data ?? {};
    return {
      checkoutUrl: data.cashierUrl ?? undefined,
      providerReference: data.orderNo ?? undefined,
      status: 'pending',
      metadata: { orderNo: data.orderNo, body },
    };
  }

  async initiatePos(
    input: PosInitiateInput,
    ctx: ProviderContext,
  ): Promise<PosInitiateOutput> {
    const { merchantId, secretKey } = requireMerchant(ctx);
    const payload = {
      amount: {
        currency: input.currency || 'NGN',
        total: Math.round(input.amount * 100),
      },
      callbackUrl: input.callbackUrl || '',
      country: 'NG',
      customerName: input.customerName || 'Customer',
      payMethod: 'Pos',
      product: {
        name: input.descriptor || 'POS Payment',
        description: input.descriptor || 'RxSoft POS payment',
      },
      reference: input.reference,
      sn: input.terminalSerial,
      userPhone: input.customerPhone || '',
    };

    const bodyJson = JSON.stringify(payload);
    const response = await axios.post(
      `${baseUrl(ctx.creds, ctx.isProduction)}/api/v1/international/payment/create`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hmacSha512(bodyJson, secretKey)}`,
          MerchantId: merchantId,
        },
        timeout: 20000,
      },
    );
    const body = response.data ?? {};
    assertSuccess(body, 'OPay POS payment initialization failed');
    const data = body.data ?? {};
    return {
      providerReference: data.orderNo ?? undefined,
      status: normalizeProviderStatus('opay', data.status),
      nextAction: data.nextAction?.actionType ?? undefined,
      metadata: { orderNo: data.orderNo, body },
    };
  }

  async verify(
    reference: string,
    ctx: ProviderContext,
  ): Promise<VerifyPaymentOutput> {
    const { merchantId, secretKey } = requireMerchant(ctx);
    const payload = { country: 'NG', reference };
    const bodyJson = JSON.stringify(payload);
    const response = await axios.post(
      `${baseUrl(ctx.creds, ctx.isProduction)}/api/v1/international/cashier/status`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hmacSha512(bodyJson, secretKey)}`,
          MerchantId: merchantId,
        },
        timeout: 15000,
      },
    );
    const body = response.data ?? {};
    assertSuccess(body, 'OPay status query failed');
    const data = body.data ?? {};
    return {
      status: normalizeProviderStatus('opay', data.status),
      amountPaid:
        data.amount?.total != null
          ? Number(data.amount.total) / 100
          : undefined,
      providerReference: data.orderNo ?? undefined,
      metadata: {
        verification: data,
        failureCode: data.failureCode,
        failureReason: data.failureReason,
      },
    };
  }

  async queryPos(
    reference: string,
    ctx: ProviderContext,
  ): Promise<VerifyPaymentOutput> {
    return this.verify(reference, ctx);
  }

  async verifyWebhook(
    input: WebhookVerificationInput,
    ctx: ProviderContext,
  ): Promise<WebhookVerificationOutput> {
    const { secretKey } = requireMerchant(ctx);
    const body = input.payload as {
      payload?: {
        amount?: string;
        currency?: string;
        reference?: string;
        refunded?: boolean;
        status?: string;
        timestamp?: string;
        token?: string;
        transactionId?: string;
      };
      sha512?: string;
      type?: string;
    };
    const payload = body.payload;
    if (!payload || !body.sha512 || body.type !== 'transaction-status') {
      throw new Error('Invalid OPay webhook payload');
    }

    const refunded = payload.refunded ? 't' : 'f';
    const signatureString = `{Amount:'${payload.amount || ''}',Currency:'${payload.currency || ''}',Reference:'${payload.reference || ''}',Refunded:${refunded},Status:'${payload.status || ''}',Timestamp:'${payload.timestamp || ''}',Token:'${payload.token || ''}',TransactionID:'${payload.transactionId || ''}'}`;

    // Docs emit the signature with double quotes but the reference implementation
    // verified with single quotes; compare hex (case-insensitive) for both.
    const doubleQuoteForm = `{Amount:"${payload.amount || ''}",Currency:"${payload.currency || ''}",Reference:"${payload.reference || ''}",Refunded:${refunded},Status:"${payload.status || ''}",Timestamp:"${payload.timestamp || ''}",Token:"${payload.token || ''}",TransactionID:"${payload.transactionId || ''}"}`;

    const expectedSingle = createHmac('sha3-512', secretKey)
      .update(signatureString)
      .digest('hex');
    const expectedDouble = createHmac('sha3-512', secretKey)
      .update(doubleQuoteForm)
      .digest('hex');
    const received = (body.sha512 || '').toLowerCase();
    if (expectedSingle !== received && expectedDouble !== received) {
      throw new Error('Invalid OPay webhook signature');
    }

    const status = normalizeProviderStatus('opay', payload.status);
    const paid = status === 'success';

    return {
      event: 'transaction-status',
      reference: payload.transactionId || '',
      merchantReference: payload.reference || '',
      rawStatus: payload.status || '',
      amountPaid: payload.amount ? Number(payload.amount) / 100 : undefined,
      paidAt: payload.timestamp,
      paid,
      metadata: { payload },
    };
  }
}
