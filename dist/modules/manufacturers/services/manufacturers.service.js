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
exports.ManufacturersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
const mappers_1 = require("../../../shared/domain/mappers");
const manufacturer_orm_entity_1 = require("../entities/manufacturer.orm-entity");
const code_validation_1 = require("../../../shared/utils/code-validation");
let ManufacturersService = class ManufacturersService {
    manufacturerRepository;
    constructor(manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }
    async list(query, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const qb = this.manufacturerRepository
            .createQueryBuilder('manufacturer')
            .where('manufacturer.organization_id = :organizationId', { organizationId })
            .andWhere('manufacturer.deleted_at IS NULL')
            .orderBy('manufacturer.updated_at', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(manufacturer.code ILIKE :search OR manufacturer.name ILIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toManufacturerType), total };
    }
    async getLastCreated(organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const entity = await this.manufacturerRepository.findOne({
            where: { organizationId, deletedAt: (0, typeorm_2.IsNull)() },
            order: { createdAt: 'DESC' },
        });
        if (!entity)
            return null;
        return { id: entity.id, code: entity.code ?? entity.name, createdAt: entity.createdAt.toISOString() };
    }
    async get(id, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const manufacturer = await this.manufacturerRepository.findOne({
            where: { id, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (!manufacturer)
            throw new common_1.NotFoundException('Manufacturer not found');
        return (0, mappers_1.toManufacturerType)(manufacturer);
    }
    async create(payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        if (payload.code) {
            const last = await this.getLastCreated(organizationId);
            const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
                providedCode: payload.code,
                lastCode: last?.code,
                override: payload.overrideCodeValidation,
            });
            if (!valid) {
                throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
            }
        }
        const duplicate = await this.manufacturerRepository.findOne({
            where: { organizationId, name: payload.name, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (duplicate)
            throw new common_1.BadRequestException('Manufacturer name already exists');
        const entity = this.manufacturerRepository.create({
            organizationId,
            code: payload.code ?? null,
            name: payload.name,
        });
        const saved = await this.manufacturerRepository.save(entity);
        return (0, mappers_1.toManufacturerType)(saved);
    }
    async update(id, payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const manufacturer = await this.manufacturerRepository.findOne({
            where: { id, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (!manufacturer)
            throw new common_1.NotFoundException('Manufacturer not found');
        if (payload.name && payload.name !== manufacturer.name) {
            const duplicate = await this.manufacturerRepository.findOne({
                where: { organizationId, name: payload.name, deletedAt: (0, typeorm_2.IsNull)() },
            });
            if (duplicate)
                throw new common_1.BadRequestException('Manufacturer name already exists');
            manufacturer.name = payload.name;
        }
        if (payload.code !== undefined)
            manufacturer.code = payload.code;
        const saved = await this.manufacturerRepository.save(manufacturer);
        return (0, mappers_1.toManufacturerType)(saved);
    }
    async remove(id, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const result = await this.manufacturerRepository.softDelete({ id, organizationId });
        if (!result.affected)
            throw new common_1.NotFoundException('Manufacturer not found');
    }
};
exports.ManufacturersService = ManufacturersService;
exports.ManufacturersService = ManufacturersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(manufacturer_orm_entity_1.ManufacturerOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ManufacturersService);
//# sourceMappingURL=manufacturers.service.js.map