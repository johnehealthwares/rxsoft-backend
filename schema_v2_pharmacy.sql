-- RxSoft Modern Pharmacy Inventory Schema (Phase 2)
-- Source alignment: legacy RxSoft + Odoo domain models
-- PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================
-- Shared utilities
-- =====================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =====================================================
-- Identity, organization, and RBAC
-- =====================================================

CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  name text NOT NULL,
  phone text,
  email text,
  address_line_1 text,
  address_line_2 text,
  city text,
  state text,
  postal_code text,
  country_code text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, code)
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  username text NOT NULL,
  password_hash text NOT NULL,
  first_name text,
  last_name text,
  email text,
  phone text,
  is_active boolean NOT NULL DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, username)
);

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  name text NOT NULL,
  description text,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code)
);

CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  resource text NOT NULL,
  action text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (resource, action)
);

CREATE TABLE role_permissions (
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_roles (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE refresh_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (token_hash)
);

-- =====================================================
-- Parties (customers, suppliers), product catalog, and pricing
-- =====================================================

CREATE TABLE parties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  party_type text NOT NULL CHECK (party_type IN ('customer', 'supplier', 'both')),
  code text,
  name text NOT NULL,
  phone text,
  mobile text,
  email text,
  tax_id text,
  address_line_1 text,
  address_line_2 text,
  city text,
  state text,
  postal_code text,
  country_code text,
  credit_limit numeric(14,2),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, code)
);

CREATE TABLE manufacturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, name)
);

CREATE TABLE pharmaceutics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  common_brand_name text,
  common_generic_name text,
  clinical_name text,
  drug_class text,
  chemical_constituents text,
  pharmaceutics text,
  indications text,
  contraindications text,
  mechanism text,
  missed_dose text,
  drug_interactions text,
  dosage text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, code)
);

CREATE TABLE drug_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, name)
);

CREATE TABLE pharmaceutics_drug_components (
  pharmaceutics_id uuid NOT NULL REFERENCES pharmaceutics(id) ON DELETE CASCADE,
  drug_component_id uuid NOT NULL REFERENCES drug_components(id) ON DELETE CASCADE,
  PRIMARY KEY (pharmaceutics_id, drug_component_id)
);

CREATE TABLE uom_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, name)
);

CREATE TABLE uoms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  category_id uuid NOT NULL REFERENCES uom_categories(id),
  code text,
  name text NOT NULL,
  uom_type text NOT NULL CHECK (uom_type IN ('reference', 'bigger', 'smaller')),
  factor numeric(18,8) NOT NULL CHECK (factor > 0),
  rounding numeric(18,8) NOT NULL CHECK (rounding > 0),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, category_id, name)
);

CREATE TABLE product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  parent_id uuid REFERENCES product_categories(id),
  code text NOT NULL,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, code),
  UNIQUE (organization_id, name)
);

CREATE TABLE generic_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  name text NOT NULL,
  pharmaceutics_id uuid REFERENCES pharmaceutics(id),
  therapeutic_class text,
  dosage_form text,
  strength text,
  general_use text,
  adult_dosage text,
  pediatric_dosage text,
  is_prescription_required boolean NOT NULL DEFAULT false,
  is_controlled_substance boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, code),
  UNIQUE (organization_id, name, strength)
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  name text NOT NULL,
  generic_product_id uuid REFERENCES generic_products(id),
  category_id uuid REFERENCES product_categories(id),
  base_uom_id uuid NOT NULL REFERENCES uoms(id),
  purchase_uom_id uuid REFERENCES uoms(id),
  sale_uom_id uuid REFERENCES uoms(id),
  barcode text,
  track_lot boolean NOT NULL DEFAULT true,
  track_expiry boolean NOT NULL DEFAULT true,
  shelf_life_days integer,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (organization_id, code),
  UNIQUE (organization_id, barcode)
);

