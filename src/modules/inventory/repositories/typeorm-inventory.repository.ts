import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductOrmEntity } from '../../catalog/entities/product.orm-entity';
import { StockLocationOrmEntity } from '../entities/stock-location.orm-entity';
import { StockAdjustment } from '../domains/stock-adjustment.entity';
import { StockBalance } from '../domains/stock-balance.entity';
import { InventoryMapper } from '../mappers/inventory.mapper';
import { StockAdjustmentOrmEntity } from '../entities/stock-adjustment.orm-entity';
import { StockBalanceOrmEntity } from '../entities/stock-balance.orm-entity';
import { StockMovementOrmEntity } from '../entities/stock-movement.orm-entity';
import { StoreStockLocationOrmEntity } from '../entities/store-stock-location.orm-entity';
import {
  CreateStoreStockLocationPayload,
  InventoryRepository,
  AdjustStockByReferencePayload,
  StoreStockLocation,
  StockMovement,
  StockMovementQuery,
  StoreStockLocationQuery,
  StockBalanceQuery,
} from './inventory.repository';

@Injectable()
export class TypeormInventoryRepository implements InventoryRepository {
  constructor(
    @InjectRepository(StockBalanceOrmEntity)
    private readonly stockBalanceRepository: Repository<StockBalanceOrmEntity>,
    @InjectRepository(StockAdjustmentOrmEntity)
    private readonly stockAdjustmentRepository: Repository<StockAdjustmentOrmEntity>,
    @InjectRepository(StoreStockLocationOrmEntity)
    private readonly storeStockLocationRepository: Repository<StoreStockLocationOrmEntity>,
    @InjectRepository(StockMovementOrmEntity)
    private readonly stockMovementRepository: Repository<StockMovementOrmEntity>,
    @InjectRepository(ProductOrmEntity)
    private readonly productRepository: Repository<ProductOrmEntity>,
    @InjectRepository(StockLocationOrmEntity)
    private readonly stockLocationRepository: Repository<StockLocationOrmEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async listStockBalances(query: StockBalanceQuery): Promise<{ items: StockBalance[]; total: number }> {
    const qb = this.stockBalanceRepository
      .createQueryBuilder('stock_balance')
      .leftJoinAndSelect('stock_balance.product', 'product')
      .leftJoinAndSelect('stock_balance.location', 'location')
      .leftJoinAndSelect('stock_balance.lot', 'lot')
      .where('stock_balance.organization_id = :organizationId', {
        organizationId: query.organizationId,
      })
      .orderBy('stock_balance.updatedAt', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.productId) {
      qb.andWhere('product.id = :productId', {
        productId: query.productId,
      });
    }

    if (query.locationId) {
      qb.andWhere('location.id = :locationId', {
        locationId: query.locationId,
      });
    }

    const [items, total] = await qb.getManyAndCount();

    return {
      items: items.map(InventoryMapper.toDomainStockBalance.bind(InventoryMapper)),
      total,
    };
  }

  async findStockBalanceById(id: string, organizationId: string): Promise<StockBalance | null> {
    const item = await this.stockBalanceRepository.findOne({
      where: { id, organizationId },
      relations: {
        product: true,
        location: true,
        lot: true,
      },
    });
    return item ? InventoryMapper.toDomainStockBalance(item) : null;
  }

  async listStockMovements(query: StockMovementQuery): Promise<{ items: StockMovement[]; total: number }> {
    const qb = this.stockMovementRepository
      .createQueryBuilder('stock_movement')
      .where('stock_movement.organization_id = :organizationId', {
        organizationId: query.organizationId,
      })
      // .orderBy('stock_movement.occurred_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.movementType) {
      qb.andWhere('stock_movement.movement_type = :movementType', { movementType: query.movementType });
    }

    const [items, total] = await qb.getManyAndCount();
    return {
      items: items.map((item) => ({
        id: item.id,
        organizationId: item.organizationId,
        productId: item.productId,
        lotId: item.lotId,
        fromLocationId: item.fromLocationId,
        toLocationId: item.toLocationId,
        movementType: item.movementType,
        quantity: item.quantity,
        unitCost: item.unitCost,
        occurredAt: item.occurredAt,
        createdByUserId: item.createdByUserId,
      })),
      total,
    };
  }

