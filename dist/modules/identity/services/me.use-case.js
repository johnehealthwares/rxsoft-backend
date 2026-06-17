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
exports.MeUseCase = void 0;
const common_1 = require("@nestjs/common");
const identity_di_tokens_1 = require("./identity.di-tokens");
const permission_data_1 = require("./permission.data");
let MeUseCase = class MeUseCase {
    userRepository;
    roleRepository;
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async execute(userId, organizationId) {
        const user = await this.userRepository.findById(userId, organizationId);
        const roleCodes = user?.roleCodes ?? [];
        const roles = await this.roleRepository.listByCodes(roleCodes, organizationId);
        const permissions = [...new Set(roles.flatMap((r) => r.permissionCodes))];
        const modules = (0, permission_data_1.getUserModules)(permissions, roleCodes);
        return {
            id: userId,
            username: user?.username ?? 'unknown',
            phone: user?.phone,
            roles: roleCodes,
            permissions,
            modules,
        };
    }
};
exports.MeUseCase = MeUseCase;
exports.MeUseCase = MeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(identity_di_tokens_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(identity_di_tokens_1.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], MeUseCase);
//# sourceMappingURL=me.use-case.js.map