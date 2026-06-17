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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_response_dto_1 = require("../dto/auth-response.dto");
const login_dto_1 = require("../dto/login.dto");
const refresh_token_dto_1 = require("../dto/refresh-token.dto");
const me_response_dto_1 = require("../dto/me-response.dto");
const login_use_case_1 = require("../services/login.use-case");
const refresh_token_use_case_1 = require("../services/refresh-token.use-case");
const me_use_case_1 = require("../services/me.use-case");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
let AuthController = class AuthController {
    loginUseCase;
    refreshTokenUseCase;
    meUseCase;
    constructor(loginUseCase, refreshTokenUseCase, meUseCase) {
        this.loginUseCase = loginUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.meUseCase = meUseCase;
    }
    login(payload) {
        return this.loginUseCase.execute(payload);
    }
    refreshToken(payload) {
        return this.refreshTokenUseCase.execute(payload);
    }
    me(currentUser) {
        return this.meUseCase.execute(currentUser.sub, currentUser.organizationId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, audit_action_decorator_1.AuditAction)('identity.auth.login'),
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate and issue access/refresh tokens' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: auth_response_dto_1.AuthResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, audit_action_decorator_1.AuditAction)('identity.auth.refresh_token'),
    (0, swagger_1.ApiOperation)({ summary: 'Rotate refresh token and issue a new token pair' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: auth_response_dto_1.AuthResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile with accessible modules' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: me_response_dto_1.MeResponseDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [login_use_case_1.LoginUseCase,
        refresh_token_use_case_1.RefreshTokenUseCase,
        me_use_case_1.MeUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map