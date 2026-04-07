import { Role } from '../domains/role.entity';

export interface RoleRepository {
  findByCode(code: string, organizationId: string): Promise<Role | null>;
  listByCodes(codes: string[], organizationId: string): Promise<Role[]>;
  listAll(organizationId: string): Promise<Role[]>;
}
