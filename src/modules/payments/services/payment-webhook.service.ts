import { Injectable, Logger } from '@nestjs/common';
import { PaymentProviderOrmEntity } from '../entities/payment-provider.orm-entity';
import { PaymentProviderRegistry } from '../providers/payment-provider.registry';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentProvidersService } from './payment-providers.service';

@Injectable()
export class PaymentWebhookService {
  private readonly logger = new Logger(PaymentWebhookService.name);

  constructor(
    private readonly registry: PaymentProviderRegistry,
    private readonly gateway: PaymentGatewayService,
    private readonly providersService: PaymentProvidersService,
  ) {}

  /**
   * Entry point for all four providers. Mirrors the reference dispatcher in
   * healthstack HS-backend (handle-webhook.js) but resolves the active
   * credential set from the payment_providers table instead of env vars.
   */
  async handle(
    providerKey: string,
    payload: unknown,
    headers: Record<string, string | string[] | undefined>,
    rawBody?: string,
  ): Promise<Record<string, unknown>> {
    let provider: PaymentProviderOrmEntity;
    try {
      const matches = await this.providersService.findByType(
        providerKey as never,
      );
      provider = matches.find((p) => p.isActive) ?? matches[0];
      if (!provider) {
        this.logger.warn(
          `Webhook ignored: no active provider row for type "${providerKey}"`,
        );
        return {
          received: true,
          ignored: true,
          reason: 'Provider not configured',
        };
      }
    } catch (error: any) {
      this.logger.warn(`Webhook ignored for ${providerKey}: ${error.message}`);
      return { received: true, ignored: true, reason: error.message };
    }

    const adapter = this.registry.get(provider.providerType);
    if (!adapter.verifyWebhook) {
      this.logger.warn(
        `Webhook ignored: provider ${provider.providerType} has no webhook handler`,
      );
      return { received: true, ignored: true, reason: 'No webhook handler' };
    }

    const ctx = this.registry.contextFor(provider);

    let verification;
    try {
      verification = await adapter.verifyWebhook(
        { payload, headers, rawBody },
        ctx,
      );
    } catch (error: any) {
      this.logger.warn(`Webhook rejected for ${providerKey}: ${error.message}`);
      return {
        received: true,
        ignored: true,
        reason: 'Invalid signature',
        message: error.message,
      };
    }

    if (!verification.paid) {
      return {
        received: true,
        ignored: true,
        event: verification.event,
        reason: 'Non-paid event',
      };
    }

    const lookupRef = verification.merchantReference || verification.reference;
    if (!lookupRef) {
      return {
        received: true,
        ignored: true,
        event: verification.event,
        reason: 'Missing reference',
      };
    }

    const tx = await this.gateway.findTransactionByProviderReference(
      undefined,
      provider.id,
      lookupRef,
    );
    if (!tx) {
      this.logger.warn(
        `Webhook for ${providerKey} ${lookupRef} ignored: no matching payment transaction`,
      );
      return {
        received: true,
        ignored: true,
        event: verification.event,
        reference: lookupRef,
        reason: 'Transaction not found',
      };
    }

    const wasTerminal = tx.status === 'success' || tx.status === 'settled';
    if (!wasTerminal) {
      await this.gateway.markPaid(
        tx,
        verification.amountPaid ?? tx.amount,
        verification.paidAt ? new Date(verification.paidAt) : undefined,
      );
    }

    return {
      received: true,
      processed: !wasTerminal,
      duplicate: wasTerminal,
      provider: provider.code,
      reference: lookupRef,
      status: tx.status,
      event: verification.event,
    };
  }
}
