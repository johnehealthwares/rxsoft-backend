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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const list_query_dto_1 = require("../../../shared/dto/list-query.dto");
const csv_1 = require("../../../shared/utils/csv");
const categories_dto_1 = require("../dto/categories.dto");
const categories_service_1 = require("../services/categories.service");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async list(query, currentUser) {
        const organizationId = currentUser.roles.includes('super_admin') && query.organizationId
            ? query.organizationId
            : currentUser.organizationId;
        const result = await this.categoriesService.list(query, organizationId);
        return { data: result.data, meta: { page: query.page, limit: query.limit, total: result.total } };
    }
    async metrics(currentUser) {
        return this.categoriesService.getLastCreated(currentUser.organizationId);
    }
    async export(query, currentUser) {
        const organizationId = currentUser.roles.includes('super_admin') && query.organizationId
            ? query.organizationId
            : currentUser.organizationId;
        return (0, csv_1.toCsv)((await this.categoriesService.list(query, organizationId)).data.map((item) => ({ ...item })));
    }
    create(payload, currentUser) {
        return this.categoriesService.createCategory(payload, currentUser.organizationId);
    }
    replace(categoryId, payload, currentUser) {
        return this.categoriesService.updateCategory(categoryId, payload, currentUser.organizationId);
    }
    patch(categoryId, payload, currentUser) {
        return this.categoriesService.updateCategory(categoryId, payload, currentUser.organizationId);
    }
    get(categoryId) {
        return this.categoriesService.findById(categoryId);
    }
    async remove(categoryId, currentUser) {
        await this.categoriesService.archive(categoryId, currentUser.organizationId);
        return { ok: true };
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    (0, swagger_1.ApiOperation)({ summary: 'List categories with pagination/filter/sort' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_query_dto_1.ListQueryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "metrics", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin', 'manager', 'auditor'),
    (0, common_1.Header)('Content-Type', 'text/csv'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_query_dto_1.ListQueryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "export", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('super_admin', 'admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':categoryId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, categories_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':categoryId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, categories_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "patch", null);
__decorate([
    (0, common_1.Get)(':categoryId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)(':categoryId'),
    (0, roles_decorator_1.Roles)('super_admin', 'admin'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map