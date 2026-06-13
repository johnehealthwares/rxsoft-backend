import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY } from './identity.di-tokens';
import type { RoleRepository } from '../repositories/role.repository';
import { Role } from '../domains/role.entity';

@Injectable()
export class GetRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: string, organizationId: string): Promise<Role> {
    const role = await this.roleRepository.findById(id, organizationId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}
