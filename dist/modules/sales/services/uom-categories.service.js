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
exports.UomCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const node_crypto_1 = require("node:crypto");
const typeorm_2 = require("typeorm");
const mappers_1 = require("../../../shared/domain/mappers");
const uom_category_orm_entity_1 = require("../entities/uom-category.orm-entity");
let UomCategoriesService = class UomCategoriesService {
    uomCategoryRepository;
    inMemory = new Map();
    constructor(uomCategoryRepository) {
        this.uomCategoryRepository = uomCategoryRepository;
    }
    async list(query, organizationId) {
        if (!this.uomCategoryRepository) {
            let items = [...this.inMemory.values()].filter((item) => item.organizationId === organizationId);
            if (query.search) {
                const search = query.search.toLowerCase();
                items = items.filter((item) => item.name.toLowerCase().includes(search) || (item.code?.toLowerCase().includes(search) ?? false));
            }
            return { data: items.slice(query.offset, query.offset + query.limit), total: items.length };
        }
        const qb = this.uomCategoryRepository
            .createQueryBuilder('category')
            .where('category.organization_id = :organizationId', { organizationId })
            .orderBy('category.name', 'ASC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(category.name ILIKE :search OR category.code ILIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        const [items, total] = await qb.getManyAndCount();
        return { data: items.map(mappers_1.toUomCategoryType), total };
    }
    async get(id, organizationId) {
        if (!this.uomCategoryRepository) {
            const item = this.inMemory.get(id);
            if (!item || item.organizationId !== organizationId) {
                throw new common_1.NotFoundException('UOM category not found');
            }
            return item;
        }
        const item = await this.uomCategoryRepository.findOne({ where: { id, organizationId } });
        if (!item) {
            throw new common_1.NotFoundException('UOM category not found');
        }
        return (0, mappers_1.toUomCategoryType)(item);
    }
    async create(payload, organizationId) {
        if (!this.uomCategoryRepository) {
            const now = new Date().toISOString();
            const record = {
                id: (0, node_crypto_1.randomUUID)(),
                organizationId,
                code: payload.code ?? null,
                name: payload.name,
                createdAt: now,
                updatedAt: now,
            };
            this.inMemory.set(record.id, record);
            return record;
        }
        const entity = this.uomCategoryRepository.create({
            organizationId,
            code: payload.code ?? null,
            name: payload.name,
        });
        return (0, mappers_1.toUomCategoryType)(await this.uomCategoryRepository.save(entity));
    }
    async update(id, payload, organizationId) {
        if (!this.uomCategoryRepository) {
            const existing = this.inMemory.get(id);
            if (!existing || existing.organizationId !== organizationId) {
                throw new common_1.NotFoundException('UOM category not found');
            }
            const updated = {
                ...existing,
                code: payload.code === undefined ? existing.code : payload.code ?? null,
                name: payload.name ?? existing.name,
                updatedAt: new Date().toISOString(),
            };
            this.inMemory.set(id, updated);
            return updated;
        }
        const existing = await this.uomCategoryRepository.findOne({ where: { id, organizationId } });
        if (!existing) {
            throw new common_1.NotFoundException('UOM category not found');
        }
        if (payload.code !== undefined)
            existing.code = payload.code ?? null;
        if (payload.name !== undefined)
            existing.name = payload.name;
        return (0, mappers_1.toUomCategoryType)(await this.uomCategoryRepository.save(existing));
    }
};
exports.UomCategoriesService = UomCategoriesService;
exports.UomCategoriesService = UomCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, typeorm_1.InjectRepository)(uom_category_orm_entity_1.UomCategoryOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UomCategoriesService);
//# sourceMappingURL=uom-categories.service.js.map