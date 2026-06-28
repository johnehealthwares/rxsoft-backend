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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mappers_1 = require("../../../shared/domain/mappers");
const organization_orm_entity_1 = require("../entities/organization.orm-entity");
const code_validation_1 = require("../../../shared/utils/code-validation");
let OrganizationsService = class OrganizationsService {
    organizationRepository;
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
    }
    async list(query) {
        const qb = this.organizationRepository
            .createQueryBuilder('organization')
            .where('organization.deleted_at IS NULL')
            .orderBy('organization.updated_at', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(organization.code ILIKE :search OR organization.name ILIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toOrganizationType), total };
    }
    async get(id) {
        const organization = await this.organizationRepository.findOne({ where: { id, deletedAt: (0, typeorm_2.IsNull)() } });
        if (!organization)
            throw new common_1.NotFoundException('Organization not found');
        return (0, mappers_1.toOrganizationType)(organization);
    }
    async create(payload) {
        const last = await this.organizationRepository.findOne({
            where: { deletedAt: (0, typeorm_2.IsNull)() },
            order: { createdAt: 'DESC' },
            select: ['code'],
        });
        const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
            providedCode: payload.code,
            lastCode: last?.code,
            override: payload.overrideCodeValidation,
        });
        if (!valid) {
            throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
        }
        const duplicate = await this.organizationRepository.findOne({
            where: { code: payload.code, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (duplicate)
            throw new common_1.BadRequestException('Organization code already exists');
        const entity = this.organizationRepository.create({
            code: payload.code,
            name: payload.name,
            isActive: payload.isActive ?? true,
        });
        const saved = await this.organizationRepository.save(entity);
        return (0, mappers_1.toOrganizationType)(saved);
    }
    async update(id, payload) {
        const organization = await this.organizationRepository.findOne({ where: { id, deletedAt: (0, typeorm_2.IsNull)() } });
        if (!organization)
            throw new common_1.NotFoundException('Organization not found');
        if (payload.code && payload.code !== organization.code) {
            const duplicate = await this.organizationRepository.findOne({
                where: { code: payload.code, deletedAt: (0, typeorm_2.IsNull)() },
            });
            if (duplicate)
                throw new common_1.BadRequestException('Organization code already exists');
            organization.code = payload.code;
        }
        if (payload.name !== undefined)
            organization.name = payload.name;
        if (payload.isActive !== undefined)
            organization.isActive = payload.isActive;
        const saved = await this.organizationRepository.save(organization);
        return (0, mappers_1.toOrganizationType)(saved);
    }
    async remove(id) {
        const result = await this.organizationRepository.softDelete({ id });
        if (!result.affected)
            throw new common_1.NotFoundException('Organization not found');
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_orm_entity_1.OrganizationOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map