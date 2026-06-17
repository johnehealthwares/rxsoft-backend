"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const node_crypto_1 = require("node:crypto");
const user_orm_entity_1 = require("../../modules/identity/entities/user.orm-entity");
const role_orm_entity_1 = require("../../modules/identity/entities/role.orm-entity");
const organizationId = 'df3b4afd-9955-4617-9a82-264cc73dd8b2';
const users = [
    { username: 'admin', roleCodes: ['admin'] },
    { username: 'super_admin', roleCodes: ['super_admin'] },
    { username: 'cashier', roleCodes: ['cashier'] },
    { username: 'auditor', roleCodes: ['auditor'] },
    { username: 'customer', roleCodes: ['customer'] },
    { username: 'conversation_operator', roleCodes: ['conversation_operator'] },
    { username: 'communication_manager', roleCodes: ['communication_manager'] },
    { username: 'coding_concept_editor', roleCodes: ['coding_concept_editor'] },
    { username: 'lis_technician', roleCodes: ['lis_technician'] },
    { username: 'admin_operator', roleCodes: ['admin_operator'] },
    { username: 'website_manager', roleCodes: ['website_manager'] },
    { username: 'website_user', roleCodes: ['website_user'] },
];
function hashPassword(password) {
    return (0, node_crypto_1.createHash)('sha256').update(password).digest('hex');
}
async function seedUsers(dataSource) {
    const userRepository = dataSource.getRepository(user_orm_entity_1.UserOrmEntity);
    const roleRepository = dataSource.getRepository(role_orm_entity_1.RoleOrmEntity);
    for (const userData of users) {
        const existingUser = await userRepository.findOne({
            where: {
                organizationId,
                username: userData.username,
            },
        });
        if (!existingUser) {
            const userRoles = await roleRepository.find({
                where: userData.roleCodes.map((code) => ({
                    organizationId,
                    code,
                })),
            });
            const user = userRepository.create({
                organizationId,
                username: userData.username,
                passwordHash: hashPassword('password'),
                isActive: true,
                roles: userRoles,
            });
            await userRepository.save(user);
            console.log(`Created user: ${userData.username}`);
        }
        else {
            console.log(`User already exists: ${userData.username}`);
        }
    }
}
//# sourceMappingURL=2-seed-users.js.map