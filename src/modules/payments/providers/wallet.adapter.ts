import {
  InitiatePaymentInput,
  InitiatePaymentOutput,
  PaymentProviderAdapter,
  ProviderContext,
  VerifyPaymentOutput,
} from './payment-provider.adapter';

/**
 * In-house customer wallet provider. There is no external gateway call — the
 * wallet debit happens in `CustomerWalletService` when a sale is settled with
 * the WALLET payment method. These methods are no-ops so the registry is uniform.
 */
export class WalletAdapter implements PaymentProviderAdapter {
  readonly type = 'wallet' as const;

  async initialize(
    input: InitiatePaymentInput,
    _ctx: ProviderContext,
  ): Promise<InitiatePaymentOutput> {
    return {
      status: 'pending',
      metadata: { reference: input.reference, channel: input.channel },
    };
  }

  async verify(
    reference: string,
    _ctx: ProviderContext,
  ): Promise<VerifyPaymentOutput> {
    return {
      status: 'success',
      providerReference: reference,
      metadata: { internal: true },
    };
  }
}
