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
exports.UomsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const create_uom_dto_1 = require("../dto/create-uom.dto");
const list_uoms_dto_1 = require("../dto/list-uoms.dto");
const update_uom_dto_1 = require("../dto/update-uom.dto");
const uoms_service_1 = require("../services/uoms.service");
let UomsController = class UomsController {
    uomsService;
    constructor(uomsService) {
        this.uomsService = uomsService;
    }
    async list(query, currentUser) {
        const result = await this.uomsService.list(query, currentUser.organizationId);
        return {
            data: result.data,
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    getById(uomId, currentUser) {
        return this.uomsService.getById(uomId, currentUser.organizationId);
    }
    create(payload, currentUser) {
        return this.uomsService.create(payload, currentUser.organizationId);
    }
    replace(uomId, payload, currentUser) {
        return this.uomsService.update(uomId, payload, currentUser.organizationId);
    }
    patch(uomId, payload, currentUser) {
        return this.uomsService.update(uomId, payload, currentUser.organizationId);
    }
};
exports.UomsController = UomsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk', 'cashier'),
    (0, swagger_1.ApiOperation)({ summary: 'List/search UOMs by name or code' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_uoms_dto_1.ListUomsDto, Object]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':uomId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk', 'cashier'),
    (0, swagger_1.ApiOperation)({ summary: 'Get UOM by id' }),
    __param(0, (0, common_1.Param)('uomId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'Create UOM' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_uom_dto_1.CreateUomDto, Object]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':uomId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'Update UOM' }),
    __param(0, (0, common_1.Param)('uomId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_uom_dto_1.UpdateUomDto, Object]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':uomId'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'pharmacist', 'inventory_clerk'),
    (0, swagger_1.ApiOperation)({ summary: 'Patch UOM' }),
    __param(0, (0, common_1.Param)('uomId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_uom_dto_1.UpdateUomDto, Object]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "patch", null);
exports.UomsController = UomsController = __decorate([
    (0, swagger_1.ApiTags)('uoms'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('uoms'),
    __metadata("design:paramtypes", [uoms_service_1.UomsService])
], UomsController);
//# sourceMappingURL=uoms.controller.js.map