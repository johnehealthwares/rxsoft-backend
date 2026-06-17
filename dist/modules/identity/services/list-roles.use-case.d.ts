import type { RoleRepository } from '../repositories/role.repository';
export declare class ListRolesUseCase {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
    execute(organizationId: string): Promise<ReturnType<RoleRepository['listAll']>>;
}
