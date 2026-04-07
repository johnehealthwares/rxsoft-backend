import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleRepository } from './role.repository';
import { Role } from '../domains/role.entity';
import { RoleOrmEntity } from '../entities/role.orm-entity';
import { IdentityMapper } from '../mappers/identity.mapper';

@Injectable()
export class TypeormRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleOrmEntity)
    private readonly roleRepository: Repository<RoleOrmEntity>,
  ) {}

  async findByCode(code: string, organizationId: string): Promise<Role | null> {
    const item = await this.roleRepository.findOne({
      where: { code, organizationId },
      relations: { permissions: true },
    });

    return item ? IdentityMapper.toDomainRole(item) : null;
  }

  async listByCodes(codes: string[], organizationId: string): Promise<Role[]> {
    if (!codes.length) {
      return [];
    }

    const items = await this.roleRepository.find({
      where: codes.map((code) => ({ code, organizationId })),
      relations: { permissions: true },
    });

    return items.map(IdentityMapper.toDomainRole.bind(IdentityMapper));
  }

  async listAll(organizationId: string): Promise<Role[]> {
    const items = await this.roleRepository.find({
      where: { organizationId },
      relations: { permissions: true },
      order: { code: 'ASC' },
    });

    return items.map(IdentityMapper.toDomainRole.bind(IdentityMapper));
  }
}
