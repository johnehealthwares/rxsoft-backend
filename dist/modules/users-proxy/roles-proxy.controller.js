"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_proxy_service_1 = require("./users-proxy.service");
let RolesProxyController = class RolesProxyController {
    proxy;
    constructor(proxy) {
        this.proxy = proxy;
    }
    async listModules(auth) {
        return this.proxy.listPermissionModules(auth?.replace('Bearer ', '') ?? '');
    }
    async create(auth, payload) {
        return this.proxy.createRole(auth?.replace('Bearer ', '') ?? '', payload);
    }
    async list(auth) {
        return this.proxy.listRoles(auth?.replace('Bearer ', '') ?? '');
    }
    async get(auth, id) {
        return this.proxy.getRole(auth?.replace('Bearer ', '') ?? '', id);
    }
    async update(auth, id, payload) {
        return this.proxy.updateRole(auth?.replace('Bearer ', '') ?? '', id, payload);
    }
    async delete(auth, id) {
        return this.proxy.deleteRole(auth?.replace('Bearer ', '') ?? '', id);
    }
};
exports.RolesProxyController = RolesProxyController;
__decorate([
    (0, common_1.Get)('permissions/modules'),
    (0, swagger_1.ApiOperation)({ summary: 'List all permissions grouped by module (proxied from rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesProxyController.prototype, "listModules", null);
__decorate([
    (0, common_1.Post)('roles'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a role (proxied from rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RolesProxyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('roles'),
    (0, swagger_1.ApiOperation)({ summary: 'List roles (proxied from rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('roles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a role by ID (proxied from rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolesProxyController.prototype, "get", null);
__decorate([
    (0, common_1.Put)('roles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a role (proxied from rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RolesProxyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('roles/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a role (proxied from rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolesProxyController.prototype, "delete", null);
exports.RolesProxyController = RolesProxyController = __decorate([
    (0, swagger_1.ApiTags)('roles-proxy'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_proxy_service_1.UsersProxyService])
], RolesProxyController);
//# sourceMappingURL=roles-proxy.controller.js.map