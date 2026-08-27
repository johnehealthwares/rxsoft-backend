import type { PaymentProviderType } from '../entities/payment-provider.orm-entity';
import type { PaymentTransactionStatus } from '../entities/payment-transaction.orm-entity';

export type PaymentChannel = 'cash' | 'pos' | 'web' | 'wallet' | 'insurance';

export interface ProviderCredentialSet {
  publicKey?: string;
  secretKey?: string;
  apiKey?: string;
  apiSecret?: string;
  contractCode?: string;
  clientSecret?: string;
  merchantId?: string;
  terminalId?: string;
  webhookSecret?: string;
  baseUrl?: string;
  sandboxBaseUrl?: string;
}

export interface ProviderContext {
  /** Credentials for the active mode (test or live), resolved by the caller. */
  creds: ProviderCredentialSet;
  isProduction: boolean;
}

export interface InitiatePaymentInput {
  amount: number;
  reference: string;
  currency?: string;
  email?: string;
  customerName?: string;
  customerPhone?: string;
  userId?: string;
  descriptor?: string;
  returnUrl?: string;
  callbackUrl?: string;
  customerVisitSource?: string;
  metadata?: Record<string, unknown>;
  channel: PaymentChannel;
}

export interface InitiatePaymentOutput {
  /** Hosted checkout/cashier URL the client should redirect to (web channel). */
  checkoutUrl?: string;
  /** Provider-side reference (orderNo / transactionReference). */
  providerReference?: string;
  status: PaymentTransactionStatus;
  metadata?: Record<string, unknown>;
}

export interface VerifyPaymentOutput {
  status: PaymentTransactionStatus;
  amountPaid?: number;
  providerReference?: string;
  paidAt?: string;
  settled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface PosInitiateInput {
  amount: number;
  reference: string;
  currency?: string;
  terminalSerial: string;
  terminalId?: string;
  customerName?: string;
  customerPhone?: string;
  descriptor?: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface PosInitiateOutput {
  providerReference?: string;
  status: PaymentTransactionStatus;
  /** e.g. SWIPE_CARD / PIN (informational, surfaced in POS UI). */
  nextAction?: string;
  metadata?: Record<string, unknown>;
}

export interface WebhookVerificationInput {
  payload: unknown;
  headers: Record<string, string | string[] | undefined>;
  /** Raw request body (string) when a body-parser middleware captured it. */
  rawBody?: string;
}

export interface WebhookVerificationOutput {
  /** Provider statement, e.g. paystack: charge.success, monnify: SUCCESSFUL_TRANSACTION */
  event?: string;
  /** Provider reference (transactionReference for paystack/monnify, merchantReference for moniepoint). */
  reference?: string;
  /** Merchant/own reference — the payment_transactions.reference. */
  merchantReference?: string;
  /** Raw provider status (before normalization). */
  rawStatus?: string;
  /** Actual amount collected (provider-side, kobo→naira already normalized by the adapter). */
  amountPaid?: number;
  paidAt?: string;
  /** True when the event is a money-in collection (approve). */
  paid: boolean;
  metadata?: Record<string, unknown>;
}

export interface PaymentProviderAdapter {
  readonly type: PaymentProviderType;
  initialize(
    input: InitiatePaymentInput,
    ctx: ProviderContext,
  ): Promise<InitiatePaymentOutput>;
  verify(reference: string, ctx: ProviderContext): Promise<VerifyPaymentOutput>;
  initiatePos?(
    input: PosInitiateInput,
    ctx: ProviderContext,
  ): Promise<PosInitiateOutput>;
  queryPos?(
    reference: string,
    ctx: ProviderContext,
  ): Promise<VerifyPaymentOutput>;
  verifyWebhook?(
    input: WebhookVerificationInput,
    ctx: ProviderContext,
  ): Promise<WebhookVerificationOutput>;
  /** Optional: normalize a full raw verify payload (used by completion engine for extra detail). */
  settled?(reference: string, ctx: ProviderContext): Promise<boolean>;
}

export const MASK_PLACEHOLDER = '****';
