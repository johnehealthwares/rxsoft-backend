import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import type { GenericProductType } from '../../../shared/domain';
import { toGenericProductType } from '../../../shared/domain/mappers';
import { CreateGenericProductDto, ListGenericProductsDto, UpdateGenericProductDto } from '../dto/generic-products.dto';
import { GenericProductOrmEntity } from '../entities/generic-product.orm-entity';
import { PharmaceuticsOrmEntity } from '../entities/pharmaceutics.orm-entity';

@Injectable()
export class GenericProductsService {
  constructor(
    @InjectRepository(GenericProductOrmEntity)
    private readonly genericProductRepository: Repository<GenericProductOrmEntity>,
    @InjectRepository(PharmaceuticsOrmEntity)
    private readonly pharmaceuticsRepository: Repository<PharmaceuticsOrmEntity>,
  ) {}

  async list(
    query: ListGenericProductsDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<{ data: GenericProductType[]; total: number }> {
    const qb = this.genericProductRepository
      .createQueryBuilder('generic_product')
      .leftJoinAndSelect('generic_product.pharmaceutics', 'pharmacology_info')
      .where('generic_product.organization_id = :organizationId', { organizationId })
      .andWhere('generic_product.deleted_at IS NULL')
      // .orderBy('generic_product.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(generic_product.code ILIKE :search OR generic_product.name ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toGenericProductType), total };
  }

  async get(id: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<GenericProductType> {
    const item = await this.genericProductRepository.findOne({
      where: { id, organizationId, deletedAt: IsNull() },
      relations: { pharmaceutics: true },
    });
    if (!item) throw new NotFoundException('Generic product not found');
    return toGenericProductType(item);
  }

  async create(
    payload: CreateGenericProductDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<GenericProductType> {
    const duplicate = await this.genericProductRepository.findOne({
      where: { organizationId, code: payload.code, deletedAt: IsNull() },
    });
    if (duplicate) throw new BadRequestException('Generic product code already exists');

    const pharmaceutics = await this.pharmaceuticsRepository.findOne({
      where: { id: payload.pharmaceuticsId, organizationId, deletedAt: IsNull() },
    });
    if (!pharmaceutics) throw new BadRequestException('Pharmacology info not found');

    const entity = this.genericProductRepository.create({
      organizationId,
      code: payload.code,
      name: payload.name,
      therapeuticClass: payload.therapeuticClass ?? null,
      dosageForm: payload.dosageForm ?? null,
      strength: payload.strength ?? null,
      generalUse: payload.generalUse ?? '',
      adultDosage: payload.adultDosage ?? '',
      pediatricDosage: payload.pediatricDosage ?? '',
      isPrescriptionRequired: payload.isPrescriptionRequired ?? false,
      isControlledSubstance: payload.isControlledSubstance ?? false,
      pharmaceutics,
    });
    const savedEntity = await this.genericProductRepository.save(entity);
    const fullEntity = await this.genericProductRepository.findOneOrFail({
      where: { id: savedEntity.id, organizationId, deletedAt: IsNull() },
      relations: { pharmaceutics: true },
    });
    return toGenericProductType(fullEntity);
  }

  async update(
    id: string,
    payload: UpdateGenericProductDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<GenericProductType> {
    const item = await this.genericProductRepository.findOne({
      where: { id, organizationId, deletedAt: IsNull() },
      relations: { pharmaceutics: true },
    });
    if (!item) throw new NotFoundException('Generic product not found');

    if (payload.code && payload.code !== item.code) {
      const duplicate = await this.genericProductRepository.findOne({
        where: { organizationId, code: payload.code, deletedAt: IsNull() },
      });
      if (duplicate) throw new BadRequestException('Generic product code already exists');
      item.code = payload.code;
    }

    if (payload.pharmaceuticsId) {
      const pharmaceutics = await this.pharmaceuticsRepository.findOne({
        where: { id: payload.pharmaceuticsId, organizationId, deletedAt: IsNull() },
      });
      if (!pharmaceutics) throw new BadRequestException('Pharmacology info not found');
      item.pharmaceutics = pharmaceutics;
    }

    if (payload.name !== undefined) item.name = payload.name;
    if (payload.therapeuticClass !== undefined) item.therapeuticClass = payload.therapeuticClass ?? null;
    if (payload.dosageForm !== undefined) item.dosageForm = payload.dosageForm ?? null;
    if (payload.strength !== undefined) item.strength = payload.strength ?? null;
    if (payload.generalUse !== undefined) item.generalUse = payload.generalUse;
    if (payload.adultDosage !== undefined) item.adultDosage = payload.adultDosage;
    if (payload.pediatricDosage !== undefined) item.pediatricDosage = payload.pediatricDosage;
    if (payload.isPrescriptionRequired !== undefined) item.isPrescriptionRequired = payload.isPrescriptionRequired;
    if (payload.isControlledSubstance !== undefined) item.isControlledSubstance = payload.isControlledSubstance;

    const savedItem = await this.genericProductRepository.save(item);
    const fullEntity = await this.genericProductRepository.findOneOrFail({
      where: { id: savedItem.id, organizationId, deletedAt: IsNull() },
      relations: { pharmaceutics: true },
    });
    return toGenericProductType(fullEntity);
  }
}
