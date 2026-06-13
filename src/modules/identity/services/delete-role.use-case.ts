import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ROLE_REPOSITORY } from './identity.di-tokens';
import type { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: string, organizationId: string): Promise<void> {
    const existing = await this.roleRepository.findById(id, organizationId);
    if (!existing) {
      throw new NotFoundException('Role not found');
    }
    await this.roleRepository.delete(id, organizationId);
  }
}
