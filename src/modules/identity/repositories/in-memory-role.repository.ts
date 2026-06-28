import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { Role } from '../domains/role.entity';

@Injectable()
export class InMemoryRoleRepository implements RoleRepository {
  async findLastCreated(organizationId: string): Promise<Pick<Role, 'code'> | null> {
    if (organizationId !== this.organizationId) return null;
    const last = this.roles[this.roles.length - 1];
    return last ? { code: last.code } : null;
  }

  private readonly organizationId = 'org1';
  private roles: Role[] = [
    new Role('1', this.organizationId, 'super_admin', 'Super Admin', 'Full system access', ['*']),
    new Role('2', this.organizationId, 'admin', 'Admin', 'Administrative access', [
      'rxsoft:users.read',
      'rxsoft:users.create',
      'rxsoft:users.update',
      'rxsoft:users.assign_role',
      'rxsoft:sales.read',
      'rxsoft:sales.create',
      'rxsoft:inventory.read',
      'rxsoft:inventory.adjust',
      'rxsoft:purchases.read',
      'rxsoft:purchases.create',
      'rxsoft:reports.read',
    ]),
    new Role('3', this.organizationId, 'cashier', 'Cashier', 'Point of sale operations', [
      'rxsoft:sales.read',
      'rxsoft:sales.create',
      'rxsoft:payments.create',
      'rxsoft:receivables.collect',
    ]),
  ];
  private nextId = 4;

  async findByCode(code: string, organizationId: string): Promise<Role | null> {
    if (organizationId !== this.organizationId) {
      return null;
    }
    return this.roles.find((role) => role.code === code) ?? null;
  }

  async findById(id: string, organizationId: string): Promise<Role | null> {
    if (organizationId !== this.organizationId) {
      return null;
    }
    return this.roles.find((role) => role.id === id) ?? null;
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

  async create(role: Role): Promise<Role> {
    this.roles.push(role);
    return role;
  }

  async update(role: Role): Promise<Role> {
    const index = this.roles.findIndex((r) => r.id === role.id);
    if (index === -1) {
      throw new NotFoundException('Role not found');
    }
    this.roles[index] = role;
    return role;
  }

  async delete(id: string, organizationId: string): Promise<void> {
    const index = this.roles.findIndex((r) => r.id === id && r.organizationId === organizationId);
    if (index === -1) {
      throw new NotFoundException('Role not found');
    }
    this.roles.splice(index, 1);
  }
}
