import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import type { ManufacturerType } from '../../../shared/domain';
import { toManufacturerType } from '../../../shared/domain/mappers';
import { CreateManufacturerDto, ListManufacturersDto, UpdateManufacturerDto } from '../dto/manufacturers.dto';
import { ManufacturerOrmEntity } from '../entities/manufacturer.orm-entity';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(ManufacturerOrmEntity)
    private readonly manufacturerRepository: Repository<ManufacturerOrmEntity>,
  ) {}

  async list(query: ListManufacturersDto): Promise<{ data: ManufacturerType[]; total: number }> {
    const qb = this.manufacturerRepository
      .createQueryBuilder('manufacturer')
      .where('manufacturer.deleted_at IS NULL')
      .orderBy('manufacturer.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(manufacturer.code ILIKE :search OR manufacturer.name ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toManufacturerType), total };
  }

  async getLastCreated(): Promise<{ id: string; code: string; createdAt: string } | null> {
    const entity = await this.manufacturerRepository.findOne({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
    if (!entity) return null;
    return { id: entity.id, code: entity.code ?? entity.name, createdAt: entity.createdAt.toISOString() };
  }

  async get(id: string): Promise<ManufacturerType> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!manufacturer) throw new NotFoundException('Manufacturer not found');
    return toManufacturerType(manufacturer);
  }

  async create(payload: CreateManufacturerDto): Promise<ManufacturerType> {
    if (payload.code) {
      const last = await this.getLastCreated();
      const { valid, expectedCode } = validateSequentialCode({
        providedCode: payload.code,
        lastCode: last?.code,
        override: payload.overrideCodeValidation,
      });
      if (!valid) {
        throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
      }
    }

    const duplicate = await this.manufacturerRepository.findOne({
      where: { name: payload.name, deletedAt: IsNull() },
    });
    if (duplicate) throw new BadRequestException('Manufacturer name already exists');

    const entity = this.manufacturerRepository.create({
      code: payload.code ?? null,
      name: payload.name,
    });
    const saved = await this.manufacturerRepository.save(entity);
    return toManufacturerType(saved);
  }

  async update(id: string, payload: UpdateManufacturerDto): Promise<ManufacturerType> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!manufacturer) throw new NotFoundException('Manufacturer not found');

    if (payload.name && payload.name !== manufacturer.name) {
      const duplicate = await this.manufacturerRepository.findOne({
        where: { name: payload.name, deletedAt: IsNull() },
      });
      if (duplicate) throw new BadRequestException('Manufacturer name already exists');
      manufacturer.name = payload.name;
    }

    if (payload.code !== undefined) manufacturer.code = payload.code;

    const saved = await this.manufacturerRepository.save(manufacturer);
    return toManufacturerType(saved);
  }

  async remove(id: string): Promise<void> {
    const result = await this.manufacturerRepository.softDelete({ id });
    if (!result.affected) throw new NotFoundException('Manufacturer not found');
  }
}