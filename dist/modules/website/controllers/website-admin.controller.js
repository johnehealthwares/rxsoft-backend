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
exports.WebsiteAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const website_service_1 = require("../services/website.service");
const website_dto_1 = require("../dto/website.dto");
const health_concern_orm_entity_1 = require("../entities/health-concern.orm-entity");
const blog_article_orm_entity_1 = require("../entities/blog-article.orm-entity");
const prescription_orm_entity_1 = require("../entities/prescription.orm-entity");
const entities_1 = require("../../sales/entities");
const entities_2 = require("../../inventory/entities");
const ORDER_STATUS_TRANSITIONS = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['processing', 'cancelled'],
    processing: ['dispatched', 'cancelled'],
    dispatched: ['in_transit'],
    in_transit: ['delivered'],
    delivered: [],
    cancelled: [],
};
let WebsiteAdminController = class WebsiteAdminController {
    websiteService;
    healthConcernRepo;
    blogRepo;
    prescriptionRepo;
    saleRepo;
    stockBalanceRepo;
    stockAdjustmentRepo;
    storeStockLocationRepo;
    constructor(websiteService, healthConcernRepo, blogRepo, prescriptionRepo, saleRepo, stockBalanceRepo, stockAdjustmentRepo, storeStockLocationRepo) {
        this.websiteService = websiteService;
        this.healthConcernRepo = healthConcernRepo;
        this.blogRepo = blogRepo;
        this.prescriptionRepo = prescriptionRepo;
        this.saleRepo = saleRepo;
        this.stockBalanceRepo = stockBalanceRepo;
        this.stockAdjustmentRepo = stockAdjustmentRepo;
        this.storeStockLocationRepo = storeStockLocationRepo;
    }
    listHealthConcerns() {
        return this.healthConcernRepo.find({ order: { displayOrder: 'ASC' } });
    }
    createHealthConcern(dto) {
        const entity = this.healthConcernRepo.create(dto);
        return this.healthConcernRepo.save(entity);
    }
    async updateHealthConcern(id, dto) {
        await this.healthConcernRepo.update(id, dto);
        return this.healthConcernRepo.findOne({ where: { id } });
    }
    async deleteHealthConcern(id) {
        await this.healthConcernRepo.update(id, { isActive: false });
        return { id, isActive: false };
    }
    async listArticles(query) {
        const [data, total] = await this.blogRepo.findAndCount({
            order: { publishedAt: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { data, total, page: query.page, limit: query.limit };
    }
    createArticle(dto) {
        const entity = this.blogRepo.create({ ...dto, publishedAt: dto.isPublished ? new Date() : null });
        return this.blogRepo.save(entity);
    }
    async updateArticle(id, dto) {
        const updateData = { ...dto };
        if (dto.isPublished === false) {
            updateData.publishedAt = null;
        }
        else if (dto.isPublished) {
            const existing = await this.blogRepo.findOne({ where: { id } });
            if (existing && !existing.publishedAt) {
                updateData.publishedAt = new Date();
            }
        }
        await this.blogRepo.update(id, updateData);
        return this.blogRepo.findOne({ where: { id } });
    }
    async deleteArticle(id) {
        await this.blogRepo.softDelete(id);
        return { id, deleted: true };
    }
    async listPrescriptions(query, status) {
        const where = {};
        if (status)
            where.status = status;
        const [data, total] = await this.prescriptionRepo.findAndCount({
            where,
            relations: ['files'],
            order: { createdAt: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { data, total, page: query.page, limit: query.limit };
    }
    async updatePrescriptionStatus(id, dto) {
        await this.prescriptionRepo.update(id, { status: dto.status });
        return this.prescriptionRepo.findOne({ where: { id }, relations: ['files'] });
    }
    async listOrders(status, page, limit) {
        const where = { saleChannel: 'mobile' };
        if (status) {
            where.orderStatus = status;
        }
        const [data, total] = await this.saleRepo.findAndCount({
            where: where,
            relations: ['lines'],
            order: { createdAt: 'DESC' },
            skip: ((page ?? 1) - 1) * (limit ?? 20),
            take: limit ?? 20,
        });
        return { data, total, page: page ?? 1, limit: limit ?? 20 };
    }
    async getOrder(id) {
        const order = await this.saleRepo.findOne({
            where: { id, saleChannel: 'mobile' },
            relations: ['lines'],
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateOrderStatus(id, dto, currentUser) {
        const order = await this.saleRepo.findOne({
            where: { id, saleChannel: 'mobile' },
            relations: ['lines'],
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const allowed = ORDER_STATUS_TRANSITIONS[order.orderStatus ?? 'pending'] ?? [];
        if (!allowed.includes(dto.status)) {
            throw new common_1.BadRequestException(`Cannot transition from ${order.orderStatus ?? 'pending'} to ${dto.status}. Allowed: ${allowed.join(', ') || 'none'}`);
        }
        if (dto.status === 'cancelled' && order.assignedLocationId) {
            const linesWithDetails = await this.websiteService.getOrderLinesWithItems(order.id);
            const locId = order.assignedLocationId;
            for (const line of linesWithDetails) {
                const balance = await this.stockBalanceRepo.findOne({
                    where: {
                        organizationId: currentUser.organizationId,
                        item: { id: line.itemId },
                        location: { id: locId },
                    },
                });
                if (balance && balance.quantityReserved > 0) {
                    balance.quantityReserved = Number(Math.max(0, balance.quantityReserved - line.quantity).toFixed(4));
                    await this.stockBalanceRepo.save(balance);
                }
            }
            order.assignedLocationId = null;
        }
        order.orderStatus = dto.status;
        return this.saleRepo.save(order);
    }
    async assignLocation(id, dto) {
        const order = await this.saleRepo.findOne({
            where: { id, saleChannel: 'mobile' },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        order.assignedLocationId = dto.stockLocationId;
        return this.saleRepo.save(order);
    }
    async processOrder(id, currentUser) {
        const order = await this.saleRepo.findOne({
            where: { id, saleChannel: 'mobile', orderStatus: 'confirmed' },
        });
        if (!order)
            throw new common_1.NotFoundException('Order must be in confirmed status to process');
        const locationId = order.assignedLocationId;
        if (!locationId) {
            const ssl = await this.storeStockLocationRepo.findOne({
                where: {
                    organizationId: currentUser.organizationId,
                    storeId: order.storeId,
                    purpose: 'sale_issue',
                    isActive: true,
                },
                relations: ['stockLocation'],
            });
            if (!ssl) {
                throw new common_1.BadRequestException('No sale_issue stock location configured and no location assigned to order');
            }
            order.assignedLocationId = ssl.stockLocation.id;
        }
        const linesWithDetails = await this.websiteService.getOrderLinesWithItems(order.id);
        for (const line of linesWithDetails) {
            const locId2 = order.assignedLocationId;
            if (!locId2)
                continue;
            const balance = await this.stockBalanceRepo.findOne({
                where: {
                    organizationId: currentUser.organizationId,
                    item: { id: line.itemId },
                    location: { id: locId2 },
                },
                relations: ['item', 'location'],
            });
            if (!balance)
                continue;
            const qtyToDeplete = line.quantity;
            const reserved = Math.min(balance.quantityReserved, qtyToDeplete);
            balance.quantityReserved = Number((balance.quantityReserved - reserved).toFixed(4));
            balance.quantityOnHand = Number((balance.quantityOnHand - (qtyToDeplete - reserved)).toFixed(4));
            if (balance.quantityOnHand < 0) {
                throw new common_1.BadRequestException(`Insufficient stock for item ${line.itemId}`);
            }
            const savedBalance = await this.stockBalanceRepo.save(balance);
            await this.stockAdjustmentRepo.save(this.stockAdjustmentRepo.create({
                stockBalance: savedBalance,
                reason: `order_fulfillment:${order.saleNumber}`,
                deltaQuantity: -qtyToDeplete,
                performedByUserId: currentUser.sub,
                performedAt: new Date(),
            }));
        }
        order.orderStatus = 'processing';
        return this.saleRepo.save(order);
    }
};
exports.WebsiteAdminController = WebsiteAdminController;
__decorate([
    (0, common_1.Get)('health-concerns'),
    (0, swagger_1.ApiOperation)({ summary: 'List all health concerns (admin)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebsiteAdminController.prototype, "listHealthConcerns", null);
__decorate([
    (0, common_1.Post)('health-concerns'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a health concern' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.CreateHealthConcernDto]),
    __metadata("design:returntype", void 0)
], WebsiteAdminController.prototype, "createHealthConcern", null);
__decorate([
    (0, common_1.Put)('health-concerns/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a health concern' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, website_dto_1.UpdateHealthConcernDto]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "updateHealthConcern", null);
__decorate([
    (0, common_1.Delete)('health-concerns/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a health concern' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "deleteHealthConcern", null);
__decorate([
    (0, common_1.Get)('articles'),
    (0, swagger_1.ApiOperation)({ summary: 'List all articles including unpublished' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.ListQueryDto]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "listArticles", null);
__decorate([
    (0, common_1.Post)('articles'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a blog article' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.CreateArticleDto]),
    __metadata("design:returntype", void 0)
], WebsiteAdminController.prototype, "createArticle", null);
__decorate([
    (0, common_1.Put)('articles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a blog article' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, website_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Delete)('articles/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a blog article' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "deleteArticle", null);
__decorate([
    (0, common_1.Get)('prescriptions'),
    (0, swagger_1.ApiOperation)({ summary: 'List prescriptions with status filter and pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.ListQueryDto, String]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "listPrescriptions", null);
__decorate([
    (0, common_1.Patch)('prescriptions/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update prescription status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, website_dto_1.UpdatePrescriptionStatusDto]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "updatePrescriptionStatus", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({ summary: 'List all website orders (saleChannel=mobile)' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "listOrders", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get website order detail' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Patch)('orders/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update order status with transition validation' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Post)('orders/:id/assign-location'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a stock location to fulfill an order' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "assignLocation", null);
__decorate([
    (0, common_1.Post)('orders/:id/process'),
    (0, swagger_1.ApiOperation)({ summary: 'Process order — deplete reserved stock and update status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WebsiteAdminController.prototype, "processOrder", null);
exports.WebsiteAdminController = WebsiteAdminController = __decorate([
    (0, swagger_1.ApiTags)('website-admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, common_1.Controller)('website/admin'),
    __param(1, (0, typeorm_1.InjectRepository)(health_concern_orm_entity_1.HealthConcernOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(blog_article_orm_entity_1.BlogArticleOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(prescription_orm_entity_1.PrescriptionOrmEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.SaleOrmEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_2.StockBalanceOrmEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_2.StockAdjustmentOrmEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(entities_2.StoreStockLocationOrmEntity)),
    __metadata("design:paramtypes", [website_service_1.WebsiteService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WebsiteAdminController);
//# sourceMappingURL=website-admin.controller.js.map