CREATE TABLE product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE supplier_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  supplier_id uuid NOT NULL REFERENCES parties(id),
  product_id uuid NOT NULL REFERENCES products(id),
  supplier_product_code text,
  min_order_qty numeric(14,3) NOT NULL DEFAULT 0,
  lead_time_days integer NOT NULL DEFAULT 0,
  last_purchase_price numeric(14,2),
  currency_code char(3) NOT NULL DEFAULT 'USD',
  is_preferred boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, supplier_id, product_id)
);

CREATE TABLE price_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  name text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code)
);

CREATE TABLE price_list_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  price_list_id uuid NOT NULL REFERENCES price_lists(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  location_id uuid REFERENCES stock_locations(id),
  currency_code char(3) NOT NULL DEFAULT 'NGN',
  unit_price numeric(14,2) NOT NULL CHECK (unit_price >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at IS NULL OR starts_at IS NULL OR ends_at >= starts_at)
);

-- =====================================================
-- Warehousing, stock, and traceability
-- =====================================================

CREATE TABLE warehouses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  store_id uuid REFERENCES stores(id),
  code text NOT NULL,
  name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code)
);

CREATE TABLE stock_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  warehouse_id uuid REFERENCES warehouses(id),
  parent_id uuid REFERENCES stock_locations(id),
  code text,
  name text NOT NULL,
  location_type text NOT NULL DEFAULT 'internal' CHECK (location_type IN ('internal', 'supplier', 'customer', 'inventory', 'scrap', 'transit')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, name)
);

CREATE TABLE store_stock_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  store_id uuid NOT NULL REFERENCES stores(id),
  stock_location_id uuid NOT NULL REFERENCES stock_locations(id),
  purpose text NOT NULL CHECK (purpose IN ('sale_issue', 'sale_return')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, store_id, purpose)
);

CREATE TABLE stock_lots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  product_id uuid REFERENCES products(id),
  code text NOT NULL,
  lot_number text,
  supplier_lot_number text,
  manufactured_at date,
  expires_at date,
  use_by_at date,
  alert_at date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code),
  UNIQUE (organization_id, product_id, lot_number)
);

CREATE TABLE inventory_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  document_type text NOT NULL CHECK (document_type IN ('receipt', 'issue', 'transfer', 'adjustment', 'sale', 'purchase_return', 'sale_return')),
  document_number text NOT NULL,
  source_location_id uuid REFERENCES stock_locations(id),
  destination_location_id uuid REFERENCES stock_locations(id),
  related_sale_id uuid,
  related_purchase_order_id uuid,
  status text NOT NULL CHECK (status IN ('draft', 'posted', 'cancelled')),
  posted_at timestamptz,
  performed_by_user_id uuid REFERENCES users(id),
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, document_number)
);

CREATE TABLE inventory_document_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_document_id uuid NOT NULL REFERENCES inventory_documents(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  lot_id uuid REFERENCES stock_lots(id),
  uom_id uuid NOT NULL REFERENCES uoms(id),
  quantity numeric(14,3) NOT NULL CHECK (quantity >= 0),
  unit_cost numeric(14,4),
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE stock_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  location_id uuid NOT NULL REFERENCES stock_locations(id),
  product_id uuid NOT NULL REFERENCES products(id),
  lot_id uuid REFERENCES stock_lots(id),
  quantity_on_hand numeric(14,3) NOT NULL DEFAULT 0,
  quantity_reserved numeric(14,3) NOT NULL DEFAULT 0,
  average_cost numeric(14,4) NOT NULL DEFAULT 0,
  reorder_min_qty numeric(14,3),
  reorder_max_qty numeric(14,3),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, location_id, product_id, lot_id)
);

