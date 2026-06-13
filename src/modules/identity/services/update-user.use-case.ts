import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UpdateUserDto } from '../dto/update-user.dto';
import type { UserRepository } from '../repositories/user.repository';
import type { PasswordHasherPort } from './password-hasher.port';
import type { RoleRepository } from '../repositories/role.repository';
import { User } from '../domains/user.entity';
import { PASSWORD_HASHER, ROLE_REPOSITORY, USER_REPOSITORY } from './identity.di-tokens';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasherPort,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(userId: string, payload: UpdateUserDto, organizationId: string): Promise<User> {
    const user = await this.userRepository.findById(userId, organizationId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roleCodes = payload.roleCodes ?? user.roleCodes;
    if (payload.roleCodes) {
      const roles = await this.roleRepository.listByCodes(roleCodes, organizationId);
      if (roles.length !== roleCodes.length) {
        throw new BadRequestException('One or more roles are invalid');
      }
    }

    const passwordHash = payload.password
      ? await this.passwordHasher.hash(payload.password)
      : user.passwordHash;

    const updatedUser = new User(
      userId,
      organizationId,
      payload.username ?? user.username,
      passwordHash,
      payload.isActive ?? user.isActive,
      roleCodes,
    );

    await this.userRepository.update(updatedUser, organizationId);
    return updatedUser;
  }
}
