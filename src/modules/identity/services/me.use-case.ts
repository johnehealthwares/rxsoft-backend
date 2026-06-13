import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY, USER_REPOSITORY } from './identity.di-tokens';
import type { UserRepository } from '../repositories/user.repository';
import type { RoleRepository } from '../repositories/role.repository';
import { getUserModules } from './permission.data';
import type { MeResponseDto } from '../dto/me-response.dto';

@Injectable()
export class MeUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(userId: string, organizationId: string): Promise<MeResponseDto> {
    const user = await this.userRepository.findById(userId, organizationId);
    const roleCodes = user?.roleCodes ?? [];
    const roles = await this.roleRepository.listByCodes(roleCodes, organizationId);
    const permissions = [...new Set(roles.flatMap((r) => r.permissionCodes))];
    const modules = getUserModules(permissions, roleCodes);

    return {
      id: userId,
      username: user?.username ?? 'unknown',
      phone: user?.phone,
      roles: roleCodes,
      permissions,
      modules,
    };
  }
}
