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
exports.UserPosConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organisation_config_service_1 = require("../../organisation-config/services/organisation-config.service");
const user_pos_config_orm_entity_1 = require("../entities/user-pos-config.orm-entity");
function toType(entity) {
    return {
        id: entity.id,
        userId: entity.userId,
        organizationId: entity.organizationId,
        stockLocationId: entity.stockLocationId,
        storeId: entity.storeId,
        allowA4Print: entity.allowA4Print,
        allowPos: entity.allowPos,
        loginTimeoutMinutes: entity.loginTimeoutMinutes,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
    };
}
let UserPosConfigService = class UserPosConfigService {
    repo;
    orgConfigService;
    constructor(repo, orgConfigService) {
        this.repo = repo;
        this.orgConfigService = orgConfigService;
    }
    async getOrCreate(userId, organizationId) {
        let entity = await this.repo.findOne({ where: { userId, organizationId } });
        if (!entity) {
            const orgConfig = await this.orgConfigService.getOrCreate(organizationId);
            entity = this.repo.create({
                userId,
                organizationId,
                allowA4Print: orgConfig.defaultAllowA4Print,
                allowPos: orgConfig.defaultAllowPos,
            });
            entity = await this.repo.save(entity);
        }
        return toType(entity);
    }
    async update(userId, organizationId, payload) {
        let entity = await this.repo.findOne({ where: { userId, organizationId } });
        if (!entity) {
            entity = this.repo.create({ userId, organizationId });
        }
        if (payload.stockLocationId !== undefined)
            entity.stockLocationId = payload.stockLocationId;
        if (payload.storeId !== undefined)
            entity.storeId = payload.storeId;
        if (payload.allowA4Print !== undefined)
            entity.allowA4Print = payload.allowA4Print;
        if (payload.allowPos !== undefined)
            entity.allowPos = payload.allowPos;
        if (payload.loginTimeoutMinutes !== undefined)
            entity.loginTimeoutMinutes = payload.loginTimeoutMinutes;
        const saved = await this.repo.save(entity);
        return toType(saved);
    }
};
exports.UserPosConfigService = UserPosConfigService;
exports.UserPosConfigService = UserPosConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_pos_config_orm_entity_1.UserPosConfigOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        organisation_config_service_1.OrganisationConfigService])
], UserPosConfigService);
//# sourceMappingURL=user-pos-config.service.js.map