CREATE TABLE stock_adjustments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_balance_id uuid NOT NULL REFERENCES stock_balances(id) ON DELETE CASCADE,
  reason text NOT NULL,
  delta_quantity numeric(14,3) NOT NULL,
  performed_by_user_id uuid NOT NULL REFERENCES users(id),
  performed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  inventory_document_id uuid REFERENCES inventory_documents(id),
  inventory_document_line_id uuid REFERENCES inventory_document_lines(id),
  product_id uuid NOT NULL REFERENCES products(id),
  lot_id uuid REFERENCES stock_lots(id),
  from_location_id uuid REFERENCES stock_locations(id),
  to_location_id uuid REFERENCES stock_locations(id),
  movement_type text NOT NULL CHECK (movement_type IN ('in', 'out', 'transfer', 'adjustment')),
  quantity numeric(14,3) NOT NULL CHECK (quantity >= 0),
  unit_cost numeric(14,4),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_by_user_id uuid REFERENCES users(id)
);

CREATE TABLE inventory_adjustments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  adjustment_number text NOT NULL,
  location_id uuid NOT NULL REFERENCES stock_locations(id),
  status text NOT NULL CHECK (status IN ('draft', 'posted', 'cancelled')),
  reason text,
  counted_by_user_id uuid REFERENCES users(id),
  posted_by_user_id uuid REFERENCES users(id),
  posted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, adjustment_number)
);

CREATE TABLE inventory_adjustment_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adjustment_id uuid NOT NULL REFERENCES inventory_adjustments(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  lot_id uuid REFERENCES stock_lots(id),
  expected_qty numeric(14,3) NOT NULL,
  counted_qty numeric(14,3) NOT NULL,
  variance_qty numeric(14,3) NOT NULL,
  unit_cost numeric(14,4),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================
-- Procurement
-- =====================================================

CREATE TABLE purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  purchase_order_number text NOT NULL,
  supplier_id uuid NOT NULL REFERENCES parties(id),
  warehouse_id uuid NOT NULL REFERENCES warehouses(id),
  currency_code char(3) NOT NULL DEFAULT 'USD',
  order_date date NOT NULL,
  expected_date date,
  status text NOT NULL CHECK (status IN ('draft', 'approved', 'partially_received', 'received', 'cancelled')),
  subtotal_amount numeric(14,2) NOT NULL DEFAULT 0,
  tax_amount numeric(14,2) NOT NULL DEFAULT 0,
  total_amount numeric(14,2) NOT NULL DEFAULT 0,
  created_by_user_id uuid REFERENCES users(id),
  approved_by_user_id uuid REFERENCES users(id),
  approved_at timestamptz,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, purchase_order_number)
);

CREATE TABLE purchase_order_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  ordered_qty numeric(14,3) NOT NULL CHECK (ordered_qty > 0),
  received_qty numeric(14,3) NOT NULL DEFAULT 0,
  uom_id uuid NOT NULL REFERENCES uoms(id),
  unit_cost numeric(14,4) NOT NULL CHECK (unit_cost >= 0),
  discount_percent numeric(8,4) NOT NULL DEFAULT 0,
  tax_percent numeric(8,4) NOT NULL DEFAULT 0,
  line_subtotal numeric(14,2) NOT NULL DEFAULT 0,
  line_total numeric(14,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE goods_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  receipt_number text NOT NULL,
  purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id),
  warehouse_id uuid NOT NULL REFERENCES warehouses(id),
  destination_location_id uuid NOT NULL REFERENCES stock_locations(id),
  receipt_date timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('draft', 'posted', 'cancelled')),
  received_by_user_id uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, receipt_number)
);

CREATE TABLE goods_receipt_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goods_receipt_id uuid NOT NULL REFERENCES goods_receipts(id) ON DELETE CASCADE,
  purchase_order_line_id uuid REFERENCES purchase_order_lines(id),
  product_id uuid NOT NULL REFERENCES products(id),
  lot_id uuid REFERENCES stock_lots(id),
  received_qty numeric(14,3) NOT NULL CHECK (received_qty > 0),
  uom_id uuid NOT NULL REFERENCES uoms(id),
  unit_cost numeric(14,4) NOT NULL CHECK (unit_cost >= 0),
  expiry_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================
