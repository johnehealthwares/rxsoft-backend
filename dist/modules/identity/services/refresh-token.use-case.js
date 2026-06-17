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
exports.RefreshTokenUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_pos_config_service_1 = require("../../user-pos-config/services/user-pos-config.service");
const organisation_config_service_1 = require("../../organisation-config/services/organisation-config.service");
const identity_di_tokens_1 = require("./identity.di-tokens");
let RefreshTokenUseCase = class RefreshTokenUseCase {
    refreshTokenRepository;
    passwordHasher;
    tokenIssuer;
    userRepository;
    userPosConfigService;
    orgConfigService;
    constructor(refreshTokenRepository, passwordHasher, tokenIssuer, userRepository, userPosConfigService, orgConfigService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordHasher = passwordHasher;
        this.tokenIssuer = tokenIssuer;
        this.userRepository = userRepository;
        this.userPosConfigService = userPosConfigService;
        this.orgConfigService = orgConfigService;
    }
    async execute(payload) {
        const decoded = await this.tokenIssuer.verifyRefreshToken(payload.refreshToken);
        const user = await this.userRepository.findById(decoded.sub);
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const tokenHash = await this.passwordHasher.hash(payload.refreshToken);
        const isValid = await this.refreshTokenRepository.isValid(user.id, tokenHash);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        await this.refreshTokenRepository.revoke(user.id, tokenHash);
        let loginTimeoutMinutes;
        try {
            const userConfig = await this.userPosConfigService.getOrCreate(user.id, user.organizationId);
            loginTimeoutMinutes = userConfig.loginTimeoutMinutes ?? undefined;
        }
        catch {
        }
        if (!loginTimeoutMinutes) {
            try {
                const orgConfig = await this.orgConfigService.getOrCreate(user.organizationId);
                loginTimeoutMinutes = orgConfig.defaultLoginTimeoutMinutes;
            }
            catch {
            }
        }
        return this.tokenIssuer.issuePair({
            sub: decoded.sub,
            organizationId: user.organizationId,
            username: decoded.username,
            roles: decoded.roles,
            permissions: decoded.permissions,
        }, loginTimeoutMinutes);
    }
};
exports.RefreshTokenUseCase = RefreshTokenUseCase;
exports.RefreshTokenUseCase = RefreshTokenUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(identity_di_tokens_1.REFRESH_TOKEN_REPOSITORY)),
    __param(1, (0, common_1.Inject)(identity_di_tokens_1.PASSWORD_HASHER)),
    __param(2, (0, common_1.Inject)(identity_di_tokens_1.TOKEN_ISSUER)),
    __param(3, (0, common_1.Inject)(identity_di_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, user_pos_config_service_1.UserPosConfigService,
        organisation_config_service_1.OrganisationConfigService])
], RefreshTokenUseCase);
//# sourceMappingURL=refresh-token.use-case.js.map