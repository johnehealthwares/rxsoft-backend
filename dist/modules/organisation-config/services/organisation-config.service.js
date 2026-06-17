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
exports.OrganisationConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organisation_config_orm_entity_1 = require("../entities/organisation-config.orm-entity");
function toType(entity) {
    return {
        id: entity.id,
        organizationId: entity.organizationId,
        posHeader: entity.posHeader,
        defaultLoginTimeoutMinutes: entity.defaultLoginTimeoutMinutes,
        defaultAllowPos: entity.defaultAllowPos,
        defaultAllowA4Print: entity.defaultAllowA4Print,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
    };
}
let OrganisationConfigService = class OrganisationConfigService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getOrCreate(organizationId) {
        let entity = await this.repo.findOne({ where: { organizationId } });
        if (!entity) {
            entity = this.repo.create({ organizationId });
            entity = await this.repo.save(entity);
        }
        return toType(entity);
    }
    async update(organizationId, payload) {
        let entity = await this.repo.findOne({ where: { organizationId } });
        if (!entity) {
            entity = this.repo.create({ organizationId });
        }
        if (payload.posHeader !== undefined)
            entity.posHeader = payload.posHeader;
        if (payload.defaultLoginTimeoutMinutes !== undefined)
            entity.defaultLoginTimeoutMinutes = payload.defaultLoginTimeoutMinutes;
        if (payload.defaultAllowPos !== undefined)
            entity.defaultAllowPos = payload.defaultAllowPos;
        if (payload.defaultAllowA4Print !== undefined)
            entity.defaultAllowA4Print = payload.defaultAllowA4Print;
        const saved = await this.repo.save(entity);
        return toType(saved);
    }
};
exports.OrganisationConfigService = OrganisationConfigService;
exports.OrganisationConfigService = OrganisationConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organisation_config_orm_entity_1.OrganisationConfigOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrganisationConfigService);
//# sourceMappingURL=organisation-config.service.js.map