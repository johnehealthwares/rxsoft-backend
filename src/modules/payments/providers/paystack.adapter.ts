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

const DEFAULT_BASE_URL = 'https://api.paystack.co';

function baseUrl(
  creds: ProviderContext['creds'],
  isProduction: boolean,
): string {
  return creds.baseUrl || DEFAULT_BASE_URL;
}

export class PaystackAdapter implements PaymentProviderAdapter {
  readonly type = 'paystack' as const;

  private requireSecret(ctx: ProviderContext): string {
    const secret =
      (ctx.isProduction ? ctx.creds.secretKey : ctx.creds.secretKey) ??
      ctx.creds.apiKey;
    if (!secret) throw new Error('Paystack secret key is not configured');
    return secret;
  }

  async initialize(
    input: InitiatePaymentInput,
    ctx: ProviderContext,
  ): Promise<InitiatePaymentOutput> {
    const secret = this.requireSecret(ctx);
    const payload: Record<string, unknown> = {
      email: input.email || 'payments@rxsoft.health',
      amount: Math.round(input.amount * 100),
      reference: input.reference,
      metadata: {
        ...(input.metadata || {}),
        channel: input.channel,
        userId: input.userId,
      },
    };
    if (input.returnUrl) payload.callback_url = input.returnUrl;

    const response = await axios.post(
      `${baseUrl(ctx.creds, ctx.isProduction)}/transaction/initialize`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${secret}`,
          'Content-Type': 'application/json',
        },
        timeout: 20000,
      },
    );

    const data = response.data?.data ?? {};
    if (!response.data?.status) {
      throw new Error(
        response.data?.message || 'Paystack initialization failed',
      );
    }

    return {
      checkoutUrl: data.authorization_url ?? undefined,
      providerReference: data.reference ?? data.access_code ?? undefined,
      status: 'pending',
      metadata: { request: response.data },
    };
  }

  async initiatePos(
    input: PosInitiateInput,
    ctx: ProviderContext,
  ): Promise<PosInitiateOutput> {
    const secret = this.requireSecret(ctx);
    const payload = {
      email: ctx.creds.apiKey || 'payments@rxsoft.health',
      amount: Math.round(input.amount * 100),
      reference: input.reference,
      metadata: {
        ...(input.metadata || {}),
        paymentMethod: 'POS',
        terminalId: input.terminalId,
        terminalSerial: input.terminalSerial,
      },
    };

    await axios.post(
      `${baseUrl(ctx.creds, ctx.isProduction)}/transaction/initialize`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${secret}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      },
    );

    return {
      providerReference: input.reference,
      status: 'pending',
      nextAction: 'SWIPE_CARD',
      metadata: { terminalId: input.terminalId },
    };
  }

  async verify(
    reference: string,
    ctx: ProviderContext,
  ): Promise<VerifyPaymentOutput> {
    const secret = this.requireSecret(ctx);
    const response = await axios.get(
      `${baseUrl(ctx.creds, ctx.isProduction)}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secret}` },
        timeout: 15000,
      },
    );
    const data = response.data?.data ?? {};
    return {
      status: normalizeProviderStatus('paystack', data.status),
      amountPaid: data.amount != null ? Number(data.amount) / 100 : undefined,
      providerReference: data.reference ?? reference,
      paidAt: data.paid_at ?? undefined,
      metadata: { verification: data },
    };
  }

  async verifyWebhook(
    input: WebhookVerificationInput,
    ctx: ProviderContext,
  ): Promise<WebhookVerificationOutput> {
    const secret = this.requireSecret(ctx);
    const signature = String(input.headers['x-paystack-signature'] || '');
    if (!signature) throw new Error('Missing x-paystack-signature');
    const raw = JSON.stringify(input.payload);
    const expected = createHmac('sha512', secret).update(raw).digest('hex');
    if (expected !== signature)
      throw new Error('Invalid Paystack webhook signature');

    const body = input.payload as {
      event?: string;
      data?: Record<string, unknown>;
    };
    const data = body.data ?? {};
    const event = body.event ?? '';
    const status = normalizeProviderStatus(
      'paystack',
      String(data.status ?? ''),
    );
    const paid = event === 'charge.success' || status === 'success';

    return {
      event,
      reference: String(data.reference ?? ''),
      merchantReference: String(data.reference ?? ''),
      rawStatus: String(data.status ?? ''),
      amountPaid: data.amount != null ? Number(data.amount) / 100 : undefined,
      paidAt: typeof data.paid_at === 'string' ? data.paid_at : undefined,
      paid,
      metadata: { data },
    };
  }
}
