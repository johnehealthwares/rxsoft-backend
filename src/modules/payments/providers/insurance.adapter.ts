import {
  InitiatePaymentInput,
  InitiatePaymentOutput,
  PaymentProviderAdapter,
  ProviderContext,
  VerifyPaymentOutput,
} from './payment-provider.adapter';

/**
 * Insurance provider. Payments are "simple": a cashier records an insurance
 * payment against an insurance provider with an approval/reference code. No
 * external gateway call. The approval code is carried as the transaction
 * reference in sale_payments.
 */
export class InsuranceAdapter implements PaymentProviderAdapter {
  readonly type = 'insurance' as const;

  async initialize(
    input: InitiatePaymentInput,
    _ctx: ProviderContext,
  ): Promise<InitiatePaymentOutput> {
    return {
      status: 'pending',
      metadata: {
        reference: input.reference,
        insuranceProviderId: input.metadata?.insuranceProviderId,
      },
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
