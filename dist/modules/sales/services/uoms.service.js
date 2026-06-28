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
exports.UomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const node_crypto_1 = require("node:crypto");
const typeorm_2 = require("typeorm");
const mappers_1 = require("../../../shared/domain/mappers");
const uom_orm_entity_1 = require("../entities/uom.orm-entity");
const code_validation_1 = require("../../../shared/utils/code-validation");
const list_1 = require("../../../database/list");
let UomsService = class UomsService {
    uomRepository;
    inMemory = new Map();
    constructor(uomRepository) {
        this.uomRepository = uomRepository;
    }
    async list(query, organizationId) {
        if (!this.uomRepository) {
            let items = [...this.inMemory.values()].filter((item) => item.organizationId === organizationId);
            if (query.search) {
                const s = query.search.toLowerCase();
                items = items.filter((item) => item.name.toLowerCase().includes(s) ||
                    (item.code ? item.code.toLowerCase().includes(s) : false));
            }
            if (query.uomType) {
                items = items.filter((item) => item.uomType === query.uomType);
            }
            if (typeof query.isActive === 'boolean') {
                items = items.filter((item) => item.isActive === query.isActive);
            }
            return { data: items.slice(query.offset, query.offset + query.limit), total: items.length };
        }
        const qb = this.uomRepository
            .createQueryBuilder('uom')
            .leftJoinAndSelect('uom.category', 'category')
            .where('uom.organization_id = :organizationId', { organizationId });
        if (query.search) {
            try {
                const filters = JSON.parse(query.search);
                await (0, list_1.applyFilters)(qb, 'uom', filters);
            }
            catch {
                qb.andWhere('(uom.code ILIKE :search OR uom.name ILIKE :search)', { search: `%${query.search}%` });
            }
        }
        qb
            .skip(query.offset)
            .take(query.limit);
        if (query.uomType) {
            qb.andWhere('uom.uom_type = :uomType', { uomType: query.uomType });
        }
        if (typeof query.isActive === 'boolean') {
            qb.andWhere('uom.is_active = :isActive', { isActive: query.isActive });
        }
        const [items, total] = await qb.getManyAndCount();
        return { data: items.map(mappers_1.toUomType), total };
    }
    async getById(id, organizationId) {
        if (!this.uomRepository) {
            const item = this.inMemory.get(id);
            if (!item || item.organizationId !== organizationId) {
                throw new common_1.NotFoundException('UOM not found');
            }
            return item;
        }
        const item = await this.uomRepository.findOne({ where: { id, organizationId } });
        if (!item) {
            throw new common_1.NotFoundException('UOM not found');
        }
        return (0, mappers_1.toUomType)(item);
    }
    async create(payload, organizationId) {
        if (payload.code) {
            const last = await this.uomRepository.findOne({
                where: { organizationId },
                order: { createdAt: 'DESC' },
                select: ['code'],
            });
            const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
                providedCode: payload.code,
                lastCode: last?.code ?? undefined,
                override: payload.overrideCodeValidation,
            });
            if (!valid) {
                throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
            }
        }
        if (!this.uomRepository) {
            const now = new Date();
            const record = {
                id: (0, node_crypto_1.randomUUID)(),
                organizationId,
                categoryId: payload.categoryId ?? null,
                category: null,
                code: payload.code ?? null,
                name: payload.name,
                uomType: payload.uomType ?? 'reference',
                factor: payload.factor ?? 1,
                rounding: payload.rounding ?? 0.01,
                isActive: payload.isActive ?? true,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
            };
            this.inMemory.set(record.id, record);
            return record;
        }
        const entity = this.uomRepository.create({
            organizationId,
            categoryId: payload.categoryId ?? null,
            code: payload.code ?? null,
            name: payload.name,
            uomType: payload.uomType ?? 'reference',
            factor: payload.factor ?? 1,
            rounding: payload.rounding ?? 0.01,
            isActive: payload.isActive ?? true,
        });
        await this.validateReferenceUnit(entity.categoryId, entity.uomType, entity.id);
        const savedEntity = await this.uomRepository.save(entity);
        return (0, mappers_1.toUomType)(savedEntity);
    }
    async update(id, payload, organizationId) {
        if (!this.uomRepository) {
            const existing = this.inMemory.get(id);
            if (!existing || existing.organizationId !== organizationId) {
                throw new common_1.NotFoundException('UOM not found');
            }
            const updated = {
                ...existing,
                code: payload.code ?? existing.code,
                name: payload.name ?? existing.name,
                categoryId: payload.categoryId === undefined ? existing.categoryId : payload.categoryId,
                uomType: payload.uomType ?? existing.uomType,
                factor: payload.factor ?? existing.factor,
                rounding: payload.rounding ?? existing.rounding,
                isActive: payload.isActive ?? existing.isActive,
                updatedAt: new Date().toISOString(),
            };
            this.inMemory.set(id, updated);
            return updated;
        }
        const existing = await this.uomRepository.findOne({ where: { id, organizationId } });
        if (!existing) {
            throw new common_1.NotFoundException('UOM not found');
        }
        if (payload.code !== undefined)
            existing.code = payload.code;
        if (payload.name !== undefined)
            existing.name = payload.name;
        if (payload.categoryId !== undefined)
            existing.categoryId = payload.categoryId;
        if (payload.uomType !== undefined)
            existing.uomType = payload.uomType;
        if (payload.factor !== undefined)
            existing.factor = payload.factor;
        if (payload.rounding !== undefined)
            existing.rounding = payload.rounding;
        if (payload.isActive !== undefined)
            existing.isActive = payload.isActive;
        await this.validateReferenceUnit(payload.categoryId, existing.uomType, existing.id);
        const savedEntity = await this.uomRepository.save(existing);
        return (0, mappers_1.toUomType)(savedEntity);
    }
    async validateReferenceUnit(categoryId, uomType, currentUomId) {
        if (!categoryId || !this.uomRepository)
            return;
        const referenceUom = await this.uomRepository.findOne({
            where: {
                categoryId,
                uomType: 'reference',
            },
        });
        if (uomType !== 'reference') {
            if (!referenceUom) {
                throw new common_1.BadRequestException('A reference unit must exist before creating conversion units.');
            }
            return;
        }
        if (referenceUom &&
            referenceUom.id !== currentUomId) {
            throw new common_1.BadRequestException('Only one reference unit is allowed per category.');
        }
    }
};
exports.UomsService = UomsService;
exports.UomsService = UomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, typeorm_1.InjectRepository)(uom_orm_entity_1.UomOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UomsService);
//# sourceMappingURL=uoms.service.js.map