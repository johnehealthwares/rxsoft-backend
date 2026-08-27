import { createHmac } from 'crypto';
import axios from 'axios';
import { MonnifyAdapter } from './monnify.adapter';
import type {
  InitiatePaymentInput,
  ProviderContext,
} from './payment-provider.adapter';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ctx: ProviderContext = {
  creds: {
    apiKey: 'MK_TEST_KEY',
    apiSecret: 'MONNIFY_SECRET',
    contractCode: 'CONTRACT_1',
  },
  isProduction: false,
};

function signed(payload: unknown, secret: string) {
  return createHmac('sha512', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
}

describe('MonnifyAdapter', () => {
  const adapter = new MonnifyAdapter();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the shared adapter's bearer-token cache between tests.
    (adapter as any).accessToken = null;
    (adapter as any).tokenExpiresAt = 0;
  });

  it('authenticates with Basic credentials and caches the bearer token', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        requestSuccessful: true,
        responseBody: { accessToken: 'TOKEN-1', expiresIn: 3600 },
      },
    });

    const token = await (adapter as any).getToken(ctx);
    expect(token).toBe('TOKEN-1');

    const [url, , config] = mockedAxios.post.mock.calls[0] as [
      string,
      null,
      any,
    ];
    expect(url).toContain('/api/v1/auth/login');
    const expectedBasic = `Basic ${Buffer.from('MK_TEST_KEY:MONNIFY_SECRET').toString('base64')}`;
    expect(config.headers.Authorization).toBe(expectedBasic);

    // Second call should reuse the cached token.
    await (adapter as any).getToken(ctx);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it('initializes a hosted checkout and requires contractCode', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        requestSuccessful: true,
        responseBody: { accessToken: 'TOKEN-1', expiresIn: 3600 },
      },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        requestSuccessful: true,
        responseBody: {
          checkoutUrl: 'https://checkout.monnify.com/pay',
          transactionReference: 'MNF-1',
        },
      },
    });

    const input: InitiatePaymentInput = {
      amount: 2500,
      reference: 'ref-1',
      returnUrl: 'https://app/back',
      channel: 'web',
    };
    const out = await adapter.initialize(input, ctx);

    const [, body] = mockedAxios.post.mock.calls[1] as [string, any];
    expect(body.paymentReference).toBe('ref-1');
    expect(body.amount).toBe(2500); // naira, not kobo
    expect(body.contractCode).toBe('CONTRACT_1');
    expect(out.checkoutUrl).toBe('https://checkout.monnify.com/pay');
    expect(out.status).toBe('initiated');
  });

  it('throws when contractCode is missing', async () => {
    await expect(
      adapter.initialize(
        { amount: 10, reference: 'r', channel: 'web' },
        { ...ctx, creds: { apiKey: 'k', apiSecret: 's' } },
      ),
    ).rejects.toThrow('contractCode');
  });

  it('verifies via paymentReference search and maps paid status', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        requestSuccessful: true,
        responseBody: { accessToken: 'TOKEN-1', expiresIn: 3600 },
      },
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        requestSuccessful: true,
        responseBody: {
          paymentStatus: 'PAID',
          amountPaid: 5000,
          transactionReference: 'T1',
        },
      },
    });

    const out = await adapter.verify('ref-1', ctx);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/api/v2/transactions/search'),
      expect.objectContaining({ params: { paymentReference: 'ref-1' } }),
    );
    expect(out.status).toBe('success');
    expect(out.amountPaid).toBe(5000);
  });

  it('accepts a valid signed webhook and flags paid', async () => {
    const payload = {
      eventType: 'SUCCESSFUL_TRANSACTION',
      eventData: {
        paymentStatus: 'PAID',
        paymentReference: 'ref-1',
        transactionReference: 'T1',
        amountPaid: 3000,
      },
    };
    const out = await adapter.verifyWebhook(
      {
        payload,
        headers: {
          'monnify-signature': signed(payload, ctx.creds.apiSecret as string),
        },
      },
      ctx,
    );
    expect(out.paid).toBe(true);
    expect(out.merchantReference).toBe('ref-1');
  });

  it('accepts an unsigned sandbox webhook (signature only sent in production)', async () => {
    const payload = {
      eventType: 'SUCCESSFUL_TRANSACTION',
      eventData: {
        paymentStatus: 'PAID',
        paymentReference: 'ref-2',
        amountPaid: 1000,
      },
    };
    const out = await adapter.verifyWebhook({ payload, headers: {} }, ctx);
    expect(out.paid).toBe(true);
  });

  it('rejects an invalid webhook signature', async () => {
    const payload = {
      eventType: 'SUCCESSFUL_TRANSACTION',
      eventData: { paymentStatus: 'PAID', paymentReference: 'ref-3' },
    };
    await expect(
      adapter.verifyWebhook(
        { payload, headers: { 'monnify-signature': 'bogus' } },
        ctx,
      ),
    ).rejects.toThrow('Invalid Monnify webhook signature');
  });
});
