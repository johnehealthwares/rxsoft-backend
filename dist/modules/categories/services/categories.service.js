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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mappers_1 = require("../../../shared/domain/mappers");
const entities_1 = require("../../catalog/entities");
const code_validation_1 = require("../../../shared/utils/code-validation");
let CategoriesService = class CategoriesService {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async list(query, organizationId) {
        const qb = this.categoryRepository
            .createQueryBuilder('category')
            .leftJoinAndSelect('category.parent', 'parent')
            .where('category.organization_id = :organizationId', { organizationId })
            .andWhere('category.deleted_at IS NULL');
        if (query.search) {
            qb.andWhere('(category.code ILIKE :search OR category.name ILIKE :search)', { search: `%${query.search}%` });
        }
        qb.skip(query.offset).take(query.limit);
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toItemCategoryType), total };
    }
    async getLastCreated(organizationId) {
        const entity = await this.categoryRepository.findOne({
            where: { organizationId, deletedAt: (0, typeorm_2.IsNull)() },
            order: { createdAt: 'DESC' },
        });
        if (!entity)
            return null;
        return { id: entity.id, code: entity.code, createdAt: entity.createdAt.toISOString() };
    }
    async createCategory(payload, organizationId) {
        const last = await this.categoryRepository.findOne({
            where: { organizationId, deletedAt: (0, typeorm_2.IsNull)() },
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
        const duplicate = await this.categoryRepository.findOne({
            where: { code: payload.code, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (duplicate) {
            throw new common_1.BadRequestException('Category code already exists');
        }
        let parent = null;
        if (payload.parentId) {
            parent = await this.categoryRepository.findOne({
                where: { id: payload.parentId, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
            });
            if (!parent) {
                throw new common_1.BadRequestException('Parent category not found');
            }
        }
        const category = this.categoryRepository.create({
            organizationId,
            code: payload.code,
            name: payload.name,
            parent,
        });
        const savedCategory = await this.categoryRepository.save(category);
        const fullCategory = await this.categoryRepository.findOneOrFail({
            where: { id: savedCategory.id, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['parent'],
        });
        return (0, mappers_1.toItemCategoryType)(fullCategory);
    }
    async findById(id) {
        const category = await this.categoryRepository.findOne({ where: { id }, relations: ['parent'] });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return (0, mappers_1.toItemCategoryType)(category);
    }
    async updateCategory(id, payload, organizationId) {
        const category = await this.categoryRepository.findOne({
            where: { id, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['parent'],
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (payload.code && payload.code !== category.code) {
            const duplicate = await this.categoryRepository.findOne({
                where: { code: payload.code, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
            });
            if (duplicate) {
                throw new common_1.BadRequestException('Category code already exists');
            }
            category.code = payload.code;
        }
        if (payload.name !== undefined) {
            category.name = payload.name;
        }
        if (payload.parentId !== undefined) {
            if (!payload.parentId) {
                category.parent = null;
            }
            else {
                const parent = await this.categoryRepository.findOne({
                    where: { id: payload.parentId, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
                });
                if (!parent) {
                    throw new common_1.BadRequestException('Parent category not found');
                }
                category.parent = parent;
            }
        }
        const savedCategory = await this.categoryRepository.save(category);
        const fullCategory = await this.categoryRepository.findOneOrFail({
            where: { id: savedCategory.id, organizationId, deletedAt: (0, typeorm_2.IsNull)() },
            relations: ['parent'],
        });
        return (0, mappers_1.toItemCategoryType)(fullCategory);
    }
    async archive(id, organizationId) {
        const result = await this.categoryRepository.softDelete({ id, organizationId });
        if (!result.affected) {
            throw new common_1.NotFoundException('Category not found');
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ItemCategoryOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map