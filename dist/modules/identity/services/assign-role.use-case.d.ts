import { AssignRoleDto } from '../dto/assign-role.dto';
import type { UserRepository } from '../repositories/user.repository';
import type { RoleRepository } from '../repositories/role.repository';
export declare class AssignRoleUseCase {
    private readonly userRepository;
    private readonly roleRepository;
    constructor(userRepository: UserRepository, roleRepository: RoleRepository);
    execute(userId: string, payload: AssignRoleDto, organizationId: string): Promise<NonNullable<Awaited<ReturnType<UserRepository['findById']>>>>;
}
