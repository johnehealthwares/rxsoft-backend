"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    organizationId;
    username;
    passwordHash;
    isActive;
    roleCodes;
    roles;
    phone;
    constructor(id, organizationId, username, passwordHash, isActive, roleCodes = [], roles = [], phone) {
        this.id = id;
        this.organizationId = organizationId;
        this.username = username;
        this.passwordHash = passwordHash;
        this.isActive = isActive;
        this.roleCodes = roleCodes;
        this.roles = roles;
        this.phone = phone;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map