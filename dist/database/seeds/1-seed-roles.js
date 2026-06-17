"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = seedRoles;
const node_crypto_1 = require("node:crypto");
const role_orm_entity_1 = require("../../modules/identity/entities/role.orm-entity");
const permission_orm_entity_1 = require("../../modules/identity/entities/permission.orm-entity");
const permission_definitions_data_1 = require("../../modules/identity/services/permission-definitions.data");
const organizationId = 'df3b4afd-9955-4617-9a82-264cc73dd8b2';
async function seedRoles(dataSource) {
    const roleRepository = dataSource.getRepository(role_orm_entity_1.RoleOrmEntity);
    const permissionRepository = dataSource.getRepository(permission_orm_entity_1.PermissionOrmEntity);
    const permissionMap = new Map();
    for (const mod of permission_definitions_data_1.MODULE_PERMISSIONS) {
        for (const feature of mod.features) {
            for (const action of feature.actions) {
                const code = `${mod.id}:${feature.resource}.${action.name}`;
                let perm = await permissionRepository.findOne({ where: { code } });
                if (!perm) {
                    perm = permissionRepository.create({
                        code,
                        resource: feature.resource,
                        action: action.name,
                        description: `${feature.label} – ${action.label}`,
                    });
                    perm = await permissionRepository.save(perm);
                    console.log(`Created permission: ${code}`);
                }
                permissionMap.set(code, perm);
            }
        }
    }
    const roles = [
        {
            code: 'super_admin',
            name: 'Super Admin',
            description: 'Full system access to all modules and features',
            permissionCodes: ['*'],
        },
        {
            code: 'admin',
            name: 'Admin',
            description: 'Administrative access to all features across all modules',
            permissionCodes: (0, permission_definitions_data_1.getAllPermissionCodes)(),
        },
        {
            code: 'cashier',
            name: 'Cashier',
            description: 'Point of sale operations',
            permissionCodes: [
                'rxsoft:sales.read',
                'rxsoft:sales.create',
                'rxsoft:payments.create',
                'rxsoft:receivables.collect',
                'rxsoft:customers.read',
                'rxsoft:customers.create',
                'rxsoft:inventory.read',
            ],
        },
        {
            code: 'auditor',
            name: 'Auditor',
            description: 'Read-only access to reports and audit logs',
            permissionCodes: [
                'rxsoft:sales.read',
                'rxsoft:purchases.read',
                'rxsoft:inventory.read',
                'rxsoft:receivables.read',
                'rxsoft:reports.read',
                'admin:audit-logs.read',
            ],
        },
        {
            code: 'customer',
            name: 'Customer',
            description: 'Self-service customer portal access',
            permissionCodes: [
                'rxsoft:products.read',
                'rxsoft:sales.create',
                'rxsoft:payments.create',
            ],
        },
        {
            code: 'website_user',
            name: 'Website User',
            description: 'Self-service pharmacy portal user',
            permissionCodes: [
                'rxsoft:products.read',
                'rxsoft:sales.create',
                'rxsoft:payments.create',
                'website:health-concerns.read',
                'website:articles.read',
                'website:prescriptions.create',
                'website:prescriptions.read',
                'website:consultations.create',
                'website:consultations.read',
                'website:orders.create',
                'website:orders.read',
                'website:reviews.create',
                'website:rewards.read',
            ],
        },
        {
            code: 'conversation_operator',
            name: 'Conversation Operator',
            description: 'Manages conversations, questionnaires, and workflows',
            permissionCodes: (0, permission_definitions_data_1.getPermissionCodesByModule)('conversation'),
        },
        {
            code: 'communication_manager',
            name: 'Communication Manager',
            description: 'Manages messages, notifications, and broadcast campaigns',
            permissionCodes: (0, permission_definitions_data_1.getPermissionCodesByModule)('communication'),
        },
        {
            code: 'coding_concept_editor',
            name: 'Coding Concept Editor',
            description: 'Manages medical coding concepts',
            permissionCodes: (0, permission_definitions_data_1.getPermissionCodesByModule)('coding-concept'),
        },
        {
            code: 'lis_technician',
            name: 'LIS Technician',
            description: 'Manages lab test definitions, samples, and reference ranges',
            permissionCodes: (0, permission_definitions_data_1.getPermissionCodesByModule)('lis'),
        },
        {
            code: 'admin_operator',
            name: 'Admin Operator',
            description: 'Manages system settings and audit logs',
            permissionCodes: (0, permission_definitions_data_1.getPermissionCodesByModule)('admin'),
        },
        {
            code: 'website_manager',
            name: 'Website Manager',
            description: 'Full management of website content and portal features',
            permissionCodes: (0, permission_definitions_data_1.getPermissionCodesByModule)('website'),
        },
    ];
    for (const roleData of roles) {
        let role = await roleRepository.findOne({
            where: { organizationId, code: roleData.code },
            relations: { permissions: true },
        });
        if (!role) {
            role = roleRepository.create({
                id: (0, node_crypto_1.randomUUID)(),
                organizationId,
                code: roleData.code,
                name: roleData.name,
                description: roleData.description,
                permissions: [],
            });
        }
        else {
            role.name = roleData.name;
            role.description = roleData.description;
        }
        if (roleData.permissionCodes.includes('*')) {
            role.permissions = await permissionRepository.find();
        }
        else {
            role.permissions = roleData.permissionCodes
                .map((code) => permissionMap.get(code))
                .filter((p) => !!p);
        }
        await roleRepository.save(role);
        console.log(`Upserted role: ${roleData.code}`);
    }
}
//# sourceMappingURL=1-seed-roles.js.map