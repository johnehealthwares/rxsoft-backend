import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import type { StockLocationType } from '../../../shared/domain';
import { toStockLocationType } from '../../../shared/domain/mappers';
import { WarehouseOrmEntity } from '../entities/warehouse.orm-entity';
import { StockLocationOrmEntity } from '../entities/stock-location.orm-entity';
import { CreateStockLocationDto, ListStockLocationsDto, UpdateStockLocationDto } from '../dto/stock-locations.dto';

@Injectable()
export class StockLocationsService {
  constructor(
    @InjectRepository(StockLocationOrmEntity)
    private readonly stockLocationRepository: Repository<StockLocationOrmEntity>,
    @InjectRepository(WarehouseOrmEntity)
    private readonly warehouseRepository: Repository<WarehouseOrmEntity>,
  ) {}

  async list(
    query: ListStockLocationsDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<{ data: StockLocationType[]; total: number }> {
    const qb = this.stockLocationRepository
      .createQueryBuilder('stock_location')
      .leftJoinAndSelect('stock_location.warehouse', 'warehouse')
      .leftJoinAndSelect('stock_location.parent', 'parent')
      .where('stock_location.organization_id = :organizationId', { organizationId })
      // .orderBy('stock_location.updated_at', 'DESC')
      // .addOrderBy('stock_location.id', 'DESC') // helps TypeORM internally
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(stock_location.name ILIKE :search OR stock_location.code ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }
    if (query.warehouseId) qb.andWhere('warehouse.id = :warehouseId', { warehouseId: query.warehouseId });
    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toStockLocationType), total };
  }

  async get(id: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<StockLocationType> {
    const item = await this.stockLocationRepository.findOne({
      where: { id, organizationId },
      relations: { warehouse: true, parent: true },
    });
    if (!item) throw new NotFoundException('Stock location not found');
    return toStockLocationType(item);
  }

  async create(
    payload: CreateStockLocationDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<StockLocationType> {
    const duplicate = await this.stockLocationRepository.findOne({
      where: { organizationId, name: payload.name },
    });
    if (duplicate) throw new BadRequestException('Stock location name already exists');

    const warehouse = payload.warehouseId
      ? await this.warehouseRepository.findOne({ where: { id: payload.warehouseId, organizationId } })
      : null;
    if (payload.warehouseId && !warehouse) throw new BadRequestException('Warehouse not found');

    const parent = payload.parentId
      ? await this.stockLocationRepository.findOne({ where: { id: payload.parentId, organizationId } })
      : null;
    if (payload.parentId && !parent) throw new BadRequestException('Parent stock location not found');

    const entity = this.stockLocationRepository.create({
      organizationId,
      warehouseId: warehouse?.id ?? null,
      warehouse,
      parentId: parent?.id ?? null,
      parent,
      code: payload.code ?? null,
      name: payload.name,
      locationType: payload.locationType ?? 'internal',
      isActive: payload.isActive ?? true,
    });
    const savedEntity = await this.stockLocationRepository.save(entity);
    const fullEntity = await this.stockLocationRepository.findOneOrFail({
      where: { id: savedEntity.id, organizationId },
      relations: { warehouse: true, parent: true },
    });
    return toStockLocationType(fullEntity);
  }

  async update(
    id: string,
    payload: UpdateStockLocationDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<StockLocationType> {
    const item = await this.stockLocationRepository.findOne({
      where: { id, organizationId },
      relations: { warehouse: true, parent: true },
    });
    if (!item) throw new NotFoundException('Stock location not found');

    if (payload.name && payload.name !== item.name) {
      const duplicate = await this.stockLocationRepository.findOne({
        where: { organizationId, name: payload.name },
      });
      if (duplicate && duplicate.id !== item.id) {
        throw new BadRequestException('Stock location name already exists');
      }
    }

    if (payload.warehouseId !== undefined) {
      if (!payload.warehouseId) {
        item.warehouse = null;
        item.warehouseId = null;
      } else {
        const warehouse = await this.warehouseRepository.findOne({ where: { id: payload.warehouseId, organizationId } });
        if (!warehouse) throw new BadRequestException('Warehouse not found');
        item.warehouse = warehouse;
        item.warehouseId = warehouse.id;
      }
    }

    if (payload.parentId !== undefined) {
      if (!payload.parentId) {
        item.parent = null;
        item.parentId = null;
      } else {
        const parent = await this.stockLocationRepository.findOne({ where: { id: payload.parentId, organizationId } });
        if (!parent) throw new BadRequestException('Parent stock location not found');
        item.parent = parent;
        item.parentId = parent.id;
      }
    }

    if (payload.code !== undefined) item.code = payload.code ?? null;
    if (payload.name !== undefined) item.name = payload.name;
    if (payload.locationType !== undefined) item.locationType = payload.locationType;
    if (payload.isActive !== undefined) item.isActive = payload.isActive;

    const savedItem = await this.stockLocationRepository.save(item);
    const fullEntity = await this.stockLocationRepository.findOneOrFail({
      where: { id: savedItem.id, organizationId },
      relations: { warehouse: true, parent: true },
    });
    return toStockLocationType(fullEntity);
  }
}
