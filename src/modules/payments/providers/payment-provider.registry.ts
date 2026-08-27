import { Injectable } from '@nestjs/common';
import type {
  PaymentProviderOrmEntity,
  PaymentProviderType,
} from '../entities/payment-provider.orm-entity';
import type { ProviderContext } from './payment-provider.adapter';
import { PaystackAdapter } from './paystack.adapter';
import { MonnifyAdapter } from './monnify.adapter';
import { OpayAdapter } from './opay.adapter';
import { MoniepointAdapter } from './moniepoint.adapter';
import { WalletAdapter } from './wallet.adapter';
import { InsuranceAdapter } from './insurance.adapter';
import type { PaymentProviderAdapter } from './payment-provider.adapter';

@Injectable()
export class PaymentProviderRegistry {
  private readonly adapters: Record<
    PaymentProviderType,
    PaymentProviderAdapter
  >;

  constructor() {
    this.adapters = {
      paystack: new PaystackAdapter(),
      monnify: new MonnifyAdapter(),
      opay: new OpayAdapter(),
      moniepoint: new MoniepointAdapter(),
      wallet: new WalletAdapter(),
      insurance: new InsuranceAdapter(),
      cash: new WalletAdapter() as unknown as PaymentProviderAdapter,
    };
  }

  get(type: PaymentProviderType): PaymentProviderAdapter {
    const adapter = this.adapters[type];
    if (!adapter)
      throw new Error(
        `No payment adapter registered for provider type: ${type}`,
      );
    return adapter;
  }

  /**
   * Builds the adapter context for a provider row, resolving whichever
   * credential set (test vs live) matches `provider.production`.
   */
  contextFor(provider: PaymentProviderOrmEntity): ProviderContext {
    const test = provider.testConfig ?? {};
    const live = provider.liveConfig ?? {};
    const creds = provider.production ? { ...test, ...live } : test;
    return { creds, isProduction: provider.production };
  }
}
