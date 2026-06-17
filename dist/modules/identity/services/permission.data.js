"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVAILABLE_MODULES = void 0;
exports.getUserModules = getUserModules;
exports.AVAILABLE_MODULES = [
    { id: 'rxsoft', name: 'RxSoft', description: 'Pharmacy Admin', root: '/items' },
    { id: 'conversation', name: 'Conversation', description: 'Workflow Chat', root: '/conversations' },
    { id: 'communication', name: 'Switch', description: 'Messaging & Routing', root: '/messages' },
    { id: 'coding-concept', name: 'Coding Concept', description: 'Terminology', root: '/coding-concepts' },
    { id: 'lis', name: 'LIS', description: 'Laboratory', root: '/lis' },
    { id: 'admin', name: 'Admin Console', description: 'Administration', root: '/users' },
    { id: 'website', name: 'Website Console', description: 'Website', root: '/' },
];
function getUserModules(permissions, _roleCodes = []) {
    const hasWildcard = permissions.includes('*');
    if (hasWildcard || _roleCodes.includes('super_admin')) {
        return exports.AVAILABLE_MODULES;
    }
    const modules = exports.AVAILABLE_MODULES.filter((mod) => {
        return permissions.some((perm) => perm.startsWith(mod.id + ':') || perm === mod.id);
    });
    return modules;
}
//# sourceMappingURL=permission.data.js.map