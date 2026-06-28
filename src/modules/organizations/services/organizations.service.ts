import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { toOrganizationType } from '../../../shared/domain/mappers';
import { CreateOrganizationDto, ListOrganizationsDto, UpdateOrganizationDto } from '../dto/organizations.dto';
import { OrganizationOrmEntity } from '../entities/organization.orm-entity';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

export type OrganizationType = ReturnType<typeof toOrganizationType>;

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationOrmEntity)
    private readonly organizationRepository: Repository<OrganizationOrmEntity>,
  ) {}

  async list(query: ListOrganizationsDto): Promise<{ data: OrganizationType[]; total: number }> {
    const qb = this.organizationRepository
      .createQueryBuilder('organization')
      .where('organization.deleted_at IS NULL')
      .orderBy('organization.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(organization.code ILIKE :search OR organization.name ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toOrganizationType), total };
  }

  async get(id: string): Promise<OrganizationType> {
    const organization = await this.organizationRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!organization) throw new NotFoundException('Organization not found');
    return toOrganizationType(organization);
  }

  async create(payload: CreateOrganizationDto): Promise<OrganizationType> {
    const last = await this.organizationRepository.findOne({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
      select: ['code'],
    });
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: last?.code,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }

    const duplicate = await this.organizationRepository.findOne({
      where: { code: payload.code, deletedAt: IsNull() },
    });
    if (duplicate) throw new BadRequestException('Organization code already exists');

    const entity = this.organizationRepository.create({
      code: payload.code,
      name: payload.name,
      isActive: payload.isActive ?? true,
    });
    const saved = await this.organizationRepository.save(entity);
    return toOrganizationType(saved);
  }

  async update(id: string, payload: UpdateOrganizationDto): Promise<OrganizationType> {
    const organization = await this.organizationRepository.findOne({ where: { id, deletedAt: IsNull() } });
    if (!organization) throw new NotFoundException('Organization not found');

    if (payload.code && payload.code !== organization.code) {
      const duplicate = await this.organizationRepository.findOne({
        where: { code: payload.code, deletedAt: IsNull() },
      });
      if (duplicate) throw new BadRequestException('Organization code already exists');
      organization.code = payload.code;
    }

    if (payload.name !== undefined) organization.name = payload.name;
    if (payload.isActive !== undefined) organization.isActive = payload.isActive;

    const saved = await this.organizationRepository.save(organization);
    return toOrganizationType(saved);
  }

  async remove(id: string): Promise<void> {
    const result = await this.organizationRepository.softDelete({ id });
    if (!result.affected) throw new NotFoundException('Organization not found');
  }
}