  async applyStockAdjustment(adjustment: StockAdjustment, organizationId: string): Promise<StockBalance> {
    return this.dataSource.transaction(async (manager) => {
      const stockBalanceRepo = manager.getRepository(StockBalanceOrmEntity);
      const stockAdjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);
      const stockMovementRepo = manager.getRepository(StockMovementOrmEntity);

      const stockBalance = await stockBalanceRepo.findOne({
        where: { id: adjustment.stockBalanceId, organizationId },
        relations: {
          product: true,
          location: true,
          lot: true,
        },
      });
      if (!stockBalance) {
        throw new NotFoundException('Stock balance not found');
      }

      const newQuantity = stockBalance.quantityOnHand + adjustment.deltaQuantity;
      if (newQuantity < 0) {
        throw new BadRequestException('Adjustment would make stock negative');
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
        productId: stockBalance.product.id,
        lotId: stockBalance.lot?.id ?? null,
        fromLocationId: adjustment.deltaQuantity < 0 ? stockBalance.location.id : null,
        toLocationId: adjustment.deltaQuantity > 0 ? stockBalance.location.id : null,
        movementType: 'adjustment',
        quantity: Math.abs(adjustment.deltaQuantity),
        unitCost: stockBalance.averageCost ?? null,
        occurredAt: adjustment.performedAt,
        createdByUserId: adjustment.performedByUserId,
      });
      await stockMovementRepo.save(movement);

      return InventoryMapper.toDomainStockBalance(stockBalance);
    });
  }

  async adjustStockByReference(payload: AdjustStockByReferencePayload): Promise<StockBalance> {
    return this.dataSource.transaction(async (manager) => {
      const stockBalanceRepo = manager.getRepository(StockBalanceOrmEntity);
      const stockAdjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);
      const stockMovementRepo = manager.getRepository(StockMovementOrmEntity);
      const productRepo = manager.getRepository(ProductOrmEntity);
      const stockLocationRepo = manager.getRepository(StockLocationOrmEntity);

      const product = await productRepo.findOne({
        where: { id: payload.productId, organizationId: payload.organizationId },
      });
      if (!product) throw new NotFoundException('Product not found');

      const location = await stockLocationRepo.findOne({
        where: { id: payload.locationId, organizationId: payload.organizationId },
      });
      if (!location) throw new NotFoundException('Stock location not found');

      let stockBalance = await stockBalanceRepo.findOne({
        where: {
          organizationId: payload.organizationId,
          product: { id: payload.productId },
          location: { id: payload.locationId },
          lot: payload.lotId ? { id: payload.lotId } : undefined,
        },
        relations: { product: true, location: true, lot: true },
      });

      if (!stockBalance) {
        stockBalance = stockBalanceRepo.create({
          organizationId: payload.organizationId,
          product,
          location,
          lot: payload.lotId ? ({ id: payload.lotId } as any) : null,
          quantityOnHand: 0,
          quantityReserved: 0,
          averageCost: 0,
          reorderMinQty: payload.reorderMinQty ?? null,
          reorderMaxQty: payload.reorderMaxQty ?? null,
        });
      }

      const newQuantity = stockBalance.quantityOnHand + payload.deltaQuantity;
      if (newQuantity < 0) {
        throw new BadRequestException('Adjustment would make stock negative');
      }

      stockBalance.quantityOnHand = newQuantity;
      if (payload.reorderMinQty !== undefined) stockBalance.reorderMinQty = payload.reorderMinQty;
      if (payload.reorderMaxQty !== undefined) stockBalance.reorderMaxQty = payload.reorderMaxQty;
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
        productId: product.id,
        lotId: savedBalance.lot?.id ?? null,
        fromLocationId: payload.deltaQuantity < 0 ? location.id : null,
        toLocationId: payload.deltaQuantity > 0 ? location.id : null,
        movementType: 'adjustment',
        quantity: Math.abs(payload.deltaQuantity),
        unitCost: savedBalance.averageCost ?? null,
        occurredAt: new Date(),
        createdByUserId: payload.performedByUserId,
      });
      await stockMovementRepo.save(movement);

      const reloaded = await stockBalanceRepo.findOneOrFail({
        where: { id: savedBalance.id, organizationId: payload.organizationId },
        relations: { product: true, location: true, lot: true },
      });
      return InventoryMapper.toDomainStockBalance(reloaded);
    });
  }

  async listStoreStockLocations(query: StoreStockLocationQuery): Promise<{ items: StoreStockLocation[]; total: number }> {
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

  async createStoreStockLocation(payload: CreateStoreStockLocationPayload): Promise<StoreStockLocation> {
    const entity = this.storeStockLocationRepository.create({
      organizationId: payload.organizationId,
      storeId: payload.storeId,
      purpose: payload.purpose,
      isActive: payload.isActive,
      stockLocation: { id: payload.stockLocationId } as any,
    });

    const saved = await this.storeStockLocationRepository.save(entity);
    return this.toStoreStockLocation(saved);
  }

  async setStoreStockLocationActivation(
    id: string,
    organizationId: string,
    isActive: boolean,
  ): Promise<StoreStockLocation> {
    const item = await this.storeStockLocationRepository.findOne({
      where: { id, organizationId },
      relations: { stockLocation: true },
    });
    if (!item) {
      throw new NotFoundException('Store stock location not found');
    }

    item.isActive = isActive;
    const saved = await this.storeStockLocationRepository.save(item);
    return this.toStoreStockLocation(saved);
  }

  private toStoreStockLocation(entity: StoreStockLocationOrmEntity): StoreStockLocation {
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
}
