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
exports.UsersProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const user_pos_config_service_1 = require("../user-pos-config/services/user-pos-config.service");
const users_proxy_service_1 = require("./users-proxy.service");
let UsersProxyController = class UsersProxyController {
    proxy;
    posConfigService;
    constructor(proxy, posConfigService) {
        this.proxy = proxy;
        this.posConfigService = posConfigService;
    }
    async list(auth, query) {
        return this.proxy.list(auth?.replace('Bearer ', '') ?? '', query);
    }
    async get(auth, id) {
        return this.proxy.findOne(auth?.replace('Bearer ', '') ?? '', id);
    }
    async update(auth, id, payload, currentUser) {
        const token = auth?.replace('Bearer ', '') ?? '';
        const { posConfig, ...identityPayload } = payload;
        const result = await this.proxy.update(token, id, identityPayload);
        if (posConfig) {
            await this.posConfigService.update(id, currentUser.organizationId, posConfig);
        }
        return result;
    }
    async updateViaPost(auth, id, payload, currentUser) {
        const token = auth?.replace('Bearer ', '') ?? '';
        const { posConfig, ...identityPayload } = payload;
        const result = await this.proxy.update(token, id, identityPayload);
        if (posConfig) {
            await this.posConfigService.update(id, currentUser.organizationId, posConfig);
        }
        return result;
    }
};
exports.UsersProxyController = UsersProxyController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List users (proxied from rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID (proxied from rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersProxyController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update user (proxied to identity; posConfig saved locally)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersProxyController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update user via POST (proxied to identity; posConfig saved locally)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersProxyController.prototype, "updateViaPost", null);
exports.UsersProxyController = UsersProxyController = __decorate([
    (0, swagger_1.ApiTags)('users-proxy'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_proxy_service_1.UsersProxyService,
        user_pos_config_service_1.UserPosConfigService])
], UsersProxyController);
//# sourceMappingURL=users-proxy.controller.js.map