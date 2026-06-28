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
exports.CreateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const user_entity_1 = require("../domains/user.entity");
const user_pos_config_service_1 = require("../../user-pos-config/services/user-pos-config.service");
const identity_di_tokens_1 = require("./identity.di-tokens");
let CreateUserUseCase = class CreateUserUseCase {
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
    async execute(payload, organizationId) {
        const existing = await this.userRepository.findByUsername(payload.username, organizationId);
        if (existing) {
            throw new common_1.BadRequestException('Username already exists');
        }
        const roleCodes = payload.roleCodes ?? ['cashier'];
        const roles = await this.roleRepository.listByCodes(roleCodes, organizationId);
        if (roles.length !== roleCodes.length) {
            throw new common_1.BadRequestException('One or more roles are invalid');
        }
        const passwordHash = await this.passwordHasher.hash(payload.password);
        const user = new user_entity_1.User((0, node_crypto_1.randomUUID)(), organizationId, payload.username, passwordHash, true, roleCodes, roles, payload.phone);
        const created = await this.userRepository.create(user);
        if (payload.posConfig) {
            await this.userPosConfigService.update(created.id, organizationId, payload.posConfig);
        }
        return created;
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(identity_di_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(identity_di_tokens_1.PASSWORD_HASHER)),
    __param(2, (0, common_1.Inject)(identity_di_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, user_pos_config_service_1.UserPosConfigService])
], CreateUserUseCase);
//# sourceMappingURL=create-user.use-case.js.map