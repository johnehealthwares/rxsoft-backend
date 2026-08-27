import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsuranceProviderOrmEntity } from '../entities/insurance-provider.orm-entity';
import {
  CreateInsuranceProviderDto,
  ListInsuranceProvidersDto,
  UpdateInsuranceProviderDto,
} from '../dto/insurance-providers.dto';

@Injectable()
export class InsuranceProvidersService {
  constructor(
    @InjectRepository(InsuranceProviderOrmEntity)
    private readonly repo: Repository<InsuranceProviderOrmEntity>,
  ) {}

  async list(organizationId: string, query: ListInsuranceProvidersDto) {
    const qb = this.repo
      .createQueryBuilder('provider')
      .where('provider.organization_id = :organizationId', { organizationId });
    if (query.search) {
      qb.andWhere(
        '(provider.code ILIKE :search OR provider.name ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }
    const [data, total] = await qb
      .orderBy('provider.name', 'ASC')
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .getManyAndCount();
    return { data, total };
  }

  async get(id: string, organizationId: string) {
    const provider = await this.repo.findOne({ where: { id, organizationId } });
    if (!provider) throw new NotFoundException('Insurance provider not found');
    return provider;
  }

  async create(organizationId: string, payload: CreateInsuranceProviderDto) {
    const dup = await this.repo.findOne({
      where: { organizationId, code: payload.code },
    });
    if (dup)
      throw new BadRequestException('Insurance provider code already exists');
    const entity = this.repo.create({
      organizationId,
      code: payload.code,
      name: payload.name,
      providerType: payload.providerType ?? 'hmo',
      contactPhone: payload.contactPhone ?? null,
      contactEmail: payload.contactEmail ?? null,
      isActive: payload.isActive ?? true,
    });
    return this.repo.save(entity);
  }

  async update(
    id: string,
    organizationId: string,
    payload: UpdateInsuranceProviderDto,
  ) {
    const provider = await this.get(id, organizationId);
    if (payload.code && payload.code !== provider.code) {
      const dup = await this.repo.findOne({
        where: { organizationId, code: payload.code },
      });
      if (dup)
        throw new BadRequestException('Insurance provider code already exists');
      provider.code = payload.code;
    }
    if (payload.name !== undefined) provider.name = payload.name;
    if (payload.providerType !== undefined)
      provider.providerType = payload.providerType;
    if (payload.contactPhone !== undefined)
      provider.contactPhone = payload.contactPhone;
    if (payload.contactEmail !== undefined)
      provider.contactEmail = payload.contactEmail;
    if (payload.isActive !== undefined) provider.isActive = payload.isActive;
    return this.repo.save(provider);
  }

  async remove(id: string, organizationId: string): Promise<void> {
    const result = await this.repo.delete({ id, organizationId });
    if (!result.affected)
      throw new NotFoundException('Insurance provider not found');
  }
}
