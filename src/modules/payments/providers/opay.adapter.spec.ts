import { createHmac } from 'crypto';
import axios from 'axios';
import { OpayAdapter } from './opay.adapter';
import type {
  InitiatePaymentInput,
  PosInitiateInput,
  ProviderContext,
} from './payment-provider.adapter';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ctx: ProviderContext = {
  creds: {
    publicKey: 'OPAYPUB123456',
    secretKey: 'OPAYPRV654321',
    merchantId: '256621051120756',
  },
  isProduction: false,
};

describe('OpayAdapter', () => {
  const adapter = new OpayAdapter();

  beforeEach(() => jest.clearAllMocks());

  it('creates a cashier payment using the public key and kobo amounts', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        code: '00000',
        message: 'SUCCESSFUL',
        data: {
          reference: 'ref-1',
          orderNo: 'ORDER-1',
          cashierUrl:
            'https://sandboxcashier.opaycheckout.com/pay?orderToken=TOKEN.x',
        },
      },
    });

    const input: InitiatePaymentInput = {
      amount: 12.5,
      reference: 'ref-1',
      email: 'c@x.com',
      returnUrl: 'https://app/back',
      channel: 'web',
    };
    const out = await adapter.initialize(input, ctx);

    const [url, body, config] = mockedAxios.post.mock.calls[0] as [
      string,
      any,
      any,
    ];
    expect(url).toBe(
      'https://testapi.opaycheckout.com/api/v1/international/cashier/create',
    );
    expect(body.amount.total).toBe(1250);
    expect(body.reference).toBe('ref-1');
    expect(config.headers.Authorization).toBe('Bearer OPAYPUB123456');
    expect(config.headers.MerchantId).toBe('256621051120756');
    expect(out.checkoutUrl).toBe(
      'https://sandboxcashier.opaycheckout.com/pay?orderToken=TOKEN.x',
    );
    expect(out.status).toBe('pending');
  });

  it('rethrows OPay domain errors (e.g. duplicate reference)', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { code: '02004', message: 'the payment reference already exists.' },
    });
    await expect(
      adapter.initialize({ amount: 10, reference: 'dup', channel: 'web' }, ctx),
    ).rejects.toThrow('the payment reference already exists');
  });

  it('initiates a POS payment signed with HMAC-SHA512 of the body', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        code: '00000',
        message: 'SUCCESSFUL',
        data: {
          reference: 'ref-pos',
          orderNo: 'ORDER-POS',
          status: 'PENDING',
          nextAction: { actionType: 'SWIPE_CARD' },
          amount: { total: 400, currency: 'NGN' },
        },
      },
    });

    const input: PosInitiateInput = {
      amount: 4,
      reference: 'ref-pos',
      terminalSerial: 'N78101818218',
      channel: 'pos' as never,
    };
    // PosInitiateInput has no channel — cast to satisfy the shape used by the adapter call.
    const out = await adapter.initiatePos(input as never, ctx);

    const [, body, config] = mockedAxios.post.mock.calls[0] as [
      string,
      any,
      any,
    ];
    expect(body.payMethod).toBe('Pos');
    expect(body.sn).toBe('N78101818218');
    expect(config.headers.MerchantId).toBe('256621051120756');
    const expectedSig = createHmac('sha512', ctx.creds.secretKey as string)
      .update(JSON.stringify(body))
      .digest('hex');
    expect(config.headers.Authorization).toBe(`Bearer ${expectedSig}`);
    expect(out.nextAction).toBe('SWIPE_CARD');
  });

  it('queries status and normalizes SUCCESS', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        code: '00000',
        message: 'SUCCESSFUL',
        data: {
          reference: 'ref-1',
          orderNo: 'ORDER-1',
          status: 'SUCCESS',
          amount: { total: 1250, currency: 'NGN' },
        },
      },
    });

    const out = await adapter.verify('ref-1', ctx);
    const [, body, config] = mockedAxios.post.mock.calls[0] as [
      string,
      any,
      any,
    ];

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://testapi.opaycheckout.com/api/v1/international/cashier/status',
      expect.anything(),
      expect.anything(),
    );
    const expectedSig = createHmac('sha512', ctx.creds.secretKey as string)
      .update(JSON.stringify(body))
      .digest('hex');
    expect(config.headers.Authorization).toBe(`Bearer ${expectedSig}`);
    expect(out.status).toBe('success');
    expect(out.amountPaid).toBe(12.5);
  });

  it('rejects a webhook with a bad signature and accepts a valid one', async () => {
    const payload = {
      payload: {
        amount: '49160',
        currency: 'NGN',
        reference: 'ref-1',
        refunded: false,
        status: 'SUCCESS',
        timestamp: '2022-05-07T06:20:46Z',
        token: 'T',
        transactionId: 'ID1',
      },
      sha512: 'deadbeef',
      type: 'transaction-status',
    };
    await expect(
      adapter.verifyWebhook({ payload, headers: {} }, ctx),
    ).rejects.toThrow('Invalid OPay webhook signature');

    const sigContent = `{Amount:"49160",Currency:"NGN",Reference:"ref-1",Refunded:f,Status:"SUCCESS",Timestamp:"2022-05-07T06:20:46Z",Token:"T",TransactionID:"ID1"}`;
    const sig = createHmac('sha3-512', ctx.creds.secretKey as string)
      .update(sigContent)
      .digest('hex');
    const valid = adapter.verifyWebhook(
      { payload: { ...payload, sha512: sig }, headers: {} },
      ctx,
    );
    await expect(valid).resolves.toMatchObject({
      paid: true,
      rawStatus: 'SUCCESS',
    });
  });
});
