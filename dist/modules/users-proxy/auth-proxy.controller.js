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
exports.AuthProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_proxy_service_1 = require("./users-proxy.service");
let AuthProxyController = class AuthProxyController {
    proxy;
    constructor(proxy) {
        this.proxy = proxy;
    }
    async login(body) {
        return this.proxy.login(body.username, body.password);
    }
    async refreshToken(body) {
        return this.proxy.refreshToken(body.refreshToken);
    }
    async me(auth) {
        return this.proxy.me(auth?.replace('Bearer ', '') ?? '');
    }
};
exports.AuthProxyController = AuthProxyController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login (proxied to rxsoft-identity)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthProxyController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh token (proxied to rxsoft-identity)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthProxyController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user (proxied to rxsoft-identity)' }),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthProxyController.prototype, "me", null);
exports.AuthProxyController = AuthProxyController = __decorate([
    (0, swagger_1.ApiTags)('auth-proxy'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_proxy_service_1.UsersProxyService])
], AuthProxyController);
//# sourceMappingURL=auth-proxy.controller.js.map