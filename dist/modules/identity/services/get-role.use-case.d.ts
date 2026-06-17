import type { RoleRepository } from '../repositories/role.repository';
import { Role } from '../domains/role.entity';
export declare class GetRoleUseCase {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
    execute(id: string, organizationId: string): Promise<Role>;
}
