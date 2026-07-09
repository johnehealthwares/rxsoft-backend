"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormInventoryRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const stock_location_orm_entity_1 = require("../entities/stock-location.orm-entity");
const inventory_mapper_1 = require("../mappers/inventory.mapper");
const stock_adjustment_orm_entity_1 = require("../entities/stock-adjustment.orm-entity");
const stock_balance_orm_entity_1 = require("../entities/stock-balance.orm-entity");
const stock_movement_orm_entity_1 = require("../entities/stock-movement.orm-entity");
const store_stock_location_orm_entity_1 = require("../entities/store-stock-location.orm-entity");
let TypeormInventoryRepository = class TypeormInventoryRepository {
    stockBalanceRepository;
    stockAdjustmentRepository;
    storeStockLocationRepository;
    stockMovementRepository;
    itemRepository;
    stockLocationRepository;
    dataSource;
    constructor(stockBalanceRepository, stockAdjustmentRepository, storeStockLocationRepository, stockMovementRepository, itemRepository, stockLocationRepository, dataSource) {
        this.stockBalanceRepository = stockBalanceRepository;
        this.stockAdjustmentRepository = stockAdjustmentRepository;
        this.storeStockLocationRepository = storeStockLocationRepository;
        this.stockMovementRepository = stockMovementRepository;
        this.itemRepository = itemRepository;
        this.stockLocationRepository = stockLocationRepository;
        this.dataSource = dataSource;
    }
    async listStockBalances(query) {
        const qb = this.stockBalanceRepository
            .createQueryBuilder('stock_balance')
            .leftJoinAndSelect('stock_balance.item', 'item')
            .leftJoinAndSelect('stock_balance.location', 'location')
            .leftJoinAndSelect('stock_balance.lot', 'lot')
            .where('stock_balance.organization_id = :organizationId', {
            organizationId: query.organizationId,
        })
            .orderBy('stock_balance.updatedAt', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.itemId) {
            qb.andWhere('item.id = :itemId', {
                itemId: query.itemId,
            });
        }
        if (query.locationId) {
            qb.andWhere('location.id = :locationId', {
                locationId: query.locationId,
            });
        }
        const [items, total] = await qb.getManyAndCount();
        return {
            items: items.map(inventory_mapper_1.InventoryMapper.toDomainStockBalance.bind(inventory_mapper_1.InventoryMapper)),
            total,
        };
    }
    async findStockBalanceById(id, organizationId) {
        const item = await this.stockBalanceRepository.findOne({
            where: { id, organizationId },
            relations: {
                item: true,
                location: true,
                lot: true,
            },
        });
        return item ? inventory_mapper_1.InventoryMapper.toDomainStockBalance(item) : null;
    }
    async listStockMovements(query) {
        const qb = this.stockMovementRepository
            .createQueryBuilder('stock_movement')
            .leftJoinAndSelect('stock_movement.item', 'item')
            .leftJoinAndSelect('stock_movement.fromLocation', 'fromLocation')
            .leftJoinAndSelect('stock_movement.toLocation', 'toLocation')
            .where('stock_movement.organization_id = :organizationId', {
            organizationId: query.organizationId,
        })
            .orderBy('stock_movement.occurredAt', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.movementType) {
            qb.andWhere('stock_movement.movement_type = :movementType', { movementType: query.movementType });
        }
        if (query.itemId) {
            qb.andWhere('stock_movement.item_id = :itemId', { itemId: query.itemId });
        }
        if (query.locationId) {
            qb.andWhere('(stock_movement.from_location_id = :locationId OR stock_movement.to_location_id = :locationId)', { locationId: query.locationId });
        }
        if (query.fromDate) {
            qb.andWhere('stock_movement.occurred_at >= :fromDate', { fromDate: query.fromDate });
        }
        if (query.toDate) {
            qb.andWhere('stock_movement.occurred_at <= :toDate', { toDate: query.toDate });
        }
        const [items, total] = await qb.getManyAndCount();
        return {
            items: items.map((movement) => ({
                id: movement.id,
                organizationId: movement.organizationId,
                itemId: movement.itemId,
                item: movement.item
                    ? { id: movement.item.id, code: movement.item.code, name: movement.item.name }
                    : null,
                lotId: movement.lotId,
                fromLocationId: movement.fromLocationId,
                fromLocation: movement.fromLocation
                    ? { id: movement.fromLocation.id, name: movement.fromLocation.name }
                    : null,
                toLocationId: movement.toLocationId,
                toLocation: movement.toLocation
                    ? { id: movement.toLocation.id, name: movement.toLocation.name }
                    : null,
                movementType: movement.movementType,
                quantity: movement.quantity,
                unitCost: movement.unitCost,
                occurredAt: movement.occurredAt,
                createdAt: movement.createdAt,
                createdByUserId: movement.createdByUserId,
            })),
            total,
        };
    }
    async applyStockAdjustment(adjustment, organizationId) {
        return this.dataSource.transaction(async (manager) => {
            const stockBalanceRepo = manager.getRepository(stock_balance_orm_entity_1.StockBalanceOrmEntity);
            const stockAdjustmentRepo = manager.getRepository(stock_adjustment_orm_entity_1.StockAdjustmentOrmEntity);
            const stockMovementRepo = manager.getRepository(stock_movement_orm_entity_1.StockMovementOrmEntity);
            const stockBalance = await stockBalanceRepo.findOne({
                where: { id: adjustment.stockBalanceId, organizationId },
                relations: {
                    item: true,
                    location: true,
                    lot: true,
                },
            });
            if (!stockBalance) {
                throw new common_1.NotFoundException('Stock balance not found');
            }
            const newQuantity = stockBalance.quantityOnHand + adjustment.deltaQuantity;
            if (newQuantity < 0) {
                throw new common_1.BadRequestException('Adjustment would make stock negative');
            }
            stockBalance.quantityOnHand = newQuantity;
            await stockBalanceRepo.save(stockBalance);
            const adjustmentEntity = stockAdjustmentRepo.create({
                id: adjustment.id,
                stockBalance,
                reason: adjustment.reason,
                deltaQuantity: adjustment.deltaQuantity,
                performedByUserId: adjustment.performedByUserId,
                performedAt: adjustment.performedAt,
            });
            await stockAdjustmentRepo.save(adjustmentEntity);
            const movement = stockMovementRepo.create({
                organizationId,
                inventoryDocumentId: adjustmentEntity.id,
                inventoryDocumentLineId: null,
                item: { id: stockBalance.item.id },
                lot: stockBalance.lot?.id ? { id: stockBalance.lot.id } : null,
                fromLocation: adjustment.deltaQuantity < 0 ? { id: stockBalance.location.id } : null,
                toLocation: adjustment.deltaQuantity > 0 ? { id: stockBalance.location.id } : null,
                movementType: 'adjustment',
                quantity: Math.abs(adjustment.deltaQuantity),
                unitCost: stockBalance.averageCost ?? null,
                occurredAt: adjustment.performedAt,
                createdByUserId: adjustment.performedByUserId,
            });
            await stockMovementRepo.save(movement);
            return inventory_mapper_1.InventoryMapper.toDomainStockBalance(stockBalance);
        });
    }
    async adjustStockByReference(payload) {
        return this.dataSource.transaction(async (manager) => {
            const stockBalanceRepo = manager.getRepository(stock_balance_orm_entity_1.StockBalanceOrmEntity);
            const stockAdjustmentRepo = manager.getRepository(stock_adjustment_orm_entity_1.StockAdjustmentOrmEntity);
            const stockMovementRepo = manager.getRepository(stock_movement_orm_entity_1.StockMovementOrmEntity);
            const itemRepo = manager.getRepository(item_orm_entity_1.ItemOrmEntity);
            const stockLocationRepo = manager.getRepository(stock_location_orm_entity_1.StockLocationOrmEntity);
            const item = await itemRepo.findOne({
                where: { id: payload.itemId, organizationId: payload.organizationId },
            });
            if (!item)
                throw new common_1.NotFoundException('Item not found');
            const location = await stockLocationRepo.findOne({
                where: { id: payload.locationId, organizationId: payload.organizationId },
            });
            if (!location)
                throw new common_1.NotFoundException('Stock location not found');
            let stockBalance = await stockBalanceRepo.findOne({
                where: {
                    organizationId: payload.organizationId,
                    item: { id: payload.itemId },
                    location: { id: payload.locationId },
                    lot: payload.lotId ? { id: payload.lotId } : undefined,
                },
                relations: { item: true, location: true, lot: true },
            });
            if (!stockBalance) {
                stockBalance = stockBalanceRepo.create({
                    organizationId: payload.organizationId,
                    item,
                    location,
                    lot: payload.lotId ? { id: payload.lotId } : null,
                    quantityOnHand: 0,
                    quantityReserved: 0,
                    averageCost: 0,
                    reorderMinQty: payload.reorderMinQty ?? null,
                    reorderMaxQty: payload.reorderMaxQty ?? null,
                });
            }
            const newQuantity = stockBalance.quantityOnHand + payload.deltaQuantity;
            if (newQuantity < 0) {
                throw new common_1.BadRequestException('Adjustment would make stock negative');
            }
            stockBalance.quantityOnHand = newQuantity;
            if (payload.reorderMinQty !== undefined)
                stockBalance.reorderMinQty = payload.reorderMinQty;
            if (payload.reorderMaxQty !== undefined)
                stockBalance.reorderMaxQty = payload.reorderMaxQty;
            const savedBalance = await stockBalanceRepo.save(stockBalance);
            const adjustmentEntity = stockAdjustmentRepo.create({
                stockBalance: savedBalance,
                reason: payload.reason,
                deltaQuantity: payload.deltaQuantity,
                performedByUserId: payload.performedByUserId,
                performedAt: new Date(),
            });
            const savedAdjustment = await stockAdjustmentRepo.save(adjustmentEntity);
            const movement = stockMovementRepo.create({
                organizationId: payload.organizationId,
                inventoryDocumentId: savedAdjustment.id,
                inventoryDocumentLineId: null,
                item: { id: item.id },
                lot: savedBalance.lot?.id ? { id: savedBalance.lot.id } : null,
                fromLocation: payload.deltaQuantity < 0 ? { id: location.id } : null,
                toLocation: payload.deltaQuantity > 0 ? { id: location.id } : null,
                uomId: payload.uomId ?? null,
                movementType: 'adjustment',
                quantity: Math.abs(payload.deltaQuantity),
                unitCost: savedBalance.averageCost ?? null,
                occurredAt: new Date(),
                createdByUserId: payload.performedByUserId,
            });
            await stockMovementRepo.save(movement);
            const reloaded = await stockBalanceRepo.findOneOrFail({
                where: { id: savedBalance.id, organizationId: payload.organizationId },
                relations: { item: true, location: true, lot: true },
            });
            return inventory_mapper_1.InventoryMapper.toDomainStockBalance(reloaded);
        });
    }
    async transferStock(payload) {
        return this.dataSource.transaction(async (manager) => {
            const stockBalanceRepo = manager.getRepository(stock_balance_orm_entity_1.StockBalanceOrmEntity);
            const stockAdjustmentRepo = manager.getRepository(stock_adjustment_orm_entity_1.StockAdjustmentOrmEntity);
            const stockMovementRepo = manager.getRepository(stock_movement_orm_entity_1.StockMovementOrmEntity);
            const stockLocationRepo = manager.getRepository(stock_location_orm_entity_1.StockLocationOrmEntity);
            const itemRepo = manager.getRepository(item_orm_entity_1.ItemOrmEntity);
            const [fromLocation, toLocation, item] = await Promise.all([
                stockLocationRepo.findOne({ where: { id: payload.fromLocationId, organizationId: payload.organizationId } }),
                stockLocationRepo.findOne({ where: { id: payload.toLocationId, organizationId: payload.organizationId } }),
                itemRepo.findOne({ where: { id: payload.itemId, organizationId: payload.organizationId, isActive: true } }),
            ]);
            if (!fromLocation)
                throw new common_1.NotFoundException('Source stock location not found');
            if (!toLocation)
                throw new common_1.NotFoundException('Destination stock location not found');
            if (!item)
                throw new common_1.NotFoundException('Item not found');
            if (payload.fromLocationId === payload.toLocationId) {
                throw new common_1.BadRequestException('Source and destination locations must be different');
            }
            let fromBalance = await stockBalanceRepo.findOne({
                where: {
                    organizationId: payload.organizationId,
                    item: { id: payload.itemId },
                    location: { id: payload.fromLocationId },
                    lot: payload.lotId ? { id: payload.lotId } : undefined,
                },
                relations: { item: true, location: true, lot: true },
            });
            if (!fromBalance) {
                throw new common_1.BadRequestException('No stock balance found at source location');
            }
            const available = Number((fromBalance.quantityOnHand - fromBalance.quantityReserved).toFixed(4));
            if (available < payload.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock at source: ${available} available, ${payload.quantity} needed`);
            }
            let toBalance = await stockBalanceRepo.findOne({
                where: {
                    organizationId: payload.organizationId,
                    item: { id: payload.itemId },
                    location: { id: payload.toLocationId },
                    lot: payload.lotId ? { id: payload.lotId } : (0, typeorm_2.IsNull)(),
                },
                relations: { item: true, location: true, lot: true },
            });
            if (!toBalance) {
                toBalance = stockBalanceRepo.create({
                    organizationId: payload.organizationId,
                    item,
                    location: toLocation,
                    lot: payload.lotId ? { id: payload.lotId } : null,
                    quantityOnHand: 0,
                    quantityReserved: 0,
                    averageCost: fromBalance.averageCost,
                });
            }
            fromBalance.quantityOnHand = Number((fromBalance.quantityOnHand - payload.quantity).toFixed(4));
            toBalance.quantityOnHand = Number((toBalance.quantityOnHand + payload.quantity).toFixed(4));
            toBalance.averageCost = fromBalance.averageCost;
            const savedFromBalance = await stockBalanceRepo.save(fromBalance);
            const savedToBalance = await stockBalanceRepo.save(toBalance);
            for (const [balance, delta] of [[savedFromBalance, -payload.quantity], [savedToBalance, payload.quantity]]) {
                const adjustment = stockAdjustmentRepo.create({
                    stockBalance: balance,
                    reason: payload.reason || 'stock_transfer',
                    deltaQuantity: delta,
                    performedByUserId: payload.performedByUserId,
                    performedAt: new Date(),
                });
                const savedAdjustment = await stockAdjustmentRepo.save(adjustment);
                const movement = stockMovementRepo.create({
                    organizationId: payload.organizationId,
                    inventoryDocumentId: savedAdjustment.id,
                    inventoryDocumentLineId: null,
                    item: { id: payload.itemId },
                    lot: payload.lotId ? { id: payload.lotId } : null,
                    fromLocation: delta < 0 ? { id: payload.fromLocationId } : null,
                    toLocation: delta > 0 ? { id: payload.toLocationId } : null,
                    movementType: 'transfer',
                    quantity: payload.quantity,
                    unitCost: balance.averageCost ?? null,
                    occurredAt: new Date(),
                    createdByUserId: payload.performedByUserId,
                });
                await stockMovementRepo.save(movement);
            }
            return {
                fromBalance: inventory_mapper_1.InventoryMapper.toDomainStockBalance(savedFromBalance),
                toBalance: inventory_mapper_1.InventoryMapper.toDomainStockBalance(savedToBalance),
            };
        });
    }
    async listStoreStockLocations(query) {
        const qb = this.storeStockLocationRepository
            .createQueryBuilder('ssl')
            .where('ssl.organization_id = :organizationId', { organizationId: query.organizationId })
            .orderBy('ssl.updated_at', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.storeId) {
            qb.andWhere('ssl.store_id = :storeId', { storeId: query.storeId });
        }
        if (query.purpose) {
            qb.andWhere('ssl.purpose = :purpose', { purpose: query.purpose });
        }
        if (typeof query.isActive === 'boolean') {
            qb.andWhere('ssl.is_active = :isActive', { isActive: query.isActive });
        }
        const [items, total] = await qb.getManyAndCount();
        return {
            items: items.map((item) => this.toStoreStockLocation(item)),
            total,
        };
    }
    async createStoreStockLocation(payload) {
        const entity = this.storeStockLocationRepository.create({
            organizationId: payload.organizationId,
            storeId: payload.storeId,
            purpose: payload.purpose,
            isActive: payload.isActive,
            stockLocation: { id: payload.stockLocationId },
        });
        const saved = await this.storeStockLocationRepository.save(entity);
        return this.toStoreStockLocation(saved);
    }
    async setStoreStockLocationActivation(id, organizationId, isActive) {
        const item = await this.storeStockLocationRepository.findOne({
            where: { id, organizationId },
            relations: { stockLocation: true },
        });
        if (!item) {
            throw new common_1.NotFoundException('Store stock location not found');
        }
        item.isActive = isActive;
        const saved = await this.storeStockLocationRepository.save(item);
        return this.toStoreStockLocation(saved);
    }
    toStoreStockLocation(entity) {
        return {
            id: entity.id,
            organizationId: entity.organizationId,
            storeId: entity.storeId,
            stockLocationId: entity.stockLocation?.id ?? '',
            purpose: entity.purpose,
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
};
exports.TypeormInventoryRepository = TypeormInventoryRepository;
exports.TypeormInventoryRepository = TypeormInventoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_balance_orm_entity_1.StockBalanceOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(stock_adjustment_orm_entity_1.StockAdjustmentOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(store_stock_location_orm_entity_1.StoreStockLocationOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(stock_movement_orm_entity_1.StockMovementOrmEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(item_orm_entity_1.ItemOrmEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(stock_location_orm_entity_1.StockLocationOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TypeormInventoryRepository);
//# sourceMappingURL=typeorm-inventory.repository.js.map