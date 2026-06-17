"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
class Permission {
    id;
    resource;
    action;
    code;
    constructor(id, resource, action, code) {
        this.id = id;
        this.resource = resource;
        this.action = action;
        this.code = code;
    }
}
exports.Permission = Permission;
//# sourceMappingURL=permission.entity.js.map