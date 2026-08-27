import { createHmac } from 'crypto';
import axios from 'axios';
import { PaystackAdapter } from './paystack.adapter';
import type {
  InitiatePaymentInput,
  ProviderContext,
} from './payment-provider.adapter';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ctx: ProviderContext = {
  creds: { secretKey: 'sk_test_secret' },
  isProduction: false,
};
const secret = ctx.creds.secretKey as string;

function signed(payload: unknown, s = secret) {
  return createHmac('sha512', s).update(JSON.stringify(payload)).digest('hex');
}

describe('PaystackAdapter', () => {
  const adapter = new PaystackAdapter();

  beforeEach(() => jest.clearAllMocks());

  it('initializes a web payment (amount in kobo, returns checkout URL)', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        status: true,
        data: {
          authorization_url: 'https://checkout.paystack.com/abc',
          reference: 'ref-1',
        },
      },
    });

    const input: InitiatePaymentInput = {
      amount: 123.45,
      reference: 'ref-1',
      email: 'cust@rxsoft.health',
      returnUrl: 'https://app/return',
      channel: 'web',
    };
    const out = await adapter.initialize(input, ctx);

    const [url, body, config] = mockedAxios.post.mock.calls[0] as [
      string,
      any,
      any,
    ];
    expect(url).toBe('https://api.paystack.co/transaction/initialize');
    expect(body.amount).toBe(12345);
    expect(body.reference).toBe('ref-1');
    expect(body.callback_url).toBe('https://app/return');
    expect(config.headers.Authorization).toBe('Bearer sk_test_secret');
    expect(out.checkoutUrl).toBe('https://checkout.paystack.com/abc');
    expect(out.status).toBe('pending');
  });

  it('verifies a transaction and normalizes kobo to naira', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        status: true,
        data: {
          status: 'success',
          amount: 500000,
          paid_at: '2026-08-26T10:00:00Z',
        },
      },
    });

    const out = await adapter.verify('ref-1', ctx);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.paystack.co/transaction/verify/ref-1',
      expect.any(Object),
    );
    expect(out.status).toBe('success');
    expect(out.amountPaid).toBe(5000);
  });

  it('passes a valid webhook signature and flags the payment paid', async () => {
    const payload = {
      event: 'charge.success',
      data: { status: 'success', reference: 'ref-1', amount: 10000 },
    };
    const out = await adapter.verifyWebhook(
      { payload, headers: { 'x-paystack-signature': signed(payload) } },
      ctx,
    );

    expect(out.paid).toBe(true);
    expect(out.merchantReference).toBe('ref-1');
    expect(out.amountPaid).toBe(100);
  });

  it('rejects a webhook with an invalid signature', async () => {
    const payload = {
      event: 'charge.success',
      data: { status: 'success', reference: 'ref-1' },
    };
    await expect(
      adapter.verifyWebhook(
        { payload, headers: { 'x-paystack-signature': 'deadbeef' } },
        ctx,
      ),
    ).rejects.toThrow('Invalid Paystack webhook signature');
  });

  it('rejects a webhook missing the signature header', async () => {
    await expect(
      adapter.verifyWebhook(
        { payload: { event: 'charge.success' }, headers: {} },
        ctx,
      ),
    ).rejects.toThrow('Missing x-paystack-signature');
  });
});
