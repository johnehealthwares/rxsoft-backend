"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRoleRepository = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("../domains/role.entity");
let InMemoryRoleRepository = class InMemoryRoleRepository {
    organizationId = 'org1';
    roles = [
        new role_entity_1.Role('1', this.organizationId, 'super_admin', 'Super Admin', 'Full system access', ['*']),
        new role_entity_1.Role('2', this.organizationId, 'admin', 'Admin', 'Administrative access', [
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
        new role_entity_1.Role('3', this.organizationId, 'cashier', 'Cashier', 'Point of sale operations', [
            'rxsoft:sales.read',
            'rxsoft:sales.create',
            'rxsoft:payments.create',
            'rxsoft:receivables.collect',
        ]),
    ];
    nextId = 4;
    async findByCode(code, organizationId) {
        if (organizationId !== this.organizationId) {
            return null;
        }
        return this.roles.find((role) => role.code === code) ?? null;
    }
    async findById(id, organizationId) {
        if (organizationId !== this.organizationId) {
            return null;
        }
        return this.roles.find((role) => role.id === id) ?? null;
    }
    async listByCodes(codes, organizationId) {
        if (organizationId !== this.organizationId) {
            return [];
        }
        return this.roles.filter((role) => codes.includes(role.code));
    }
    async listAll(organizationId) {
        if (organizationId !== this.organizationId) {
            return [];
        }
        return [...this.roles];
    }
    async create(role) {
        this.roles.push(role);
        return role;
    }
    async update(role) {
        const index = this.roles.findIndex((r) => r.id === role.id);
        if (index === -1) {
            throw new common_1.NotFoundException('Role not found');
        }
        this.roles[index] = role;
        return role;
    }
    async delete(id, organizationId) {
        const index = this.roles.findIndex((r) => r.id === id && r.organizationId === organizationId);
        if (index === -1) {
            throw new common_1.NotFoundException('Role not found');
        }
        this.roles.splice(index, 1);
    }
};
exports.InMemoryRoleRepository = InMemoryRoleRepository;
exports.InMemoryRoleRepository = InMemoryRoleRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryRoleRepository);
//# sourceMappingURL=in-memory-role.repository.js.map