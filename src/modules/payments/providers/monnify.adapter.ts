import axios from 'axios';
import { createHmac, timingSafeEqual } from 'crypto';
import {
  InitiatePaymentInput,
  InitiatePaymentOutput,
  PaymentProviderAdapter,
  ProviderContext,
  VerifyPaymentOutput,
  WebhookVerificationInput,
  WebhookVerificationOutput,
} from './payment-provider.adapter';
import { normalizeProviderStatus } from './status-map';

const DEFAULT_LIVE_BASE_URL = 'https://api.monnify.com';
const DEFAULT_SANDBOX_BASE_URL = 'https://sandboxapi.monnify.com';

function baseUrl(
  creds: ProviderContext['creds'],
  isProduction: boolean,
): string {
  if (isProduction) return creds.baseUrl || DEFAULT_LIVE_BASE_URL;
  return creds.sandboxBaseUrl || DEFAULT_SANDBOX_BASE_URL;
}

export class MonnifyAdapter implements PaymentProviderAdapter {
  readonly type = 'monnify' as const;

  private accessToken: string | null = null;
  private tokenExpiresAt = 0;

  private requireApiKey(ctx: ProviderContext): {
    apiKey: string;
    secretKey: string;
  } {
    const apiKey = ctx.creds.apiKey;
    const secretKey = ctx.isProduction
      ? ctx.creds.apiSecret
      : ctx.creds.apiSecret;
    if (!apiKey || !secretKey)
      throw new Error('Monnify apiKey/secretKey are not configured');
    return { apiKey, secretKey };
  }

  private async getToken(ctx: ProviderContext): Promise<string> {
    if (this.accessToken && this.tokenExpiresAt > Date.now() + 60_000)
      return this.accessToken;
    const { apiKey, secretKey } = this.requireApiKey(ctx);
    const auth = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');
    const response = await axios.post(
      `${baseUrl(ctx.creds, ctx.isProduction)}/api/v1/auth/login`,
      null,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      },
    );
    const body = response.data ?? {};
    if (!body.requestSuccessful || !body.responseBody?.accessToken) {
      throw new Error(body.responseMessage || 'Monnify authentication failed');
    }
    const expiresIn = Number(body.responseBody.expiresIn) || 3600;
    this.accessToken = String(body.responseBody.accessToken);
    this.tokenExpiresAt = Date.now() + expiresIn * 1000;
    return this.accessToken!;
  }

  async initialize(
    input: InitiatePaymentInput,
    ctx: ProviderContext,
  ): Promise<InitiatePaymentOutput> {
    const contractCode = ctx.creds.contractCode;
    if (!contractCode)
      throw new Error('Monnify contractCode is not configured');
    const token = await this.getToken(ctx);

    const payload: Record<string, unknown> = {
      amount: input.amount,
      paymentReference: input.reference,
      contractCode,
      currencyCode: input.currency || 'NGN',
      paymentDescription: input.descriptor || 'RxSoft payment',
      paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
    };
    if (input.returnUrl) payload.redirectUrl = input.returnUrl;
    if (input.email) payload.customerEmail = input.email;
    if (input.customerName) payload.customerName = input.customerName;
    if (input.metadata) payload.metadata = input.metadata;

    const response = await axios.post(
      `${baseUrl(ctx.creds, ctx.isProduction)}/api/v1/merchant/transactions/init-transaction`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 20000,
      },
    );
    const body = response.data ?? {};
    if (!body.requestSuccessful || !body.responseBody) {
      throw new Error(
        body.responseMessage || 'Monnify transaction initialization failed',
      );
    }
    const data = body.responseBody ?? {};
    return {
      checkoutUrl: data.checkoutUrl ?? undefined,
      providerReference: data.transactionReference ?? undefined,
      status: 'initiated',
      metadata: { responseBody: data },
    };
  }

  async verify(
    reference: string,
    ctx: ProviderContext,
  ): Promise<VerifyPaymentOutput> {
    const token = await this.getToken(ctx);
    const response = await axios.get(
      `${baseUrl(ctx.creds, ctx.isProduction)}/api/v2/transactions/search`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { paymentReference: reference },
        timeout: 15000,
      },
    );
    const body = response.data ?? {};
    const data = body.responseBody ?? body.responsebody ?? {};
    return {
      status: normalizeProviderStatus('monnify', data.paymentStatus),
      amountPaid: data.amountPaid != null ? Number(data.amountPaid) : undefined,
      providerReference: data.transactionReference ?? undefined,
      paidAt: data.paidOn ?? undefined,
      metadata: { verification: data },
    };
  }

  async verifyWebhook(
    input: WebhookVerificationInput,
    ctx: ProviderContext,
  ): Promise<WebhookVerificationOutput> {
    const secret = ctx.creds.apiSecret;
    if (!secret) throw new Error('Monnify secretKey is not configured');

    const signature = String(input.headers['monnify-signature'] || '');
    // Sandbox notifications omit the signature; production always includes it.
    if (signature) {
      const raw = input.rawBody || JSON.stringify(input.payload);
      const expected = createHmac('sha512', secret).update(raw).digest('hex');
      const expectedBuf = Buffer.from(expected);
      const receivedBuf = Buffer.from(signature);
      if (
        expectedBuf.length !== receivedBuf.length ||
        !timingSafeEqual(expectedBuf, receivedBuf)
      ) {
        throw new Error('Invalid Monnify webhook signature');
      }
    }

    const body = input.payload as {
      eventType?: string;
      eventData?: Record<string, unknown>;
    };
    const eventData = body.eventData ?? {};
    const event = body.eventType ?? '';
    const paymentStatus = String(eventData.paymentStatus ?? '');
    const paid = paymentStatus === 'PAID' || event === 'SUCCESSFUL_TRANSACTION';
    const processedEventMap: Record<string, string> = {
      SUCCESSFUL_TRANSACTION: 'success',
      FAILED_TRANSACTION: 'failed',
      REVERSED_TRANSACTION: 'reversed',
      SETTLEMENT_COMPLETED: 'settled',
    };

    return {
      event,
      reference: String(eventData.transactionReference ?? ''),
      merchantReference: String(eventData.paymentReference ?? ''),
      rawStatus: paymentStatus,
      amountPaid:
        eventData.amountPaid != null ? Number(eventData.amountPaid) : undefined,
      paidAt:
        typeof eventData.paidOn === 'string' ? eventData.paidOn : undefined,
      paid,
      metadata: { eventData, normalizedEvent: processedEventMap[event] },
    };
  }

  async settled(reference: string, ctx: ProviderContext): Promise<boolean> {
    const verification = await this.verify(reference, ctx);
    const v = verification.metadata?.verification as
      Record<string, unknown> | undefined;
    const settlementAmount = Number(v?.settlementAmount ?? 0);
    return verification.status === 'success' && settlementAmount > 0;
  }
}
