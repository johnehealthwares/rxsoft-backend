import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartyOrmEntity } from '../entities/party.orm-entity';
import { PartyType } from 'src/shared/domain';
import { ListQueryDto } from 'src/shared/dto/list-query.dto';
import { toPartyType } from 'src/shared/domain/mappers';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepository: Repository<PartyOrmEntity>,
  ) {}


    async list(organizationId: string, query: ListQueryDto): Promise<{ data: PartyType[]; total: number }> {
      const qb = this.partyRepository
        .createQueryBuilder('party')
        .where('party.organization_id = :organizationId', { organizationId })
        .andWhere('party.deleted_at IS NULL')
        .andWhere("party.party_type IN ('supplier', 'both')");
  
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
  async create(organizationId: string, payload: { name: string; phone?: string; email?: string; address?: string }) {
    const party = this.partyRepository.create({
      organizationId,
      partyType: 'supplier',
      code: null,
      name: payload.name,
      phone: payload.phone ?? null,
      email: payload.email ?? null,
      addressLine1: payload.address ?? null,
      isActive: true,
    });

    const saved = await this.partyRepository.save(party);
    return { id: saved.id, name: saved.name, phone: saved.phone, email: saved.email };
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
