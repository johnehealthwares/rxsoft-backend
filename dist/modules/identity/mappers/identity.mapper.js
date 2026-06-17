"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityMapper = void 0;
const permission_entity_1 = require("../domains/permission.entity");
const role_entity_1 = require("../domains/role.entity");
const user_entity_1 = require("../domains/user.entity");
class IdentityMapper {
    static toDomainPermission(orm) {
        return new permission_entity_1.Permission(orm.id, orm.resource, orm.action, orm.code);
    }
    static toDomainRole(orm) {
        const permissionCodes = (orm.permissions ?? []).map((permission) => permission.code);
        return new role_entity_1.Role(orm.id, orm.organizationId, orm.code, orm.name, orm.description, permissionCodes);
    }
    static toDomainUser(orm) {
        const roleCodes = (orm.roles ?? []).map((role) => role.code);
        return new user_entity_1.User(orm.id, orm.organizationId, orm.username, orm.passwordHash, orm.isActive, roleCodes, orm.phone);
    }
}
exports.IdentityMapper = IdentityMapper;
//# sourceMappingURL=identity.mapper.js.map