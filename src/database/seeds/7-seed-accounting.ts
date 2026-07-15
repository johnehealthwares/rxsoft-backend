import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

const DEFAULT_ORG_ID = '00000000-0000-0000-0000-000000000001';

const glAccounts = [
  { code: '1100', name: 'Cash & Cash Equivalents', type: 'asset', reconciles: true },
  { code: '1200', name: 'Accounts Receivable', type: 'asset', reconciles: true },
  { code: '1250', name: 'Allowance for Doubtful Accounts', type: 'asset', reconciles: false },
  { code: '1300', name: 'Inventory', type: 'asset', reconciles: true },
  { code: '1400', name: 'Fixed Assets', type: 'asset', reconciles: false },
  { code: '1410', name: 'Accumulated Depreciation', type: 'asset', reconciles: false },
  { code: '1500', name: 'Prepaid Expenses', type: 'asset', reconciles: false },
  { code: '2100', name: 'Accounts Payable', type: 'liability', reconciles: true },
  { code: '2200', name: 'Accrued Liabilities', type: 'liability', reconciles: false },
  { code: '2300', name: 'Sales Tax Payable', type: 'liability', reconciles: false },
  { code: '2400', name: 'Payroll Payable', type: 'liability', reconciles: false },
  { code: '3100', name: "Owner's Equity", type: 'equity', reconciles: false },
  { code: '3200', name: 'Retained Earnings', type: 'equity', reconciles: false },
  { code: '3300', name: 'Drawings', type: 'equity', reconciles: false },
  { code: '4100', name: 'Sales Revenue', type: 'income', reconciles: false },
  { code: '4200', name: 'Sales Returns & Allowances', type: 'income', reconciles: false },
  { code: '4300', name: 'Other Income', type: 'income', reconciles: false },
  { code: '5100', name: 'Cost of Goods Sold', type: 'expense', reconciles: false },
  { code: '5150', name: 'Inventory Adjustment', type: 'expense', reconciles: false },
  { code: '5200', name: 'Salaries & Wages', type: 'expense', reconciles: false },
  { code: '5250', name: 'Bad Debt Expense', type: 'expense', reconciles: false },
  { code: '5300', name: 'Rent & Utilities', type: 'expense', reconciles: false },
  { code: '5400', name: 'General & Administrative', type: 'expense', reconciles: false },
  { code: '5500', name: 'Depreciation Expense', type: 'expense', reconciles: false },
];

const journals = [
  { code: 'GNRL', name: 'General Journal', type: 'general' },
  { code: 'SALE', name: 'Sales Journal', type: 'sale' },
  { code: 'PURC', name: 'Purchases Journal', type: 'purchase' },
  { code: 'CASH', name: 'Cash Receipts Journal', type: 'cash' },
  { code: 'BANK', name: 'Bank Journal', type: 'bank' },
];

export async function seedAccounting(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    for (const acct of glAccounts) {
      await queryRunner.query(
        `INSERT INTO gl_accounts (organization_id, account_code, account_name, account_type, allows_reconciliation, is_active)
         VALUES ($1, $2, $3, $4, $5, true)
         ON CONFLICT (organization_id, account_code) DO NOTHING`,
        [DEFAULT_ORG_ID, acct.code, acct.name, acct.type, acct.reconciles],
      );
      console.log(`  GL Account: ${acct.code} - ${acct.name}`);
    }

    for (const journal of journals) {
      await queryRunner.query(
        `INSERT INTO journals (organization_id, code, name, journal_type, is_active)
         VALUES ($1, $2, $3, $4, true)
         ON CONFLICT (organization_id, code) DO NOTHING`,
        [DEFAULT_ORG_ID, journal.code, journal.name, journal.type],
      );
      console.log(`  Journal: ${journal.code} - ${journal.name}`);
    }

    await queryRunner.commitTransaction();
    console.log('Accounting seed data inserted successfully');
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}

async function seed() {
  const ds = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'rxsoft',
  });

  await ds.initialize();
  console.log('Connected to database');
  await seedAccounting(ds);
  await ds.destroy();
}

seed();
