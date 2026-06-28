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
exports.TypeormItemRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_orm_entity_1 = require("../entities/item.orm-entity");
const item_category_orm_entity_1 = require("../entities/item-category.orm-entity");
const catalog_mapper_1 = require("../mappers/catalog.mapper");
const entities_1 = require("../../sales/entities");
const list_1 = require("../../../database/list");
const SEARCH_MAP = {
    name: 'product.name',
    code: 'product.code',
    barcode: 'product.barcode',
    categoryName: 'category.name',
    categoryCode: 'category.code',
};
let TypeormItemRepository = class TypeormItemRepository {
    repository;
    categoryRepository;
    uomRepository;
    constructor(repository, categoryRepository, uomRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.uomRepository = uomRepository;
    }
    async list(query) {
        const qb = this.repository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.baseUom', 'baseUom')
            .leftJoinAndSelect('product.purchaseUom', 'purchaseUom')
            .leftJoinAndSelect('product.saleUom', 'saleUom')
            .where('product.organization_id = :organizationId', { organizationId: query.organizationId });
        if (query.search) {
            if (query.search.includes('{')) {
                const filters = JSON.parse(query.search);
                await (0, list_1.applyFilters)(qb, 'product', filters);
            }
            else {
                qb.andWhere('product.name ILIKE :productName', { productName: `%${query.search}%` });
            }
        }
        qb
            .skip(query.offset)
            .take(query.limit)
            .orderBy(`product.${query.sortBy === 'createdAt' ? 'createdAt' : query.sortBy}`, query.sortOrder.toUpperCase())
            .addOrderBy('product.isActive', 'DESC');
        if (query.categoryCode) {
            qb.andWhere('LOWER(category.code) = LOWER(:categoryCode)', {
                categoryCode: query.categoryCode,
            });
        }
        const [items, total] = await qb.getManyAndCount();
        return {
            items: items.map(catalog_mapper_1.CatalogMapper.toDomainItem.bind(catalog_mapper_1.CatalogMapper)),
            total,
        };
    }
    async findById(id, organizationId, includeAll) {
        const query = {
            where: { id, organizationId },
            relations: {
                category: true,
                baseUom: true,
                purchaseUom: true,
                saleUom: true,
            },
        };
        const item = await this.repository.findOne(query);
        return item ? catalog_mapper_1.CatalogMapper.toDomainItem(item) : null;
    }
    async findByCode(code, organizationId) {
        const item = await this.repository.findOne({
            where: { code, organizationId, isActive: true },
            relations: {
                category: true,
                baseUom: true,
                purchaseUom: true,
                saleUom: true,
            },
        });
        return item ? catalog_mapper_1.CatalogMapper.toDomainItem(item) : null;
    }
    async findByBarcode(barcode, organizationId) {
        const item = await this.repository.findOne({
            where: { barcode, organizationId, isActive: true },
            relations: {
                category: true,
                baseUom: true,
                purchaseUom: true,
                saleUom: true,
            },
        });
        return item ? catalog_mapper_1.CatalogMapper.toDomainItem(item) : null;
    }
    async findCategoryById(id, organizationId) {
        const item = await this.categoryRepository.findOne({ where: { id, organizationId } });
        return item ? catalog_mapper_1.CatalogMapper.toDomainItemCategory(item) : null;
    }
    async findUomById(id, organizationId) {
        const item = await this.uomRepository.findOne({
            where: { id, organizationId },
            select: ['id', 'code', 'name', 'factor', 'uomType', 'isActive', 'rounding'],
        });
        return item ? { id: item.id, code: item.code, uomType: item.uomType, rounding: item.rounding, isActive: item.isActive, factor: item.factor, name: item.name } : null;
    }
    async listCategories(query) {
        const qb = this.categoryRepository
            .createQueryBuilder('category')
            .where('category.organization_id = :organizationId', { organizationId: query.organizationId })
            .andWhere('category.deleted_at IS NULL')
            .orderBy('category.name', 'ASC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(category.name ILIKE :search OR category.code ILIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        const [items, total] = await qb.getManyAndCount();
        return {
            items: items.map((item) => ({ id: item.id, code: item.code, name: item.name })),
            total,
        };
    }
    async listUoms(query) {
        const qb = this.uomRepository
            .createQueryBuilder('uom')
            .where('uom.organization_id = :organizationId', { organizationId: query.organizationId })
            .andWhere('uom.is_active = :isActive', { isActive: true })
            .orderBy('uom.name', 'ASC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(uom.name ILIKE :search OR uom.code ILIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        const [items, total] = await qb.getManyAndCount();
        return {
            items: items.map((item) => ({ id: item.id, code: item.code, name: item.name, uomType: item.uomType, factor: item.factor, rounding: item.rounding, isActive: item.isActive })),
            total,
        };
    }
    async findLastCreated(organizationId) {
        const entity = await this.repository.findOne({
            where: { organizationId, isActive: true },
            order: { createdAt: 'DESC' },
            relations: {
                category: true,
                baseUom: true,
                purchaseUom: true,
                saleUom: true,
            },
        });
        return entity ? catalog_mapper_1.CatalogMapper.toDomainItem(entity) : null;
    }
    async getMetrics(query) {
        const applySearch = async (qb) => {
            if (query.search) {
                if (query.search.includes('{')) {
                    await (0, list_1.applyFilters)(qb, 'product', JSON.parse(query.search));
                }
                else {
                    qb.andWhere('(product.name ILIKE :search OR product.code ILIKE :search)', {
                        search: `%${query.search}%`,
                    });
                }
            }
            if (query.categoryCode) {
                qb.andWhere('LOWER(category.code) = LOWER(:categoryCode)', {
                    categoryCode: query.categoryCode,
                });
            }
        };
        const countWith = async (where, params) => {
            const qb = this.repository
                .createQueryBuilder('product')
                .leftJoin('product.category', 'category')
                .where('product.organization_id = :organizationId', { organizationId: query.organizationId });
            await applySearch(qb);
            if (where)
                qb.andWhere(where, params);
            return qb.getCount();
        };
        const total = await countWith();
        const active = await countWith('product.is_active = :isActive', { isActive: true });
        const inactive = await countWith('product.is_active = :isActive', { isActive: false });
        const noCategory = await countWith('(category.code IS NULL OR LOWER(category.code) = LOWER(:noCatCode))', { noCatCode: 'NOT FOUND' });
        const noGeneric = await countWith('product.generic_product_code IS NULL');
        return { total, active, inactive, noCategory, noGenericProductCode: noGeneric };
    }
    async save(product) {
        const category = await this.categoryRepository.findOneBy({
            id: product.category.id,
            organizationId: product.organizationId,
        });
        if (!category) {
            throw new Error('Invalid related references for item creation');
        }
        const entity = this.repository.create({
            id: product.id,
            organizationId: product.organizationId,
            code: product.code,
            name: product.name,
            genericProductCode: product.genericProductCode,
            baseUomId: product.baseUomId,
            purchaseUomId: product.purchaseUomId,
            saleUomId: product.saleUomId,
            barcode: product.barcode,
            trackLot: product.trackLot,
            trackExpiry: product.trackExpiry,
            shelfLifeDays: product.shelfLifeDays,
            isActive: product.isActive,
            category,
            baseUom: { id: product.baseUomId },
            purchaseUom: product.purchaseUomId ? { id: product.purchaseUomId } : null,
            saleUom: product.saleUomId ? { id: product.saleUomId } : null,
            imageUrl: product.imageUrl,
            smallImageUrl: product.smallImageUrl,
            mediumImageUrl: product.mediumImageUrl,
            largeImageUrl: product.largeImageUrl,
        });
        const saved = await this.repository.save(entity);
        return catalog_mapper_1.CatalogMapper.toDomainItem(saved);
    }
};
exports.TypeormItemRepository = TypeormItemRepository;
exports.TypeormItemRepository = TypeormItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(item_orm_entity_1.ItemOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(item_category_orm_entity_1.ItemCategoryOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.UomOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TypeormItemRepository);
//# sourceMappingURL=typeorm-item.repository.js.map