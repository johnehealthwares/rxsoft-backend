"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantFromUser = tenantFromUser;
function tenantFromUser(user) {
    return {
        organizationId: user.organizationId,
        locationId: user.locationId ?? null,
        isGlobalAdmin: !user.organizationId,
    };
}
//# sourceMappingURL=tenant-context.js.map