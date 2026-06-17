import type { UserRepository } from '../repositories/user.repository';
export declare class ListUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(offset: number, limit: number, organizationId: string): Promise<Awaited<ReturnType<UserRepository['list']>>>;
}
