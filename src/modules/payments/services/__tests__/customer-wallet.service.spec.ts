import { BadRequestException } from '@nestjs/common';
import { CustomerWalletService } from '../customer-wallet.service';

function walletRepo() {
  return {
    findOne: jest.fn(),
    create: jest.fn((x: any) => x),
    save: jest.fn((x: any) => Promise.resolve(x)),
  };
}

function txRepo() {
  return {
    create: jest.fn((x: any) => x),
    save: jest.fn((x: any) => Promise.resolve(x)),
    find: jest.fn().mockResolvedValue([]),
  };
}

function setup() {
  const wallet = walletRepo();
  const tx = txRepo();
  const accounting = {
    recordWalletDeposit: jest.fn().mockResolvedValue(undefined),
  };
  const svc = new CustomerWalletService(
    wallet as any,
    tx as any,
    accounting as any,
  );
  return { svc, wallet, tx, accounting };
}

const ORG = 'org-1';
const USER = 'user-1';

describe('CustomerWalletService', () => {
  it('lazily creates a wallet on first balance query', async () => {
    const { svc, wallet } = setup();
    wallet.findOne.mockResolvedValue(null);

    const created = await svc.getOrCreate(ORG, USER);
    expect(created.balance).toBe(0);
    expect(wallet.create).toHaveBeenCalledWith({
      organizationId: ORG,
      userId: USER,
      balance: 0,
      currency: 'NGN',
    });
    expect(wallet.save).toHaveBeenCalled();
  });

  it('credits a wallet, writes a ledger entry and posts the deposit journal', async () => {
    const { svc, wallet, tx, accounting } = setup();
    wallet.findOne.mockResolvedValue({
      id: 'w1',
      organizationId: ORG,
      userId: USER,
      balance: 100,
      currency: 'NGN',
    });

    const result = await svc.credit(ORG, USER, 50, {
      paymentReference: 'PMT-1',
      note: 'top up',
    });

    expect(result.balance).toBe(150);
    expect(tx.save).toHaveBeenCalledWith(
      expect.objectContaining({
        walletId: 'w1',
        type: 'deposit',
        amount: 50,
        balanceAfter: 150,
        paymentReference: 'PMT-1',
      }),
    );
    expect(accounting.recordWalletDeposit).toHaveBeenCalledWith(
      ORG,
      expect.objectContaining({ amount: 50 }),
    );
  });

  it('rejects zero/negative credits', async () => {
    const { svc } = setup();
    await expect(svc.credit(ORG, USER, 0)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('debits a wallet and prevents overdraws', async () => {
    const { svc, wallet, tx } = setup();
    wallet.findOne.mockResolvedValue({
      id: 'w1',
      organizationId: ORG,
      userId: USER,
      balance: 100,
      currency: 'NGN',
    });

    const result = await svc.debit(ORG, USER, 40, { sourceType: 'payment' });
    expect(result.balance).toBe(60);
    expect(tx.save).toHaveBeenCalledWith(
      expect.objectContaining({
        walletId: 'w1',
        type: 'payment',
        amount: 40,
        balanceAfter: 60,
      }),
    );

    await expect(svc.debit(ORG, USER, 999)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('returns wallet history', async () => {
    const { svc, wallet, tx } = setup();
    wallet.findOne.mockResolvedValue({
      id: 'w1',
      organizationId: ORG,
      userId: USER,
      balance: 0,
      currency: 'NGN',
    });

    await svc.history(ORG, USER);
    expect(tx.find).toHaveBeenCalledWith(
      expect.objectContaining({ where: { walletId: 'w1' } }),
    );
  });
});
