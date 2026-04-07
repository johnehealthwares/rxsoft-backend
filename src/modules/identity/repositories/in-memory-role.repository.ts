import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Role } from '../domains/role.entity';

@Injectable()
export class InMemoryRoleRepository implements RoleRepository {
  private readonly organizationId = 'org1';
  private readonly roles: Role[] = [
    new Role('1', 'super_admin', 'Super Admin', ['*']),
    new Role('2', 'admin', 'Admin', [
      'users.read',
      'users.create',
      'users.update',
      'users.assign_role',
      'sales.read',
      'sales.create',
      'inventory.read',
      'inventory.adjust',
      'purchases.read',
      'purchases.create',
      'reports.read',
    ]),
    new Role('3', 'cashier', 'Cashier', ['sales.read', 'sales.create', 'payments.create', 'receivables.collect']),
  ];

  async findByCode(code: string, organizationId: string): Promise<Role | null> {
    if (organizationId !== this.organizationId) {
      return null;
    }
    return this.roles.find((role) => role.code === code) ?? null;
  }

  async listByCodes(codes: string[], organizationId: string): Promise<Role[]> {
    if (organizationId !== this.organizationId) {
      return [];
    }
    return this.roles.filter((role) => codes.includes(role.code));
  }

  async listAll(organizationId: string): Promise<Role[]> {
    if (organizationId !== this.organizationId) {
      return [];
    }
    return [...this.roles];
  }
}
