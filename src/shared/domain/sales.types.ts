import { ForeignProperty } from "src/modules/catalog/dto/product-response.dto";

export type UomCategoryType = {
  id: string;
  organizationId: string;
  code: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UomType = {
  id: string;
  organizationId: string;
  categoryId: string | null;
  category: ForeignProperty | null;
  code: string | null;
  name: string;
  uomType: 'reference' | 'bigger' | 'smaller';
  factor: number;
  rounding: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AccountReceivableType = {
  id: string;
  organizationId: string;
  customerId: string;
  saleId: string;
  receivableNumber: string;
  originalAmount: number;
  outstandingAmount: number;
  status: 'open' | 'partially_paid' | 'closed' | 'written_off';
  openedAt: string;
  closedAt: string | null;
};

export type PaymentMethodType = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  methodType: 'cash' | 'card' | 'transfer' | 'wallet' | 'insurance';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SaleType = {
  id: string;
  organizationId: string;
  saleNumber: string;
  saleChannel: 'pos' | 'invoice' | 'mobile';
  storeId: string;
  customerId: string | null;
  status: 'draft' | 'posted' | 'voided' | 'refunded';
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  changeAmount: number;
  saleDate: string;
  soldByUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type SaleLineType = {
  id: string;
  saleId: string;
  lineNumber: number;
  productId: string;
  lotId: string | null;
  uomId: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxPercent: number;
  lineSubtotal: number;
  lineTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type SalePaymentType = {
  id: string;
  saleId: string;
  paymentMethodId: string;
  amount: number;
  paymentReference: string | null;
  paidAt: string;
  receivedByUserId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SaleRefundType = {
  id: string;
  organizationId: string;
  saleId: string;
  refundNumber: string;
  status: 'posted' | 'voided';
  totalAmount: number;
  refundDate: string;
  reason: string | null;
  refundedByUserId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SaleRefundLineType = {
  id: string;
  refundId: string;
  saleLineId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  createdAt: string;
  updatedAt: string;
};
