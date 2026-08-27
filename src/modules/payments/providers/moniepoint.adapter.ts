import axios from 'axios';
import { createHmac, timingSafeEqual } from 'crypto';
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

const DEFAULT_BASE_URL = 'https://api.pos.moniepoint.com';

function baseUrl(
  creds: ProviderContext['creds'],
  isProduction: boolean,
): string {
  // Moniepoint uses a single API host for both test and live POS terminals;
  // callers may override per-environment via creds.
  return isProduction
    ? creds.baseUrl || DEFAULT_BASE_URL
    : creds.sandboxBaseUrl || DEFAULT_BASE_URL;
}

const APPROVED_TRANSACTION_STATUSES = new Set([
  'APPROVED',
  'SUCCESS',
  'SUCCESSFUL',
  'PROCESSED',
]);

export class MoniepointAdapter implements PaymentProviderAdapter {
  readonly type = 'moniepoint' as const;

  private requireApiKey(ctx: ProviderContext): string {
    const apiKey = ctx.creds.apiKey;
    if (!apiKey) throw new Error('Moniepoint apiKey is not configured');
    return apiKey;
  }

  async initialize(
    input: InitiatePaymentInput,
    ctx: ProviderContext,
  ): Promise<InitiatePaymentOutput> {
    throw new Error('Moniepoint only supports POS/terminal initiated payments');
  }

  async initiatePos(
    input: PosInitiateInput,
    ctx: ProviderContext,
  ): Promise<PosInitiateOutput> {
    const apiKey = this.requireApiKey(ctx);
    const payload: Record<string, unknown> = {
      terminalSerial: input.terminalSerial,
      amount: Math.round(input.amount * 100),
      merchantReference: input.reference,
      transactionType: 'PURCHASE',
      paymentMethod: 'ANY',
    };
    if (ctx.creds.contractCode) payload.merchantCode = ctx.creds.contractCode;

    await axios.post(
      `${baseUrl(ctx.creds, ctx.isProduction)}/v1/transactions`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      },
    );

    return {
      providerReference: input.reference,
      status: 'pending',
      nextAction: 'SWIPE_CARD',
      metadata: { terminalSerial: input.terminalSerial, request: payload },
    };
  }

  async verify(
    reference: string,
    ctx: ProviderContext,
  ): Promise<VerifyPaymentOutput> {
    const apiKey = this.requireApiKey(ctx);
    const response = await axios.get(
      `${baseUrl(ctx.creds, ctx.isProduction)}/v1/transactions/merchants/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      },
    );
    const data = response.data ?? {};
    return {
      status: normalizeProviderStatus('moniepoint', data.processingStatus),
      amountPaid:
        data.actualAmount != null ? Number(data.actualAmount) / 100 : undefined,
      providerReference: data.transactionReference ?? undefined,
      metadata: { verification: data },
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
    const webhookId = String(input.headers['moniepoint-webhook-id'] || '');
    const timestamp = String(
      input.headers['moniepoint-webhook-timestamp'] || '',
    );
    const signature = String(
      input.headers['moniepoint-webhook-signature'] || '',
    );
    if (!webhookId || !timestamp || !signature) {
      throw new Error('Missing Moniepoint webhook headers');
    }

    // Replay protection: reject webhooks older than 5 minutes.
    const age = Math.abs(Date.now() - Number(timestamp));
    if (age > 5 * 60 * 1000)
      throw new Error('Moniepoint webhook timestamp expired');

    const secret = ctx.creds.webhookSecret || ctx.creds.secretKey;
    if (!secret) throw new Error('Moniepoint webhookSecret is not configured');

    const rawBody =
      typeof input.payload === 'string'
        ? input.payload
        : JSON.stringify(input.payload);
    const signedPayload = `${webhookId}__${timestamp}__${rawBody}`;
    const expected = createHmac('sha256', secret)
      .update(signedPayload)
      .digest('base64');
    if (expected !== signature)
      throw new Error('Invalid Moniepoint webhook signature');

    const body = input.payload as {
      eventId?: string;
      eventType?: string;
      data?: Record<string, unknown>;
    };
    const data = body.data ?? {};
    const rawStatus = String(data.transactionStatus ?? '');
    const status = normalizeProviderStatus('moniepoint', rawStatus);
    const merchantReference = String(data.merchantReference ?? '');
    const approved =
      APPROVED_TRANSACTION_STATUSES.has(rawStatus) || status === 'success';

    return {
      event: body.eventType ?? '',
      reference: String(data.transactionReference ?? merchantReference),
      merchantReference,
      rawStatus,
      amountPaid: data.amount != null ? Number(data.amount) / 100 : undefined,
      paid: approved && !!merchantReference,
      metadata: {
        webhookId,
        eventId: body.eventId,
        terminalSerial: data.terminalSerial,
        responseCode: data.responseCode,
        responseMessage: data.responseMessage,
        transactionReference: data.transactionReference,
      },
    };
  }
}
