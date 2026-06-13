import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY } from './identity.di-tokens';
import type { RoleRepository } from '../repositories/role.repository';
import { Role } from '../domains/role.entity';
import type { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: string, payload: UpdateRoleDto, organizationId: string): Promise<Role> {
    const existing = await this.roleRepository.findById(id, organizationId);
    if (!existing) {
      throw new NotFoundException('Role not found');
    }

    const code = payload.code ?? existing.code;
    if (payload.code && payload.code !== existing.code) {
      const duplicate = await this.roleRepository.findByCode(payload.code, organizationId);
      if (duplicate) {
        throw new ConflictException(`Role with code "${payload.code}" already exists`);
      }
    }

    const updated = new Role(
      id,
      organizationId,
      code,
      payload.name ?? existing.name,
      payload.description !== undefined ? payload.description : existing.description,
      payload.permissionCodes ?? existing.permissionCodes,
    );

    return this.roleRepository.update(updated);
  }
}
