import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from './identity.di-tokens';
import type { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class ListRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(organizationId: string): Promise<ReturnType<RoleRepository['listAll']>> {
    return this.roleRepository.listAll(organizationId);
  }
}
