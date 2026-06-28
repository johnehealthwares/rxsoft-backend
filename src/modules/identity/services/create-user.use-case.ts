import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import type { UserRepository } from '../repositories/user.repository';
import type { PasswordHasherPort } from './password-hasher.port';
import type { RoleRepository } from '../repositories/role.repository';
import { User } from '../domains/user.entity';
import { UserPosConfigService } from '../../user-pos-config/services/user-pos-config.service';
import { PASSWORD_HASHER, ROLE_REPOSITORY, USER_REPOSITORY } from './identity.di-tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasherPort,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
    private readonly userPosConfigService: UserPosConfigService,
  ) {}

  async execute(payload: CreateUserDto, organizationId: string): Promise<Awaited<ReturnType<UserRepository['create']>>> {
    const existing = await this.userRepository.findByUsername(payload.username, organizationId);
    if (existing) {
      throw new BadRequestException('Username already exists');
    }

    const roleCodes = payload.roleCodes ?? ['cashier'];
    const roles = await this.roleRepository.listByCodes(roleCodes, organizationId);
    if (roles.length !== roleCodes.length) {
      throw new BadRequestException('One or more roles are invalid');
    }

    const passwordHash = await this.passwordHasher.hash(payload.password);
    const user = new User(randomUUID(), organizationId, payload.username, passwordHash, true, roleCodes,roles, payload.phone);

    const created = await this.userRepository.create(user);

    if (payload.posConfig) {
      await this.userPosConfigService.update(created.id, organizationId, payload.posConfig);
    }

    return created;
  }
}
