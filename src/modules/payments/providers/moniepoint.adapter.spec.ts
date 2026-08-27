import { createHmac } from 'crypto';
import axios from 'axios';
import { MoniepointAdapter } from './moniepoint.adapter';
import type {
  PosInitiateInput,
  ProviderContext,
} from './payment-provider.adapter';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ctx: ProviderContext = {
  creds: {
    apiKey: 'mptp_test_key',
    contractCode: '6971731247',
    webhookSecret: 'wk-secret',
  },
  isProduction: false,
};

const APPROVED_PROCESSING = 'APPROVED';

describe('MoniepointAdapter', () => {
  const adapter = new MoniepointAdapter();

  beforeEach(() => jest.clearAllMocks());

  it('initiates a terminal transaction with kobo amount and contract code', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { status: 'OK' } });

    const out = await adapter.initiatePos(
      {
        amount: 99.99,
        reference: 'MP-1',
        terminalSerial: 'SERIAL-9',
        channel: 'pos' as never,
      } as PosInitiateInput,
      ctx,
    );

    const [url, body, config] = mockedAxios.post.mock.calls[0] as [
      string,
      any,
      any,
    ];
    expect(url).toBe('https://api.pos.moniepoint.com/v1/transactions');
    expect(body.terminalSerial).toBe('SERIAL-9');
    expect(body.amount).toBe(9999);
    expect(body.merchantReference).toBe('MP-1');
    expect(body.merchantCode).toBe('6971731247');
    expect(config.headers.Authorization).toBe('Bearer mptp_test_key');
    expect(out.status).toBe('pending');
  });

  it('rejects web / initialize for moniepoint (POS only)', async () => {
    await expect(
      adapter.initialize(
        { amount: 10, reference: 'r', channel: 'pos' as never } as never,
        ctx,
      ),
    ).rejects.toThrow('POS');
  });

  it('verifies a merchant transaction and maps processing status', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        processingStatus: APPROVED_PROCESSING,
        merchantReference: 'MP-1',
        transactionReference: 'TXN-1',
        actualAmount: 9999,
        actualPaymentMethod: 'CARD',
        terminalSerial: 'SERIAL-9',
      },
    });

    const out = await adapter.verify('MP-1', ctx);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.pos.moniepoint.com/v1/transactions/merchants/MP-1',
      expect.anything(),
    );
    expect(out.status).toBe('success');
    expect(out.amountPaid).toBe(99.99);
  });

  it('rejects webhooks older than 5 minutes (replay protection)', async () => {
    const stale = String(Date.now() - 6 * 60 * 1000);
    const payload = {
      eventId: 'w1',
      eventType: 'PAYMENT',
      data: {
        merchantReference: 'MP-1',
        transactionStatus: 'APPROVED',
        amount: 9999,
      },
    };
    const raw = JSON.stringify(payload);

    await expect(
      adapter.verifyWebhook(
        {
          payload,
          rawBody: raw,
          headers: {
            'moniepoint-webhook-id': 'w1',
            'moniepoint-webhook-timestamp': stale,
            'moniepoint-webhook-signature': 'x',
          },
        },
        ctx,
      ),
    ).rejects.toThrow('expired');
  });

  it('verifies a valid signed webhook and flags the transaction paid', async () => {
    const payload = {
      eventId: 'w2',
      eventType: 'PAYMENT',
      data: {
        merchantReference: 'MP-2',
        transactionReference: 'TXN-2',
        transactionStatus: 'APPROVED',
        amount: 5000,
        terminalSerial: 'SERIAL-9',
      },
    };
    const raw = JSON.stringify(payload);
    const webhookId = 'w2';
    const timestamp = String(Date.now());
    const signature = createHmac('sha256', ctx.creds.webhookSecret as string)
      .update(`${webhookId}__${timestamp}__${raw}`)
      .digest('base64');

    const out = await adapter.verifyWebhook(
      {
        payload,
        rawBody: raw,
        headers: {
          'moniepoint-webhook-id': webhookId,
          'moniepoint-webhook-timestamp': timestamp,
          'moniepoint-webhook-signature': signature,
        },
      },
      ctx,
    );

    expect(out.paid).toBe(true);
    expect(out.merchantReference).toBe('MP-2');
    expect(out.amountPaid).toBe(50);
  });
});
