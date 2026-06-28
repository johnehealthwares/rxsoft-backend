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
exports.UpdateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../domains/user.entity");
const user_pos_config_service_1 = require("../../user-pos-config/services/user-pos-config.service");
const identity_di_tokens_1 = require("./identity.di-tokens");
let UpdateUserUseCase = class UpdateUserUseCase {
    userRepository;
    passwordHasher;
    roleRepository;
    userPosConfigService;
    constructor(userRepository, passwordHasher, roleRepository, userPosConfigService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.roleRepository = roleRepository;
        this.userPosConfigService = userPosConfigService;
    }
    async execute(userId, payload, organizationId) {
        const user = await this.userRepository.findById(userId, organizationId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const roleCodes = payload.roleCodes ?? user.roleCodes;
        let roles = user.roles;
        if (payload.roleCodes) {
            roles = await this.roleRepository.listByCodes(roleCodes, organizationId);
            if (roles.length !== roleCodes.length) {
                throw new common_1.BadRequestException('One or more roles are invalid');
            }
        }
        const passwordHash = payload.password
            ? await this.passwordHasher.hash(payload.password)
            : user.passwordHash;
        const updatedUser = new user_entity_1.User(userId, organizationId, payload.username ?? user.username, passwordHash, payload.isActive ?? user.isActive, roleCodes, roles);
        await this.userRepository.update(updatedUser, organizationId);
        if (payload.posConfig) {
            await this.userPosConfigService.update(userId, organizationId, payload.posConfig);
        }
        return updatedUser;
    }
};
exports.UpdateUserUseCase = UpdateUserUseCase;
exports.UpdateUserUseCase = UpdateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(identity_di_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(identity_di_tokens_1.PASSWORD_HASHER)),
    __param(2, (0, common_1.Inject)(identity_di_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, user_pos_config_service_1.UserPosConfigService])
], UpdateUserUseCase);
//# sourceMappingURL=update-user.use-case.js.map