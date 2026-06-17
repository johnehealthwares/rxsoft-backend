import type { RoleRepository } from '../repositories/role.repository';
import { Role } from '../domains/role.entity';
import type { CreateRoleDto } from '../dto/create-role.dto';
export declare class CreateRoleUseCase {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
    execute(payload: CreateRoleDto, organizationId: string): Promise<Role>;
}
