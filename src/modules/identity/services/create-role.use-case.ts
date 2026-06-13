import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ROLE_REPOSITORY } from './identity.di-tokens';
import type { RoleRepository } from '../repositories/role.repository';
import { Role } from '../domains/role.entity';
import type { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(payload: CreateRoleDto, organizationId: string): Promise<Role> {
    const existing = await this.roleRepository.findByCode(payload.code, organizationId);
    if (existing) {
      throw new ConflictException(`Role with code "${payload.code}" already exists`);
    }

    const role = new Role(
      randomUUID(),
      organizationId,
      payload.code,
      payload.name,
      payload.description ?? null,
      payload.permissionCodes ?? [],
    );

    return this.roleRepository.create(role);
  }
}
