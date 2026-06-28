import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ROLE_REPOSITORY } from './identity.di-tokens';
import type { RoleRepository } from '../repositories/role.repository';
import { Role } from '../domains/role.entity';
import type { CreateRoleDto } from '../dto/create-role.dto';
import { BadRequestException } from '@nestjs/common';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(payload: CreateRoleDto, organizationId: string): Promise<Role> {
    const last = await this.roleRepository.findLastCreated(organizationId);
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: last?.code,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }

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
