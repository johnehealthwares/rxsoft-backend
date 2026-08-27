import type { PaymentTransactionStatus } from '../entities/payment-transaction.orm-entity';
import type { PaymentProviderType } from '../entities/payment-provider.orm-entity';

/**
 * Canonical status map that normalizes every provider's raw status into the
 * payment_transactions.status domain. Provider-specific webhook/verify payloads
 * should route their raw status through `normalizeProviderStatus`.
 */
export const PROVIDER_STATUS_MAP: Record<
  PaymentProviderType,
  Record<string, PaymentTransactionStatus>
> = {
  paystack: {
    success: 'success',
    failed: 'failed',
    abandoned: 'cancelled',
    pending: 'pending',
    processing: 'pending',
  },
  moniepoint: {
    PENDING: 'pending',
    INITIATED: 'pending',
    APPROVED: 'success',
    SUCCESSFUL: 'success',
    SUCCESS: 'success',
    PROCESSED: 'success',
    CANCELLED: 'cancelled',
    CANCELED: 'cancelled',
    DECLINED: 'failed',
    FAILED: 'failed',
    REVERSED: 'reversed',
    REVERSAL: 'reversed',
  },
  opay: {
    INITIAL: 'pending',
    PENDING: 'pending',
    SUCCESS: 'success',
    FAIL: 'failed',
    FAILED: 'failed',
    CLOSE: 'cancelled',
  },
  monnify: {
    PAID: 'success',
    PARTIALLY_PAID: 'partial',
    OVERPAID: 'success',
    PENDING: 'pending',
    PENDING_PAYMENT: 'pending',
    FAILED: 'failed',
    REVERSED: 'reversed',
    EXPIRED: 'expired',
  },
  wallet: {
    APPROVED: 'success',
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
  },
  insurance: {
    APPROVED: 'success',
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
  },
  cash: {
    APPROVED: 'success',
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
  },
};

/** Default fallback when a provider returns a raw status not in its map. */
const DEFAULT_STATUS: PaymentTransactionStatus = 'unknown';

export function normalizeProviderStatus(
  providerType: PaymentProviderType,
  rawStatus: string | null | undefined,
): PaymentTransactionStatus {
  if (!rawStatus) return DEFAULT_STATUS;
  const map = PROVIDER_STATUS_MAP[providerType] ?? {};
  return map[rawStatus] ?? DEFAULT_STATUS;
}

export function isSuccessStatus(status: PaymentTransactionStatus): boolean {
  return status === 'success' || status === 'settled';
}

export function isTerminalStatus(status: PaymentTransactionStatus): boolean {
  return (
    status === 'success' ||
    status === 'failed' ||
    status === 'cancelled' ||
    status === 'reversed' ||
    status === 'expired' ||
    status === 'settled'
  );
}
