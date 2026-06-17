"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.describeIfDbReady = void 0;
exports.createIntegrationTestContext = createIntegrationTestContext;
exports.destroyIntegrationTestContext = destroyIntegrationTestContext;
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const node_crypto_1 = require("node:crypto");
const node_child_process_1 = require("node:child_process");
const supertest_1 = __importDefault(require("supertest"));
const item_category_orm_entity_1 = require("../../modules/catalog/entities/item-category.orm-entity");
const item_orm_entity_1 = require("../../modules/catalog/entities/item.orm-entity");
const party_orm_entity_1 = require("../../modules/customers/entities/party.orm-entity");
const permission_orm_entity_1 = require("../../modules/identity/entities/permission.orm-entity");
const role_orm_entity_1 = require("../../modules/identity/entities/role.orm-entity");
const user_orm_entity_1 = require("../../modules/identity/entities/user.orm-entity");
const entities_1 = require("../../modules/inventory/entities");
const entities_2 = require("../../modules/pricing/entities");
const entities_3 = require("../../modules/purchases/entities");
const entities_4 = require("../../modules/sales/entities");
const hasDbTestDeps = (() => {
    try {
        require.resolve('@nestjs/typeorm');
        require.resolve('sql.js');
        return true;
    }
    catch {
        return false;
    }
})();
const hasLoopbackSocketPermission = (() => {
    try {
        (0, node_child_process_1.execFileSync)(process.execPath, [
            '-e',
            `
const net = require('node:net');
const server = net.createServer();
server.once('error', () => process.exit(1));
server.listen(0, '127.0.0.1', () => server.close(() => process.exit(0)));
setTimeout(() => process.exit(1), 1500);
`,
        ], { stdio: 'ignore' });
        return true;
    }
    catch {
        return false;
    }
})();
exports.describeIfDbReady = hasDbTestDeps && hasLoopbackSocketPermission ? describe : describe.skip;
async function seedBaseData(moduleFixture) {
    const roleRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(role_orm_entity_1.RoleOrmEntity));
    const userRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(user_orm_entity_1.UserOrmEntity));
    const permissionRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(permission_orm_entity_1.PermissionOrmEntity));
    const categoryRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(item_category_orm_entity_1.ItemCategoryOrmEntity));
    const itemRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(item_orm_entity_1.ItemOrmEntity));
    const stockLocationRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_1.StockLocationOrmEntity));
    const stockLotRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_1.StockLotOrmEntity));
    const stockBalanceRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_1.StockBalanceOrmEntity));
    const stockMovementRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_1.StockMovementOrmEntity));
    const uomRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_4.UomOrmEntity));
    const uomCategoryRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_4.UomCategoryOrmEntity));
    const priceListRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_2.PriceListOrmEntity));
    const priceListItemRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_2.PriceListItemOrmEntity));
    const paymentMethodRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_4.PaymentMethodOrmEntity));
    const partyRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(party_orm_entity_1.PartyOrmEntity));
    const warehouseRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_1.WarehouseOrmEntity));
    const saleRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_4.SaleOrmEntity));
    const saleLineRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_4.SaleLineOrmEntity));
    const receivableRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_4.AccountReceivableOrmEntity));
    const purchaseOrderRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_3.PurchaseOrderOrmEntity));
    const goodsReceiptRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_3.GoodsReceiptOrmEntity));
    const goodsReceiptLineRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_3.GoodsReceiptLineOrmEntity));
    const stockAdjustmentRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_1.StockAdjustmentOrmEntity));
    const storeStockLocationRepo = moduleFixture.get((0, typeorm_1.getRepositoryToken)(entities_1.StoreStockLocationOrmEntity));
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
    const adminUser = await userRepo.save(userRepo.create({
        organizationId,
        username: 'admin',
        passwordHash: (0, node_crypto_1.createHash)('sha256').update('test123').digest('hex'),
        isActive: true,
        roles: [superAdminRole],
    }));
    const uomCategory = await uomCategoryRepo.save(uomCategoryRepo.create({
        organizationId,
        name: 'Units',
    }));
    const baseUom = await uomRepo.save(uomRepo.create({
        organizationId,
        code: 'UNIT',
        name: 'Unit',
        uomType: 'reference',
        categoryId: uomCategory.id,
        factor: 1,
        rounding: 1,
        isActive: true,
    }));
    const category = await categoryRepo.save(categoryRepo.create({
        organizationId,
        code: 'ANALGESICS',
        name: 'Analgesics',
    }));
    const seedItem = await itemRepo.save({
        id: undefined,
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
    const location = await stockLocationRepo.save(stockLocationRepo.create({
        organizationId,
        code: 'MAIN',
        name: 'Main Store',
        locationType: 'internal',
        isActive: true,
    }));
    const lot = await stockLotRepo.save(stockLotRepo.create({
        organizationId,
        code: 'LOT-PCM-001',
    }));
    const stockBalance = await stockBalanceRepo.save({
        id: undefined,
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
    const priceList = await priceListRepo.save(priceListRepo.create({
        organizationId,
        code: 'RETAIL',
        name: 'Retail Price List',
        isDefault: true,
        isActive: true,
    }));
    const paymentMethod = await paymentMethodRepo.save(paymentMethodRepo.create({
        organizationId,
        code: 'CASH',
        name: 'Cash',
        methodType: 'cash',
        isActive: true,
    }));
    const customer = await partyRepo.save(partyRepo.create({
        organizationId,
        partyType: 'customer',
        code: 'CUST001',
        name: 'Jane Customer',
        phone: '08000000000',
        email: 'jane@example.com',
        addressLine1: '12 Example Street',
        isActive: true,
    }));
    const supplier = await partyRepo.save(partyRepo.create({
        organizationId,
        partyType: 'supplier',
        code: null,
        name: 'Test Supplier',
        phone: '08000000001',
        email: 'supplier@example.com',
        addressLine1: '99 Supplier Street',
        isActive: true,
    }));
    const warehouse = await warehouseRepo.save(warehouseRepo.create({
        organizationId,
        storeId: null,
        code: 'WH01',
        name: 'Test Warehouse',
        isActive: true,
    }));
    await stockLocationRepo.update(location.id, { warehouseId: warehouse.id });
    await storeStockLocationRepo.save(storeStockLocationRepo.create({
        organizationId,
        storeId: 'default',
        purpose: 'sale_return',
        stockLocation: location,
    }));
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
async function createIntegrationTestContext() {
    process.env.USE_IN_MEMORY_REPOS = 'false';
    process.env.DB_TYPE = 'sqljs';
    process.env.DB_SYNCHRONIZE = 'true';
    process.env.DB_DROP_SCHEMA = 'true';
    process.env.JWT_ACCESS_SECRET = 'test-access-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
    process.env.JWT_SECRET = 'test-access-secret';
    const { AppModule } = require('../../app.module');
    const moduleFixture = await testing_1.Test.createTestingModule({
        imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    await app.init();
    const seeded = await seedBaseData(moduleFixture);
    return {
        app,
        moduleFixture,
        ids: seeded.ids,
        repositories: seeded.repositories,
        httpApp: () => app.getHttpAdapter().getInstance(),
        loginAsAdmin: async () => {
            const response = await (0, supertest_1.default)(app.getHttpAdapter().getInstance()).post('/auth/login').send({
                username: 'admin',
                password: 'test123',
            });
            return {
                accessToken: response.body.accessToken,
                refreshToken: response.body.refreshToken,
            };
        },
    };
}
async function destroyIntegrationTestContext(context) {
    await context.app.close();
}
//# sourceMappingURL=sqlite-test-helpers.js.map