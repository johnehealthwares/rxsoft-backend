import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import type { PartyType } from '../../../shared/domain';
import { toPartyType } from '../../../shared/domain/mappers';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customers.dto';
import { PartyOrmEntity } from '../entities';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepository: Repository<PartyOrmEntity>,
  ) {}

  async list(organizationId: string, query: ListQueryDto): Promise<{ data: PartyType[]; total: number }> {
    const qb = this.partyRepository
      .createQueryBuilder('party')
      .where('party.organization_id = :organizationId', { organizationId })
      .andWhere('party.deleted_at IS NULL')
      .andWhere("party.party_type IN ('customer', 'both')");

    if (query.search) {
      qb.andWhere('(party.name LIKE :search OR party.phone LIKE :search OR party.email LIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    if (query.filter) {
      qb.andWhere('(party.name LIKE :filter OR party.phone LIKE :filter OR party.email LIKE :filter)', {
        filter: `%${query.filter}%`,
      });
    }

    qb.orderBy(this.resolveSortColumn(query.sortBy), query.sortOrder.toUpperCase() as 'ASC' | 'DESC')
      .skip(query.offset)
      .take(query.limit);

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toPartyType), total };
  }

  async createCustomer(organizationId: string, payload: CreateCustomerDto): Promise<PartyType> {
    const customer = this.partyRepository.create({
      organizationId,
      partyType: 'customer',
      code: null,
      name: payload.name,
      phone: payload.phone ?? null,
      email: payload.email ?? null,
      addressLine1: payload.address ?? null,
      isActive: true,
    });

    const savedCustomer = await this.partyRepository.save(customer);
    return toPartyType(savedCustomer);
  }

  async updateCustomer(organizationId: string, id: string, payload: UpdateCustomerDto): Promise<PartyType> {
    const customer = await this.partyRepository.findOne({
      where: { id, organizationId, deletedAt: IsNull() },
    });

    if (!customer || (customer.partyType !== 'customer' && customer.partyType !== 'both')) {
      throw new NotFoundException('Customer not found');
    }

    if (payload.name !== undefined) {
      customer.name = payload.name;
    }
    if (payload.phone !== undefined) {
      customer.phone = payload.phone;
    }
    if (payload.email !== undefined) {
      customer.email = payload.email;
    }
    if (payload.address !== undefined) {
      customer.addressLine1 = payload.address;
    }

    const savedCustomer = await this.partyRepository.save(customer);
    return toPartyType(savedCustomer);
  }

  async archive(organizationId: string, id: string): Promise<void> {
    const result = await this.partyRepository.softDelete({ id, organizationId });
    if (!result.affected) {
      throw new NotFoundException('Customer not found');
    }
  }

  private resolveSortColumn(sortBy: string): string {
    const map: Record<string, string> = {
      name: 'party.name',
      email: 'party.email',
      phone: 'party.phone',
      updatedAt: 'party.updated_at',
      createdAt: 'party.created_at',
    };

    return map[sortBy] ?? 'party.created_at';
  }
}