-- Sales / POS / receivables
-- =====================================================

CREATE TABLE pos_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  store_id uuid NOT NULL REFERENCES stores(id),
  opened_by_user_id uuid NOT NULL REFERENCES users(id),
  closed_by_user_id uuid REFERENCES users(id),
  opened_at timestamptz NOT NULL DEFAULT now(),
  closed_at timestamptz,
  opening_cash numeric(14,2) NOT NULL DEFAULT 0,
  closing_cash numeric(14,2),
  status text NOT NULL CHECK (status IN ('open', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  store_id uuid NOT NULL REFERENCES stores(id),
  pos_session_id uuid REFERENCES pos_sessions(id),
  sale_number text NOT NULL,
  sale_channel text NOT NULL CHECK (sale_channel IN ('pos', 'invoice', 'mobile')),
  customer_id uuid REFERENCES parties(id),
  sale_date timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('draft', 'posted', 'voided', 'refunded')),
  subtotal_amount numeric(14,2) NOT NULL DEFAULT 0,
  discount_amount numeric(14,2) NOT NULL DEFAULT 0,
  tax_amount numeric(14,2) NOT NULL DEFAULT 0,
  total_amount numeric(14,2) NOT NULL DEFAULT 0,
  paid_amount numeric(14,2) NOT NULL DEFAULT 0,
  change_amount numeric(14,2) NOT NULL DEFAULT 0,
  sold_by_user_id uuid NOT NULL REFERENCES users(id),
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, sale_number)
);

ALTER TABLE inventory_documents
  ADD CONSTRAINT fk_inventory_documents_related_sale
  FOREIGN KEY (related_sale_id) REFERENCES sales(id);

CREATE TABLE sale_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  line_number integer NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id),
  lot_id uuid REFERENCES stock_lots(id),
  uom_id uuid NOT NULL REFERENCES uoms(id),
  quantity numeric(14,3) NOT NULL CHECK (quantity > 0),
  unit_price numeric(14,4) NOT NULL CHECK (unit_price >= 0),
  discount_percent numeric(8,4) NOT NULL DEFAULT 0,
  tax_percent numeric(8,4) NOT NULL DEFAULT 0,
  unit_cost numeric(14,4),
  line_subtotal numeric(14,2) NOT NULL,
  line_total numeric(14,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (sale_id, line_number)
);

CREATE TABLE sale_refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  refund_number text NOT NULL,
  status text NOT NULL CHECK (status IN ('posted', 'voided')),
  total_amount numeric(14,2) NOT NULL DEFAULT 0,
  refund_date timestamptz NOT NULL DEFAULT now(),
  reason text,
  refunded_by_user_id uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, refund_number)
);

CREATE TABLE sale_refund_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  refund_id uuid NOT NULL REFERENCES sale_refunds(id) ON DELETE CASCADE,
  sale_line_id uuid NOT NULL REFERENCES sale_lines(id),
  quantity numeric(14,3) NOT NULL CHECK (quantity > 0),
  unit_price numeric(14,4) NOT NULL CHECK (unit_price >= 0),
  line_total numeric(14,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  name text NOT NULL,
  method_type text NOT NULL CHECK (method_type IN ('cash', 'card', 'transfer', 'wallet', 'insurance')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code)
);

CREATE TABLE sale_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  payment_method_id uuid NOT NULL REFERENCES payment_methods(id),
  amount numeric(14,2) NOT NULL CHECK (amount >= 0),
  payment_reference text,
  paid_at timestamptz NOT NULL DEFAULT now(),
  received_by_user_id uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE accounts_receivable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  customer_id uuid NOT NULL REFERENCES parties(id),
  sale_id uuid NOT NULL REFERENCES sales(id),
  receivable_number text NOT NULL,
  original_amount numeric(14,2) NOT NULL CHECK (original_amount > 0),
  outstanding_amount numeric(14,2) NOT NULL CHECK (outstanding_amount >= 0),
  status text NOT NULL CHECK (status IN ('open', 'partially_paid', 'closed', 'written_off')),
  opened_at timestamptz NOT NULL DEFAULT now(),
  closed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, receivable_number)
);

