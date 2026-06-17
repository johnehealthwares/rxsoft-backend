import { RoleRepository } from './role.repository';
import { Role } from '../domains/role.entity';
export declare class InMemoryRoleRepository implements RoleRepository {
    private readonly organizationId;
    private roles;
    private nextId;
    findByCode(code: string, organizationId: string): Promise<Role | null>;
    findById(id: string, organizationId: string): Promise<Role | null>;
    listByCodes(codes: string[], organizationId: string): Promise<Role[]>;
    listAll(organizationId: string): Promise<Role[]>;
    create(role: Role): Promise<Role>;
    update(role: Role): Promise<Role>;
    delete(id: string, organizationId: string): Promise<void>;
}
