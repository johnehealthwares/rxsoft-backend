import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import request from 'supertest';
import { Repository } from 'typeorm';
import { ItemCategoryOrmEntity } from '../../modules/catalog/entities/item-category.orm-entity';
import { ItemOrmEntity } from '../../modules/catalog/entities/item.orm-entity';
import { PartyOrmEntity } from '../../modules/customers/entities/party.orm-entity';
import { PermissionOrmEntity } from '../../modules/identity/entities/permission.orm-entity';
import { RoleOrmEntity } from '../../modules/identity/entities/role.orm-entity';
import { UserOrmEntity } from '../../modules/identity/entities/user.orm-entity';
import {
  StockAdjustmentOrmEntity,
  StockBalanceOrmEntity,
  StockLocationOrmEntity,
  StockLotOrmEntity,
  StockMovementOrmEntity,
  StoreStockLocationOrmEntity,
  WarehouseOrmEntity,
} from '../../modules/inventory/entities';
import { PriceListItemOrmEntity, PriceListOrmEntity } from '../../modules/pricing/entities';
import { GoodsReceiptLineOrmEntity, GoodsReceiptOrmEntity, PurchaseOrderLineOrmEntity, PurchaseOrderOrmEntity } from '../../modules/purchases/entities';
import {
  AccountReceivableOrmEntity,
  PaymentMethodOrmEntity,
  SaleLineOrmEntity,
  SaleOrmEntity,
  UomCategoryOrmEntity,
  UomOrmEntity,
} from '../../modules/sales/entities';

const hasDbTestDeps = (() => {
  try {
    require.resolve('@nestjs/typeorm');
    require.resolve('sql.js');
    return true;
  } catch {
    return false;
  }
})();

const hasLoopbackSocketPermission = (() => {
  try {
    execFileSync(
      process.execPath,
      [
        '-e',
        `
const net = require('node:net');
const server = net.createServer();
server.once('error', () => process.exit(1));
server.listen(0, '127.0.0.1', () => server.close(() => process.exit(0)));
setTimeout(() => process.exit(1), 1500);
`,
      ],
      { stdio: 'ignore' },
    );
    return true;
  } catch {
    return false;
  }
})();

export const describeIfDbReady = hasDbTestDeps && hasLoopbackSocketPermission ? describe : describe.skip;

type SeededIds = {
  organizationId: string;
  adminUserId: string;
  categoryId: string;
  baseUomId: string;
  seedItemId: string;
  locationId: string;
  stockBalanceId: string;
  priceListId: string;
  paymentMethodId: string;
  customerId: string;
  warehouseId: string;
  supplierId: string;
};

type Repositories = {
  itemRepository: Repository<ItemOrmEntity>;
  priceListItemRepository: Repository<PriceListItemOrmEntity>;
  stockBalanceRepository: Repository<StockBalanceOrmEntity>;
  stockMovementRepository: Repository<StockMovementOrmEntity>;
  saleRepository: Repository<SaleOrmEntity>;
  saleLineRepository: Repository<SaleLineOrmEntity>;
  receivableRepository: Repository<AccountReceivableOrmEntity>;
  purchaseOrderRepository: Repository<PurchaseOrderOrmEntity>;
  goodsReceiptRepository: Repository<GoodsReceiptOrmEntity>;
  goodsReceiptLineRepository: Repository<GoodsReceiptLineOrmEntity>;
  stockAdjustmentRepository: Repository<StockAdjustmentOrmEntity>;
  warehouseRepository: Repository<WarehouseOrmEntity>;
};

export type IntegrationTestContext = {
  app: INestApplication;
  moduleFixture: TestingModule;
  ids: SeededIds;
  repositories: Repositories;
  httpApp: () => unknown;
  loginAsAdmin: () => Promise<{ accessToken: string; refreshToken: string }>;
};

