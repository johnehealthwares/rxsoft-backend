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
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_item_dto_1 = require("../dto/create-item.dto");
const replace_item_dto_1 = require("../dto/replace-item.dto");
const list_item_dependencies_dto_1 = require("../dto/list-item-dependencies.dto");
const list_items_dto_1 = require("../dto/list-items.dto");
const item_response_dto_1 = require("../dto/item-response.dto");
const create_item_use_case_1 = require("../services/create-item.use-case");
const get_item_use_case_1 = require("../services/get-item.use-case");
const list_item_dependencies_use_case_1 = require("../services/list-item-dependencies.use-case");
const list_items_use_case_1 = require("../services/list-items.use-case");
const item_orm_entity_1 = require("../entities/item.orm-entity");
const uom_orm_entity_1 = require("../../sales/entities/uom.orm-entity");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const update_item_use_case_1 = require("../services/update-item.use-case");
const patch_item_use_case_1 = require("../services/patch-item.use-case");
const patch_item_dto_1 = require("../dto/patch-item.dto");
const generic_drug_cache_service_1 = require("../../../services/generic-drug-cache.service");
const catalog_di_tokens_1 = require("../services/catalog.di-tokens");
let ItemsController = class ItemsController {
    listItemsUseCase;
    listItemDependenciesUseCase;
    getItemUseCase;
    createItemUseCase;
    updateItemUseCase;
    patchItemUseCase;
    genericDrugCache;
    itemRepo;
    uomRepo;
    itemRepository;
    constructor(listItemsUseCase, listItemDependenciesUseCase, getItemUseCase, createItemUseCase, updateItemUseCase, patchItemUseCase, genericDrugCache, itemRepo, uomRepo, itemRepository) {
        this.listItemsUseCase = listItemsUseCase;
        this.listItemDependenciesUseCase = listItemDependenciesUseCase;
        this.getItemUseCase = getItemUseCase;
        this.createItemUseCase = createItemUseCase;
        this.updateItemUseCase = updateItemUseCase;
        this.patchItemUseCase = patchItemUseCase;
        this.genericDrugCache = genericDrugCache;
        this.itemRepo = itemRepo;
        this.uomRepo = uomRepo;
        this.itemRepository = itemRepository;
    }
    toResponse(item) {
        const cached = item.genericProductCode
            ? this.genericDrugCache.getByCode(item.genericProductCode)
            : null;
        return {
            id: item.id,
            code: item.code,
            name: item.name,
            category: item.category && {
                id: item.category.id,
                code: item.category.code,
                name: item.category.name,
            },
            genericProductCode: item.genericProductCode,
            categoryId: item.categoryId,
            genericProduct: cached
                ? {
                    id: cached.id,
                    code: cached.code,
                    name: cached.name,
                    pharmaceutics: cached.pharmaceutics
                        ? {
                            code: cached.pharmaceutics.code,
                            clinicalName: cached.pharmaceutics.clinicalName ?? '',
                            drugClass: cached.pharmaceutics.drugClass ?? '',
                            pharmaceutics: cached.pharmaceutics.pharmaceutics ?? '',
                        }
                        : { code: '', clinicalName: '', drugClass: '', pharmaceutics: '' },
                    isPrescriptionRequired: cached.isPrescriptionRequired ?? false,
                    isControlledSubstance: cached.isControlledSubstance ?? false,
                }
                : null,
            baseUomId: item.baseUomId,
            purchaseUomId: item.purchaseUomId,
            saleUomId: item.saleUomId,
            baseUom: item.baseUom,
            purchaseUom: item.purchaseUom,
            saleUom: item.saleUom,
            barcode: item.barcode,
            trackLot: item.trackLot,
            trackExpiry: item.trackExpiry,
            shelfLifeDays: item.shelfLifeDays,
            isActive: item.isActive,
            imageUrl: item.imageUrl,
            smallImageUrl: item.smallImageUrl,
            mediumImageUrl: item.mediumImageUrl,
            largeImageUrl: item.largeImageUrl,
        };
    }
    async list(query, currentUser) {
        const result = await this.listItemsUseCase.execute(query, currentUser.organizationId);
        return {
            data: result.items.map((item) => this.toResponse(item)),
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            },
        };
    }
    async listCategories(query, currentUser) {
        const result = await this.listItemDependenciesUseCase.listCategories(query, currentUser.organizationId);
        return {
            data: result.items,
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async listGenericProducts(query, currentUser) {
        const result = await this.listItemDependenciesUseCase.listGenericProducts(query, currentUser.organizationId);
        return {
            data: result.items,
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async listUoms(query, currentUser) {
        const result = await this.listItemDependenciesUseCase.listUoms(query, currentUser.organizationId);
        return {
            data: result.items,
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async metrics(query, currentUser) {
        const metricsQuery = {
            organizationId: currentUser.organizationId,
            search: query.search,
            categoryCode: query.categoryCode,
        };
        return this.itemRepository.getMetrics(metricsQuery);
    }
    async get(itemId, currentUser) {
        const item = await this.getItemUseCase.execute(itemId, currentUser.organizationId);
        return this.toResponse(item);
    }
    async create(payload, currentUser) {
        const item = await this.createItemUseCase.execute(payload, currentUser.organizationId, currentUser.sub);
        return this.toResponse(item);
    }
    async replace(payload, currentUser, itemId) {
        const item = await this.updateItemUseCase.execute(itemId, payload, currentUser.organizationId, currentUser.sub);
        return this.toResponse(item);
    }
    async patch(payload, currentUser, itemId) {
        const item = await this.patchItemUseCase.execute(itemId, payload, currentUser.organizationId);
        return this.toResponse(item);
    }
    async listItemUoms(itemId, currentUser) {
        const item = await this.itemRepo.findOne({
            where: { id: itemId, organizationId: currentUser.organizationId },
            relations: ['baseUom'],
        });
        if (!item)
            return { data: [] };
        const baseUomCategoryId = item.baseUom?.categoryId;
        if (!baseUomCategoryId)
            return { data: [] };
        const uoms = await this.uomRepo.find({
            where: { categoryId: baseUomCategoryId, isActive: true },
            select: ['id', 'code', 'name', 'factor', 'uomType', 'rounding', 'isActive'],
        });
        return { data: uoms };
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'List items with pagination, filtering and sorting' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_items_dto_1.ListItemsDto, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('dependencies/categories'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'Search item categories by name or code' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_item_dependencies_dto_1.ListItemDependenciesDto, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "listCategories", null);
__decorate([
    (0, common_1.Get)('dependencies/generic-products'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'Search generic products by name or code' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_item_dependencies_dto_1.ListItemDependenciesDto, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "listGenericProducts", null);
__decorate([
    (0, common_1.Get)('dependencies/uoms'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'Search UOMs by name or code' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_item_dependencies_dto_1.ListItemDependenciesDto, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "listUoms", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get item metrics' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_items_dto_1.ListItemsDto, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "metrics", null);
__decorate([
    (0, common_1.Get)(':itemId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'cashier', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'Get item details by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: item_response_dto_1.ItemResponseDto }),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.item.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a catalog item' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: item_response_dto_1.ItemResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":itemId"),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.item.update'),
    (0, swagger_1.ApiOperation)({ summary: 'Replace a catalog item (full update)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: item_response_dto_1.ItemResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [replace_item_dto_1.ReplaceItemDto, Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(":itemId"),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist'),
    (0, audit_action_decorator_1.AuditAction)('catalog.item.patch'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially update a catalog item' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: item_response_dto_1.ItemResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patch_item_dto_1.PatchItemDto, Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "patch", null);
__decorate([
    (0, common_1.Get)(':itemId/uoms'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk', 'cashier'),
    (0, swagger_1.ApiOperation)({ summary: 'List available UOMs for an item (same category as base UOM)' }),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "listItemUoms", null);
exports.ItemsController = ItemsController = __decorate([
    (0, swagger_1.ApiTags)('items'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('items'),
    __param(7, (0, typeorm_1.InjectRepository)(item_orm_entity_1.ItemOrmEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(uom_orm_entity_1.UomOrmEntity)),
    __param(9, (0, common_1.Inject)(catalog_di_tokens_1.ITEM_REPOSITORY)),
    __metadata("design:paramtypes", [list_items_use_case_1.ListItemsUseCase,
        list_item_dependencies_use_case_1.ListItemDependenciesUseCase,
        get_item_use_case_1.GetItemUseCase,
        create_item_use_case_1.CreateItemUseCase,
        update_item_use_case_1.UpdateItemUseCase,
        patch_item_use_case_1.PatchItemUseCase,
        generic_drug_cache_service_1.GenericDrugCacheService,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], ItemsController);
//# sourceMappingURL=items.controller.js.map