CREATE TABLE receivable_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receivable_id uuid NOT NULL REFERENCES accounts_receivable(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('charge', 'payment', 'adjustment', 'write_off')),
  amount numeric(14,2) NOT NULL CHECK (
    (transaction_type IN ('charge', 'payment', 'write_off') AND amount > 0)
    OR (transaction_type = 'adjustment' AND amount <> 0)
  ),
  transaction_date timestamptz NOT NULL DEFAULT now(),
  payment_method_id uuid REFERENCES payment_methods(id),
  reference_number text,
  received_by_user_id uuid REFERENCES users(id),
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inventory_documents
  ADD CONSTRAINT fk_inventory_documents_related_purchase_order
  FOREIGN KEY (related_purchase_order_id) REFERENCES purchase_orders(id);

-- =====================================================
-- Accounting (minimal normalized GL layer)
-- =====================================================

CREATE TABLE gl_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  account_code text NOT NULL,
  account_name text NOT NULL,
  account_type text NOT NULL CHECK (account_type IN ('asset', 'liability', 'equity', 'income', 'expense')),
  allows_reconciliation boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, account_code)
);

CREATE TABLE journals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  code text NOT NULL,
  name text NOT NULL,
  journal_type text NOT NULL CHECK (journal_type IN ('sale', 'purchase', 'cash', 'bank', 'general')),
  default_debit_account_id uuid REFERENCES gl_accounts(id),
  default_credit_account_id uuid REFERENCES gl_accounts(id),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, code)
);

CREATE TABLE journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  journal_id uuid NOT NULL REFERENCES journals(id),
  entry_number text NOT NULL,
  entry_date date NOT NULL,
  reference text,
  source_type text,
  source_id uuid,
  status text NOT NULL CHECK (status IN ('draft', 'posted', 'reversed')),
  created_by_user_id uuid REFERENCES users(id),
  posted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, entry_number)
);

CREATE TABLE journal_entry_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id uuid NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
  line_number integer NOT NULL,
  gl_account_id uuid NOT NULL REFERENCES gl_accounts(id),
  party_id uuid REFERENCES parties(id),
  product_id uuid REFERENCES products(id),
  debit_amount numeric(14,2) NOT NULL DEFAULT 0,
  credit_amount numeric(14,2) NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((debit_amount = 0 AND credit_amount > 0) OR (credit_amount = 0 AND debit_amount > 0)),
  UNIQUE (journal_entry_id, line_number)
);

-- =====================================================
-- Prescriptions and dispensing (pharmacy-specific completion)
-- =====================================================

CREATE TABLE prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  prescription_number text NOT NULL,
  customer_id uuid NOT NULL REFERENCES parties(id),
  prescriber_name text,
  diagnosis text,
  prescribed_at timestamptz,
  expires_at timestamptz,
  status text NOT NULL CHECK (status IN ('open', 'partially_dispensed', 'dispensed', 'cancelled', 'expired')),
  created_by_user_id uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, prescription_number)
);

