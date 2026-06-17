"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    id;
    organizationId;
    code;
    name;
    description;
    permissionCodes;
    constructor(id, organizationId, code, name, description = null, permissionCodes = []) {
        this.id = id;
        this.organizationId = organizationId;
        this.code = code;
        this.name = name;
        this.description = description;
        this.permissionCodes = permissionCodes;
    }
}
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map