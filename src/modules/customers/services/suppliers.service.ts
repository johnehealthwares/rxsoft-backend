import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import { PartyOrmEntity } from '../entities/party.orm-entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepository: Repository<PartyOrmEntity>,
  ) {}

  async create(payload: { name: string; phone?: string; email?: string; address?: string }) {
    const party = this.partyRepository.create({
      organizationId: DEFAULT_ORGANIZATION_ID,
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
}