CREATE TABLE prescription_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id uuid NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  prescribed_qty numeric(14,3) NOT NULL CHECK (prescribed_qty > 0),
  dispensed_qty numeric(14,3) NOT NULL DEFAULT 0,
  dosage_instruction text,
  duration_days integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE dispensing_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  prescription_line_id uuid NOT NULL REFERENCES prescription_lines(id),
  sale_line_id uuid REFERENCES sale_lines(id),
  dispensed_qty numeric(14,3) NOT NULL CHECK (dispensed_qty > 0),
  dispensed_at timestamptz NOT NULL DEFAULT now(),
  dispensed_by_user_id uuid REFERENCES users(id),
  lot_id uuid REFERENCES stock_lots(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================
-- Audit and mobile sync
-- =====================================================

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  actor_user_id uuid REFERENCES users(id),
  action text NOT NULL,
  resource text NOT NULL,
  resource_id uuid,
  details jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  actor_user_id uuid REFERENCES users(id),
  message text NOT NULL,
  stack_trace text,
  context jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE mobile_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  user_id uuid REFERENCES users(id),
  device_uuid text NOT NULL,
  platform text NOT NULL CHECK (platform IN ('android', 'ios')),
  app_version text,
  last_seen_at timestamptz,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, device_uuid)
);

CREATE TABLE sync_checkpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id uuid NOT NULL REFERENCES mobile_devices(id) ON DELETE CASCADE,
  domain_name text NOT NULL,
  last_server_version bigint NOT NULL DEFAULT 0,
  last_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (device_id, domain_name)
);

CREATE TABLE sync_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id uuid NOT NULL REFERENCES mobile_devices(id) ON DELETE CASCADE,
  entity_name text NOT NULL,
  entity_id uuid,
  operation text NOT NULL CHECK (operation IN ('insert', 'update', 'delete')),
  payload jsonb NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'failed', 'applied')),
  retry_count integer NOT NULL DEFAULT 0,
  next_retry_at timestamptz,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================
-- Legacy/Odoo key mapping for migration traceability
-- =====================================================

CREATE TABLE external_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  source_system text NOT NULL CHECK (source_system IN ('legacy_rxsoft', 'odoo')),
  source_model text NOT NULL,
  source_key text NOT NULL,
  target_table text NOT NULL,
  target_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, source_system, source_model, source_key)
);

-- =====================================================
-- Admin/system configuration
-- =====================================================

CREATE TABLE system_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  key text NOT NULL,
  value text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, key)
);

-- =====================================================
-- Business rule guard: underpayment always creates receivable debit
-- =====================================================

CREATE OR REPLACE FUNCTION enforce_sale_underpayment_receivable()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  v_shortfall numeric(14,2);
  v_receivable_id uuid;
BEGIN
  IF NEW.status = 'posted' THEN
    v_shortfall := GREATEST(NEW.total_amount - NEW.paid_amount, 0);

    IF v_shortfall > 0 THEN
      IF NEW.customer_id IS NULL THEN
        RAISE EXCEPTION 'Underpaid sale % requires customer_id for accounts receivable', NEW.sale_number;
      END IF;

      IF NOT EXISTS (
        SELECT 1
        FROM accounts_receivable ar
        WHERE ar.sale_id = NEW.id
          AND ar.status IN ('open', 'partially_paid')
      ) THEN
        INSERT INTO accounts_receivable (
          organization_id,
          customer_id,
          sale_id,
          receivable_number,
          original_amount,
          outstanding_amount,
          status
        ) VALUES (
          NEW.organization_id,
          NEW.customer_id,
          NEW.id,
          'AR-' || replace(NEW.sale_number, ' ', ''),
          v_shortfall,
          v_shortfall,
          'open'
        )
        RETURNING id INTO v_receivable_id;

        INSERT INTO receivable_transactions (
          receivable_id,
          transaction_type,
          amount,
          transaction_date,
          reference_type,
          reference_id,
          created_by_user_id
        )
        VALUES (v_receivable_id, 'debit', v_shortfall, now(), 'sale', NEW.id, NEW.sold_by_user_id);
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_sales_underpayment_receivable
AFTER INSERT OR UPDATE OF status, total_amount, paid_amount
ON sales
FOR EACH ROW
EXECUTE FUNCTION enforce_sale_underpayment_receivable();

-- =====================================================
-- Index strategy for scale and hot paths
-- =====================================================

