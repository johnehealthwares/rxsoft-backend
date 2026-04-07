import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../repositories/user.repository';
import { USER_REPOSITORY } from './identity.di-tokens';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    offset: number,
    limit: number,
    organizationId: string,
  ): Promise<Awaited<ReturnType<UserRepository['list']>>> {
    return this.userRepository.list(offset, limit, organizationId);
  }
}
