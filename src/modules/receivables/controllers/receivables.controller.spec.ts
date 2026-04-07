import { ReceivablesController } from './receivables.controller';
import type { ApplyReceivableAdjustmentUseCase } from '../services/apply-receivable-adjustment.use-case';
import type { CollectReceivablePaymentUseCase } from '../services/collect-receivable-payment.use-case';
import type { ListReceivableTransactionsUseCase } from '../services/list-receivable-transactions.use-case';
import type { ListReceivablesUseCase } from '../services/list-receivables.use-case';
import type { WriteOffReceivableUseCase } from '../services/write-off-receivable.use-case';

describe('ReceivablesController', () => {
  const listReceivablesUseCase: jest.Mocked<ListReceivablesUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<ListReceivablesUseCase>;

  const collectReceivablePaymentUseCase: jest.Mocked<CollectReceivablePaymentUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<CollectReceivablePaymentUseCase>;

  const applyReceivableAdjustmentUseCase: jest.Mocked<ApplyReceivableAdjustmentUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<ApplyReceivableAdjustmentUseCase>;

  const writeOffReceivableUseCase: jest.Mocked<WriteOffReceivableUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<WriteOffReceivableUseCase>;

  const listReceivableTransactionsUseCase: jest.Mocked<ListReceivableTransactionsUseCase> = {
    execute: jest.fn(),
  } as unknown as jest.Mocked<ListReceivableTransactionsUseCase>;

  const controller = new ReceivablesController(
    listReceivablesUseCase,
    collectReceivablePaymentUseCase,
    applyReceivableAdjustmentUseCase,
    writeOffReceivableUseCase,
    listReceivableTransactionsUseCase,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('maps list response', async () => {
    listReceivablesUseCase.execute.mockResolvedValue({
      items: [
        {
          id: 'ar1',
          organizationId: 'org1',
          customerId: 'cust1',
          saleId: 'sale1',
          receivableNumber: 'AR-SALE-0001',
          originalAmount: 100,
          outstandingAmount: 100,
          status: 'open',
          openedAt: new Date('2026-02-20T10:00:00.000Z'),
          closedAt: null,
        },
      ],
      total: 1,
    });

    const result = await controller.list(
      {
        page: 1,
        limit: 20,
        get offset() {
          return 0;
        },
      },
      { sub: 'u1', organizationId: 'org1', username: 'admin', roles: ['admin'], permissions: [] },
    );

    expect(result.data[0]).toMatchObject({
      id: 'ar1',
      receivableNumber: 'AR-SALE-0001',
      status: 'open',
      openedAt: '2026-02-20T10:00:00.000Z',
    });
  });

  it('maps transaction list response', async () => {
    listReceivableTransactionsUseCase.execute.mockResolvedValue({
      items: [
        {
          id: 'tx1',
          receivableId: 'ar1',
          transactionType: 'payment',
          amount: 60,
          transactionDate: new Date('2026-02-21T10:00:00.000Z'),
          paymentMethodId: 'pm1',
          referenceNumber: 'REF-001',
          receivedByUserId: 'u1',
          note: 'first payment',
        },
      ],
      total: 1,
    });

    const result = await controller.listTransactions(
      'ar1',
      {
        page: 1,
        limit: 20,
        get offset() {
          return 0;
        },
      },
      { sub: 'u1', organizationId: 'org1', username: 'admin', roles: ['admin'], permissions: [] },
    );

    expect(result.data[0]).toMatchObject({
      id: 'tx1',
      receivableId: 'ar1',
      transactionType: 'payment',
      transactionDate: '2026-02-21T10:00:00.000Z',
    });
  });

  it('maps apply adjustment response', async () => {
    applyReceivableAdjustmentUseCase.execute.mockResolvedValue({
      receivable: {
        id: 'ar1',
        organizationId: 'org1',
        customerId: 'cust1',
        saleId: 'sale1',
        receivableNumber: 'AR-SALE-0001',
        originalAmount: 100,
        outstandingAmount: 120,
        status: 'open',
        openedAt: new Date('2026-02-20T10:00:00.000Z'),
        closedAt: null,
      },
      transactionId: 'tx2',
    });

    const result = await controller.applyAdjustment(
      'ar1',
      { amount: 20, note: 'manual correction' },
      { sub: 'u1', organizationId: 'org1', username: 'admin', roles: ['admin'], permissions: [] },
    );

    expect(result).toMatchObject({
      transactionId: 'tx2',
      receivable: {
        id: 'ar1',
        outstandingAmount: 120,
      },
    });
  });

  it('maps write off response', async () => {
    writeOffReceivableUseCase.execute.mockResolvedValue({
      receivable: {
        id: 'ar1',
        organizationId: 'org1',
        customerId: 'cust1',
        saleId: 'sale1',
        receivableNumber: 'AR-SALE-0001',
        originalAmount: 100,
        outstandingAmount: 0,
        status: 'written_off',
        openedAt: new Date('2026-02-20T10:00:00.000Z'),
        closedAt: new Date('2026-02-22T10:00:00.000Z'),
      },
      transactionId: 'tx3',
    });

    const result = await controller.writeOff(
      'ar1',
      { note: 'approved write off' },
      { sub: 'u1', organizationId: 'org1', username: 'admin', roles: ['admin'], permissions: [] },
    );

    expect(result).toMatchObject({
      transactionId: 'tx3',
      receivable: {
        id: 'ar1',
        status: 'written_off',
      },
    });
  });
});
