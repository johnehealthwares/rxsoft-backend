import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
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
  TransferStockPayload,
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
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository: Repository<ItemOrmEntity>,
    @InjectRepository(StockLocationOrmEntity)
    private readonly stockLocationRepository: Repository<StockLocationOrmEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async listStockBalances(query: StockBalanceQuery): Promise<{ items: StockBalance[]; total: number }> {
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
      items: items.map(InventoryMapper.toDomainStockBalance.bind(InventoryMapper)),
      total,
    };
  }

  async findStockBalanceById(id: string, organizationId: string): Promise<StockBalance | null> {
    const item = await this.stockBalanceRepository.findOne({
      where: { id, organizationId },
      relations: {
        item: true,
        location: true,
        lot: true,
      },
    });
    return item ? InventoryMapper.toDomainStockBalance(item) : null;
  }

  async listStockMovements(query: StockMovementQuery): Promise<{ items: StockMovement[]; total: number }> {
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
      qb.andWhere(
        '(stock_movement.from_location_id = :locationId OR stock_movement.to_location_id = :locationId)',
        { locationId: query.locationId },
      );
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
          ? { id: movement.item.id, code: null, name: movement.item.name }
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

  async applyStockAdjustment(adjustment: StockAdjustment, organizationId: string): Promise<StockBalance> {
    return this.dataSource.transaction(async (manager) => {
      const stockBalanceRepo = manager.getRepository(StockBalanceOrmEntity);
      const stockAdjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);
      const stockMovementRepo = manager.getRepository(StockMovementOrmEntity);

      const stockBalance = await stockBalanceRepo.findOne({
        where: { id: adjustment.stockBalanceId, organizationId },
        relations: {
          item: true,
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

      return InventoryMapper.toDomainStockBalance(stockBalance);
    });
  }

  async adjustStockByReference(payload: AdjustStockByReferencePayload): Promise<StockBalance> {
    return this.dataSource.transaction(async (manager) => {
      const stockBalanceRepo = manager.getRepository(StockBalanceOrmEntity);
      const stockAdjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);
      const stockMovementRepo = manager.getRepository(StockMovementOrmEntity);
      const itemRepo = manager.getRepository(ItemOrmEntity);
      const stockLocationRepo = manager.getRepository(StockLocationOrmEntity);

      const item = await itemRepo.findOne({
        where: { id: payload.itemId },
      });
      if (!item) throw new NotFoundException('Item not found');

      const location = await stockLocationRepo.findOne({
        where: { id: payload.locationId, organizationId: payload.organizationId },
      });
      if (!location) throw new NotFoundException('Stock location not found');

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
      return InventoryMapper.toDomainStockBalance(reloaded);
    });
  }

  async transferStock(payload: TransferStockPayload): Promise<{ fromBalance: StockBalance; toBalance: StockBalance }> {
    return this.dataSource.transaction(async (manager) => {
      const stockBalanceRepo = manager.getRepository(StockBalanceOrmEntity);
      const stockAdjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);
      const stockMovementRepo = manager.getRepository(StockMovementOrmEntity);
      const stockLocationRepo = manager.getRepository(StockLocationOrmEntity);
      const itemRepo = manager.getRepository(ItemOrmEntity);

      const [fromLocation, toLocation, item] = await Promise.all([
        stockLocationRepo.findOne({ where: { id: payload.fromLocationId, organizationId: payload.organizationId } }),
        stockLocationRepo.findOne({ where: { id: payload.toLocationId, organizationId: payload.organizationId } }),
        itemRepo.findOne({ where: { id: payload.itemId, isActive: true } }),
      ]);
      if (!fromLocation) throw new NotFoundException('Source stock location not found');
      if (!toLocation) throw new NotFoundException('Destination stock location not found');
      if (!item) throw new NotFoundException('Item not found');
      if (payload.fromLocationId === payload.toLocationId) {
        throw new BadRequestException('Source and destination locations must be different');
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
        throw new BadRequestException('No stock balance found at source location');
      }
      const available = Number((fromBalance.quantityOnHand - fromBalance.quantityReserved).toFixed(4));
      if (available < payload.quantity) {
        throw new BadRequestException(
          `Insufficient stock at source: ${available} available, ${payload.quantity} needed`,
        );
      }

      let toBalance = await stockBalanceRepo.findOne({
        where: {
          organizationId: payload.organizationId,
          item: { id: payload.itemId },
          location: { id: payload.toLocationId },
          lot: payload.lotId ? { id: payload.lotId } : IsNull(),
        },
        relations: { item: true, location: true, lot: true },
      });

      if (!toBalance) {
        toBalance = stockBalanceRepo.create({
          organizationId: payload.organizationId,
          item,
          location: toLocation,
          lot: payload.lotId ? ({ id: payload.lotId } as any) : null,
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

      for (const [balance, delta] of [[savedFromBalance, -payload.quantity], [savedToBalance, payload.quantity]] as const) {
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
        fromBalance: InventoryMapper.toDomainStockBalance(savedFromBalance),
        toBalance: InventoryMapper.toDomainStockBalance(savedToBalance),
      };
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
