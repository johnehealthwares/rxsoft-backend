import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { WarehouseType } from '../../../shared/domain';
import { toWarehouseType } from '../../../shared/domain/mappers';
import { validateSequentialCode } from '../../../shared/utils/code-validation';
import { CreateWarehouseDto, ListWarehousesDto, UpdateWarehouseDto } from '../dto/warehouses.dto';
import { WarehouseOrmEntity } from '../../inventory/entities/warehouse.orm-entity';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(WarehouseOrmEntity)
    private readonly warehouseRepository: Repository<WarehouseOrmEntity>,
  ) {}

  async list(query: ListWarehousesDto, organizationId: string): Promise<{ data: WarehouseType[]; total: number }> {
    const qb = this.warehouseRepository
      .createQueryBuilder('warehouse')
      .where('warehouse.organization_id = :organizationId', { organizationId })
      .orderBy('warehouse.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(warehouse.code ILIKE :search OR warehouse.name ILIKE :search)', { search: `%${query.search}%` });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toWarehouseType), total };
  }

  async get(id: string, organizationId: string): Promise<WarehouseType> {
    const warehouse = await this.warehouseRepository.findOne({ where: { id, organizationId } });
    if (!warehouse) throw new NotFoundException('Warehouse not found');
    return toWarehouseType(warehouse);
  }

  async create(payload: CreateWarehouseDto, organizationId: string): Promise<WarehouseType> {
    if (payload.code) {
      const last = await this.warehouseRepository.findOne({
        where: { organizationId },
        order: { createdAt: 'DESC' },
      });
      const { valid, expectedCode } = validateSequentialCode({
        providedCode: payload.code,
        lastCode: last?.code ?? undefined,
        override: payload.overrideCodeValidation,
      });
      if (!valid) throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }

    const duplicate = await this.warehouseRepository.findOne({ where: { organizationId, code: payload.code } });
    if (duplicate) throw new BadRequestException('Warehouse code already exists');

    const entity = this.warehouseRepository.create({
      organizationId,
      code: payload.code,
      name: payload.name,
      address: payload.address ?? null,
      isActive: payload.isActive ?? true,
    });
    const saved = await this.warehouseRepository.save(entity);
    return toWarehouseType(saved);
  }

  async update(id: string, payload: UpdateWarehouseDto, organizationId: string): Promise<WarehouseType> {
    const warehouse = await this.warehouseRepository.findOne({ where: { id, organizationId } });
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    if (payload.code !== undefined) {
      if (payload.code !== warehouse.code) {
        const duplicate = await this.warehouseRepository.findOne({ where: { organizationId, code: payload.code } });
        if (duplicate) throw new BadRequestException('Warehouse code already exists');
      }
      warehouse.code = payload.code;
    }
    if (payload.name !== undefined) warehouse.name = payload.name;
    if (payload.address !== undefined) warehouse.address = payload.address;
    if (payload.isActive !== undefined) warehouse.isActive = payload.isActive;

    const saved = await this.warehouseRepository.save(warehouse);
    return toWarehouseType(saved);
  }

  async remove(id: string, organizationId: string): Promise<void> {
    const result = await this.warehouseRepository.delete({ id, organizationId });
    if (!result.affected) throw new NotFoundException('Warehouse not found');
  }
}