CREATE INDEX idx_users_org_active ON users (organization_id, is_active) WHERE deleted_at IS NULL;
CREATE INDEX idx_parties_org_type ON parties (organization_id, party_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_org_active ON products (organization_id, is_active) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_barcode ON products (organization_id, barcode) WHERE barcode IS NOT NULL;
CREATE INDEX idx_pharmaceutics_code ON pharmaceutics (organization_id, code) WHERE deleted_at IS NULL;
CREATE INDEX idx_drug_components_org_name ON drug_components (organization_id, name) WHERE deleted_at IS NULL;
CREATE INDEX idx_pharm_drug_components_component ON pharmaceutics_drug_components (drug_component_id);
CREATE INDEX idx_supplier_products_supplier ON supplier_products (supplier_id, is_preferred);
CREATE INDEX idx_stock_balances_lookup ON stock_balances (organization_id, location_id, product_id, lot_id);
CREATE INDEX idx_stock_adjustments_balance_time ON stock_adjustments (stock_balance_id, performed_at DESC);
CREATE INDEX idx_stock_movements_product_time ON stock_movements (product_id, occurred_at DESC);
CREATE INDEX idx_store_stock_locations_store_purpose ON store_stock_locations (store_id, purpose) WHERE is_active = true;
CREATE INDEX idx_stock_lots_expiry ON stock_lots (organization_id, expires_at);
CREATE INDEX idx_purchase_orders_supplier_date ON purchase_orders (supplier_id, order_date DESC);
CREATE INDEX idx_sales_store_date ON sales (store_id, sale_date DESC);
CREATE INDEX idx_sales_customer_date ON sales (customer_id, sale_date DESC);
CREATE INDEX idx_sale_lines_product ON sale_lines (product_id);
CREATE INDEX idx_sale_refunds_sale_date ON sale_refunds (sale_id, refund_date DESC);
CREATE INDEX idx_sale_refunds_org_date ON sale_refunds (organization_id, refund_date DESC);
CREATE INDEX idx_sale_refund_lines_refund ON sale_refund_lines (refund_id);
CREATE INDEX idx_sale_refund_lines_sale_line ON sale_refund_lines (sale_line_id);
CREATE INDEX idx_sale_payments_sale ON sale_payments (sale_id, paid_at DESC);
CREATE INDEX idx_receivables_customer_status ON accounts_receivable (customer_id, status);
CREATE INDEX idx_receivable_txn_receivable_date ON receivable_transactions (receivable_id, transaction_date DESC);
CREATE INDEX idx_journal_entries_date ON journal_entries (entry_date DESC, status);
CREATE INDEX idx_journal_entry_lines_account ON journal_entry_lines (gl_account_id);
CREATE INDEX idx_audit_logs_resource_time ON audit_logs (resource, occurred_at DESC);
CREATE INDEX idx_sync_queue_status_next_retry ON sync_queue (status, next_retry_at);
CREATE INDEX idx_sync_queue_payload_gin ON sync_queue USING GIN (payload);

-- =====================================================
-- Auto-update timestamps
-- =====================================================

DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'organizations','stores','users','roles','permissions','parties','manufacturers',
      'pharmaceutics','drug_components',
      'uom_categories','uoms','product_categories','generic_products','products',
      'product_images','supplier_products','price_lists','price_list_items','warehouses',
      'stock_locations','stock_lots','inventory_documents','inventory_document_lines',
      'stock_balances','stock_adjustments','inventory_adjustments','inventory_adjustment_lines','purchase_orders',
      'purchase_order_lines','goods_receipts','goods_receipt_lines','pos_sessions','sales',
      'sale_lines','sale_refunds','sale_refund_lines','payment_methods','sale_payments',
      'accounts_receivable','receivable_transactions','gl_accounts','journals','journal_entries',
      'prescriptions','prescription_lines','mobile_devices','sync_checkpoints','sync_queue',
      'system_configs'
    ])
  LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      t, t
    );
  END LOOP;
END;
$$;