async function seedBaseData(moduleFixture: TestingModule): Promise<{ ids: SeededIds; repositories: Repositories }> {
  const roleRepo = moduleFixture.get<Repository<RoleOrmEntity>>(getRepositoryToken(RoleOrmEntity));
  const userRepo = moduleFixture.get<Repository<UserOrmEntity>>(getRepositoryToken(UserOrmEntity));
  const permissionRepo = moduleFixture.get<Repository<PermissionOrmEntity>>(getRepositoryToken(PermissionOrmEntity));
  const categoryRepo = moduleFixture.get<Repository<ItemCategoryOrmEntity>>(getRepositoryToken(ItemCategoryOrmEntity));
  const itemRepo = moduleFixture.get<Repository<ItemOrmEntity>>(getRepositoryToken(ItemOrmEntity));
  const stockLocationRepo = moduleFixture.get<Repository<StockLocationOrmEntity>>(getRepositoryToken(StockLocationOrmEntity));
  const stockLotRepo = moduleFixture.get<Repository<StockLotOrmEntity>>(getRepositoryToken(StockLotOrmEntity));
  const stockBalanceRepo = moduleFixture.get<Repository<StockBalanceOrmEntity>>(getRepositoryToken(StockBalanceOrmEntity));
  const stockMovementRepo = moduleFixture.get<Repository<StockMovementOrmEntity>>(getRepositoryToken(StockMovementOrmEntity));
  const uomRepo = moduleFixture.get<Repository<UomOrmEntity>>(getRepositoryToken(UomOrmEntity));
  const uomCategoryRepo = moduleFixture.get<Repository<UomCategoryOrmEntity>>(getRepositoryToken(UomCategoryOrmEntity));
  const priceListRepo = moduleFixture.get<Repository<PriceListOrmEntity>>(getRepositoryToken(PriceListOrmEntity));
  const priceListItemRepo = moduleFixture.get<Repository<PriceListItemOrmEntity>>(getRepositoryToken(PriceListItemOrmEntity));
  const paymentMethodRepo = moduleFixture.get<Repository<PaymentMethodOrmEntity>>(getRepositoryToken(PaymentMethodOrmEntity));
  const partyRepo = moduleFixture.get<Repository<PartyOrmEntity>>(getRepositoryToken(PartyOrmEntity));
  const warehouseRepo = moduleFixture.get<Repository<WarehouseOrmEntity>>(getRepositoryToken(WarehouseOrmEntity));
  const saleRepo = moduleFixture.get<Repository<SaleOrmEntity>>(getRepositoryToken(SaleOrmEntity));
  const saleLineRepo = moduleFixture.get<Repository<SaleLineOrmEntity>>(getRepositoryToken(SaleLineOrmEntity));
  const receivableRepo = moduleFixture.get<Repository<AccountReceivableOrmEntity>>(
    getRepositoryToken(AccountReceivableOrmEntity),
  );
  const purchaseOrderRepo = moduleFixture.get<Repository<PurchaseOrderOrmEntity>>(getRepositoryToken(PurchaseOrderOrmEntity));
  const goodsReceiptRepo = moduleFixture.get<Repository<GoodsReceiptOrmEntity>>(getRepositoryToken(GoodsReceiptOrmEntity));
  const goodsReceiptLineRepo = moduleFixture.get<Repository<GoodsReceiptLineOrmEntity>>(getRepositoryToken(GoodsReceiptLineOrmEntity));
  const stockAdjustmentRepo = moduleFixture.get<Repository<StockAdjustmentOrmEntity>>(getRepositoryToken(StockAdjustmentOrmEntity));
  const storeStockLocationRepo = moduleFixture.get<Repository<StoreStockLocationOrmEntity>>(getRepositoryToken(StoreStockLocationOrmEntity));

  const organizationId = 'org1';

  const permissions = await permissionRepo.save([
    permissionRepo.create({
      code: 'users:manage',
      resource: 'users',
      action: 'manage',
      description: 'Manage users',
    }),
    permissionRepo.create({
      code: 'sales:manage',
      resource: 'sales',
      action: 'manage',
      description: 'Manage sales',
    }),
  ]);

  const [superAdminRole, adminRole, cashierRole] = await roleRepo.save([
    roleRepo.create({
      organizationId,
      code: 'super_admin',
      name: 'Super Admin',
      description: 'System role',
      permissions,
    }),
    roleRepo.create({
      organizationId,
      code: 'admin',
      name: 'Admin',
      description: 'Admin role',
      permissions,
    }),
    roleRepo.create({
      organizationId,
      code: 'cashier',
      name: 'Cashier',
      description: 'Cashier role',
      permissions: [],
    }),
  ]);

  const adminUser = await userRepo.save(
    userRepo.create({
      organizationId,
      username: 'admin',
      passwordHash: createHash('sha256').update('test123').digest('hex'),
      isActive: true,
      roles: [superAdminRole],
    }),
  );

  const uomCategory = await uomCategoryRepo.save(
    uomCategoryRepo.create({
      organizationId,
      name: 'Units',
    }),
  );

  const baseUom = await uomRepo.save(
    uomRepo.create({
      organizationId,
      code: 'UNIT',
      name: 'Unit',
      uomType: 'reference',
      categoryId: uomCategory.id,
      factor: 1,
      rounding: 1,
      isActive: true,
    }),
  );

  const category = await categoryRepo.save(
    categoryRepo.create({
      organizationId,
      code: 'ANALGESICS',
      name: 'Analgesics',
    }),
  );

  const seedItem = await itemRepo.save({
    id: undefined as unknown as string,
    organizationId,
    code: 'PCM-SEED-001',
    name: 'Paracetamol 500mg Tablet (Seed)',
    category,
    genericProductCode: null,
    baseUomId: baseUom.id,
    baseUom,
    purchaseUomId: null,
    purchaseUom: null,
    saleUomId: baseUom.id,
    saleUom: baseUom,
    barcode: '9999999999999',
    isActive: true,
    trackLot: true,
    trackExpiry: true,
    shelfLifeDays: null,
  });

  const location = await stockLocationRepo.save(
    stockLocationRepo.create({
      organizationId,
      code: 'MAIN',
      name: 'Main Store',
      locationType: 'internal',
      isActive: true,
    }),
  );

  const lot = await stockLotRepo.save(
    stockLotRepo.create({
      organizationId,
      code: 'LOT-PCM-001',
    }),
  );

  const stockBalance = await stockBalanceRepo.save({
    id: undefined as unknown as string,
    organizationId,
    item: seedItem,
    location,
    lot,
    quantityOnHand: 20,
    quantityReserved: 2,
    averageCost: 1.25,
    reorderMinQty: null,
    reorderMaxQty: null,
  });

  const priceList = await priceListRepo.save(
    priceListRepo.create({
      organizationId,
      code: 'RETAIL',
      name: 'Retail Price List',
      isDefault: true,
      isActive: true,
    }),
  );

  const paymentMethod = await paymentMethodRepo.save(
    paymentMethodRepo.create({
      organizationId,
      code: 'CASH',
      name: 'Cash',
      methodType: 'cash',
      isActive: true,
    }),
  );

  const customer = await partyRepo.save(
    partyRepo.create({
      organizationId,
      partyType: 'customer',
      code: 'CUST001',
      name: 'Jane Customer',
      phone: '08000000000',
      email: 'jane@example.com',
      addressLine1: '12 Example Street',
      isActive: true,
    }),
  );

  const supplier = await partyRepo.save(
    partyRepo.create({
      organizationId,
      partyType: 'supplier',
      code: null,
      name: 'Test Supplier',
      phone: '08000000001',
      email: 'supplier@example.com',
      addressLine1: '99 Supplier Street',
      isActive: true,
    }),
  );

  const warehouse = await warehouseRepo.save(
    warehouseRepo.create({
      organizationId,
      storeId: null,
      code: 'WH01',
      name: 'Test Warehouse',
      isActive: true,
    }),
  );

  // Link existing location to warehouse
  await stockLocationRepo.update(location.id, { warehouseId: warehouse.id });

  // Seed sale_return store stock location for refunds
  await storeStockLocationRepo.save(
    storeStockLocationRepo.create({
      organizationId,
      storeId: 'default',
      purpose: 'sale_return',
      stockLocation: location,
    }),
  );

  return {
    ids: {
      organizationId,
      adminUserId: adminUser.id,
      categoryId: category.id,
      baseUomId: baseUom.id,
      seedItemId: seedItem.id,
      locationId: location.id,
      stockBalanceId: stockBalance.id,
      priceListId: priceList.id,
      paymentMethodId: paymentMethod.id,
      customerId: customer.id,
      warehouseId: warehouse.id,
      supplierId: supplier.id,
    },
    repositories: {
      itemRepository: itemRepo,
      priceListItemRepository: priceListItemRepo,
      stockBalanceRepository: stockBalanceRepo,
      stockMovementRepository: stockMovementRepo,
      saleRepository: saleRepo,
      saleLineRepository: saleLineRepo,
      receivableRepository: receivableRepo,
      purchaseOrderRepository: purchaseOrderRepo,
      goodsReceiptRepository: goodsReceiptRepo,
      goodsReceiptLineRepository: goodsReceiptLineRepo,
      stockAdjustmentRepository: stockAdjustmentRepo,
      warehouseRepository: warehouseRepo,
    },
  };
}

export async function createIntegrationTestContext(): Promise<IntegrationTestContext> {
  process.env.USE_IN_MEMORY_REPOS = 'false';
  process.env.DB_TYPE = 'sqljs';
  process.env.DB_SYNCHRONIZE = 'true';
  process.env.DB_DROP_SCHEMA = 'true';
  process.env.JWT_ACCESS_SECRET = 'test-access-secret';
  process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
  process.env.JWT_SECRET = 'test-access-secret';

  const { AppModule } = require('../../app.module');

  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.init();

  const seeded = await seedBaseData(moduleFixture);

  return {
    app,
    moduleFixture,
    ids: seeded.ids,
    repositories: seeded.repositories,
    httpApp: () => app.getHttpAdapter().getInstance(),
    loginAsAdmin: async () => {
      const response = await request(app.getHttpAdapter().getInstance()).post('/auth/login').send({
        username: 'admin',
        password: 'test123',
      });

      return {
        accessToken: response.body.accessToken as string,
        refreshToken: response.body.refreshToken as string,
      };
    },
  };
}

export async function destroyIntegrationTestContext(context: IntegrationTestContext): Promise<void> {
  await context.app.close();
}
