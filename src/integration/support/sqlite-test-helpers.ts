import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import request from 'supertest';
import { Repository } from 'typeorm';
import { ProductCategoryOrmEntity } from '../../modules/catalog/entities/product-category.orm-entity';
import { ProductOrmEntity } from '../../modules/catalog/entities/product.orm-entity';
import { GenericProductOrmEntity } from '../../modules/catalog/entities/generic-product.orm-entity';
import { PharmaceuticsOrmEntity } from '../../modules/catalog/entities/pharmaceutics.orm-entity';
import { PartyOrmEntity } from '../../modules/customers/entities/party.orm-entity';
import { PermissionOrmEntity } from '../../modules/identity/entities/permission.orm-entity';
import { RoleOrmEntity } from '../../modules/identity/entities/role.orm-entity';
import { UserOrmEntity } from '../../modules/identity/entities/user.orm-entity';
import {
  StockBalanceOrmEntity,
  StockLocationOrmEntity,
  StockLotOrmEntity,
  StockMovementOrmEntity,
} from '../../modules/inventory/entities';
import { PriceListItemOrmEntity, PriceListOrmEntity } from '../../modules/pricing/entities';
import {
  AccountReceivableOrmEntity,
  PaymentMethodOrmEntity,
  SaleLineOrmEntity,
  SaleOrmEntity,
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
  genericProductId: string;
  baseUomId: string;
  seedProductId: string;
  locationId: string;
  stockBalanceId: string;
  priceListId: string;
  paymentMethodId: string;
  customerId: string;
};

type Repositories = {
  productRepository: Repository<ProductOrmEntity>;
  priceListItemRepository: Repository<PriceListItemOrmEntity>;
  stockBalanceRepository: Repository<StockBalanceOrmEntity>;
  stockMovementRepository: Repository<StockMovementOrmEntity>;
  saleRepository: Repository<SaleOrmEntity>;
  saleLineRepository: Repository<SaleLineOrmEntity>;
  receivableRepository: Repository<AccountReceivableOrmEntity>;
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
  const categoryRepo = moduleFixture.get<Repository<ProductCategoryOrmEntity>>(getRepositoryToken(ProductCategoryOrmEntity));
  const pharmRepo = moduleFixture.get<Repository<PharmaceuticsOrmEntity>>(getRepositoryToken(PharmaceuticsOrmEntity));
  const genericRepo = moduleFixture.get<Repository<GenericProductOrmEntity>>(getRepositoryToken(GenericProductOrmEntity));
  const productRepo = moduleFixture.get<Repository<ProductOrmEntity>>(getRepositoryToken(ProductOrmEntity));
  const stockLocationRepo = moduleFixture.get<Repository<StockLocationOrmEntity>>(getRepositoryToken(StockLocationOrmEntity));
  const stockLotRepo = moduleFixture.get<Repository<StockLotOrmEntity>>(getRepositoryToken(StockLotOrmEntity));
  const stockBalanceRepo = moduleFixture.get<Repository<StockBalanceOrmEntity>>(getRepositoryToken(StockBalanceOrmEntity));
  const stockMovementRepo = moduleFixture.get<Repository<StockMovementOrmEntity>>(getRepositoryToken(StockMovementOrmEntity));
  const uomRepo = moduleFixture.get<Repository<UomOrmEntity>>(getRepositoryToken(UomOrmEntity));
  const priceListRepo = moduleFixture.get<Repository<PriceListOrmEntity>>(getRepositoryToken(PriceListOrmEntity));
  const priceListItemRepo = moduleFixture.get<Repository<PriceListItemOrmEntity>>(getRepositoryToken(PriceListItemOrmEntity));
  const paymentMethodRepo = moduleFixture.get<Repository<PaymentMethodOrmEntity>>(getRepositoryToken(PaymentMethodOrmEntity));
  const partyRepo = moduleFixture.get<Repository<PartyOrmEntity>>(getRepositoryToken(PartyOrmEntity));
  const saleRepo = moduleFixture.get<Repository<SaleOrmEntity>>(getRepositoryToken(SaleOrmEntity));
  const saleLineRepo = moduleFixture.get<Repository<SaleLineOrmEntity>>(getRepositoryToken(SaleLineOrmEntity));
  const receivableRepo = moduleFixture.get<Repository<AccountReceivableOrmEntity>>(
    getRepositoryToken(AccountReceivableOrmEntity),
  );

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
      passwordHash: createHash('sha256').update('test').digest('hex'),
      isActive: true,
      roles: [superAdminRole],
    }),
  );

  const baseUom = await uomRepo.save(
    uomRepo.create({
      organizationId,
      code: 'UNIT',
      name: 'Unit',
      uomType: 'reference',
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

  const pharmaceutics = await pharmRepo.save(
    pharmRepo.create({
      organizationId,
      code: 'PHARM001',
      clinicalName: 'Paracetamol',
      drugClass: 'Analgesic',
      pharmaceutics: 'Analgesic activity',
      indications: 'Pain and fever',
      contraindications: 'Severe liver disease',
      mechanism: 'CNS action',
    }),
  );

  const generic = await genericRepo.save(
    genericRepo.create({
      organizationId,
      code: 'GEN001',
      name: 'Paracetamol',
      generalUse: 'Pain relief',
      adultDosage: '500mg',
      pediatricDosage: 'Weight based',
      isPrescriptionRequired: false,
      isControlledSubstance: false,
      pharmaceutics,
    }),
  );

  const seedProduct = await productRepo.save(
    productRepo.create({
      organizationId,
      code: 'PCM-SEED-001',
      name: 'Paracetamol 500mg Tablet (Seed)',
      category,
      genericProduct: generic,
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
    }),
  );

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

  const stockBalance = await stockBalanceRepo.save(
    stockBalanceRepo.create({
      organizationId,
      product: seedProduct,
      location,
      lot,
      quantityOnHand: 20,
      quantityReserved: 2,
      averageCost: 1.25,
      reorderMinQty: null,
      reorderMaxQty: null,
    }),
  );

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

  return {
    ids: {
      organizationId,
      adminUserId: adminUser.id,
      categoryId: category.id,
      genericProductId: generic.id,
      baseUomId: baseUom.id,
      seedProductId: seedProduct.id,
      locationId: location.id,
      stockBalanceId: stockBalance.id,
      priceListId: priceList.id,
      paymentMethodId: paymentMethod.id,
      customerId: customer.id,
    },
    repositories: {
      productRepository: productRepo,
      priceListItemRepository: priceListItemRepo,
      stockBalanceRepository: stockBalanceRepo,
      stockMovementRepository: stockMovementRepo,
      saleRepository: saleRepo,
      saleLineRepository: saleLineRepo,
      receivableRepository: receivableRepo,
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
        password: 'test',
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
