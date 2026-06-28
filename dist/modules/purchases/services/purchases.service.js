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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
const entities_1 = require("../../inventory/entities");
const entities_2 = require("../entities");
const code_validation_1 = require("../../../shared/utils/code-validation");
let PurchasesService = class PurchasesService {
    dataSource;
    purchaseOrderRepository;
    purchaseOrderLineRepository;
    warehouseRepository;
    constructor(dataSource, purchaseOrderRepository, purchaseOrderLineRepository, warehouseRepository) {
        this.dataSource = dataSource;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.purchaseOrderLineRepository = purchaseOrderLineRepository;
        this.warehouseRepository = warehouseRepository;
    }
    async list(query, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const qb = this.purchaseOrderRepository
            .createQueryBuilder('purchase')
            .leftJoinAndSelect('purchase.lines', 'line')
            .leftJoinAndSelect('line.item', 'lineItem')
            .leftJoinAndSelect('purchase.warehouse', 'warehouse')
            .leftJoinAndSelect('purchase.supplier', 'supplier')
            .where('purchase.organization_id = :organizationId', { organizationId });
        if (query.search) {
            qb.andWhere('(purchase.purchase_order_number LIKE :search OR purchase.status LIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        if (query.filter) {
            qb.andWhere('(purchase.purchase_order_number LIKE :filter OR purchase.status LIKE :filter)', {
                filter: `%${query.filter}%`,
            });
        }
        console.log({ query }, qb.getSql());
        qb
            .orderBy(this.resolveSortColumn(query.sortBy), query.sortOrder.toUpperCase())
            .skip(query.offset)
            .take(query.limit);
        console.log({ query }, qb.getSql());
        const [rows, total] = await qb.getManyAndCount();
        return {
            data: rows.map((row) => {
                const firstLine = row.lines[0] ?? null;
                return {
                    id: row.id,
                    supplierId: row.supplierId,
                    warehouseId: row.warehouseId,
                    branchId: row.warehouseId,
                    supplier: row.supplier ? { id: row.supplier.id, name: row.supplier.name } : null,
                    warehouse: row.warehouse ? { id: row.warehouse.id, name: row.warehouse.name } : null,
                    currencyCode: row.currencyCode,
                    orderDate: row.orderDate,
                    expectedDate: row.expectedDate,
                    totalCost: Number(row.totalAmount),
                    invoiceNumber: row.purchaseOrderNumber,
                    status: row.status,
                    note: row.note,
                    lines: row.lines.map((line) => this.mapLine(line)),
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt,
                    archivedAt: null,
                };
            }),
            total,
        };
    }
    async createPurchase(payload, currentUser) {
        console.log({ payload });
        const userPurchaseOrderNumber = payload.purchaseOrderNumber?.trim() || payload.invoiceNumber?.trim();
        if (userPurchaseOrderNumber) {
            const last = await this.purchaseOrderRepository.findOne({
                where: { organizationId: currentUser.organizationId },
                order: { createdAt: 'DESC' },
                select: ['purchaseOrderNumber'],
            });
            const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
                providedCode: userPurchaseOrderNumber,
                lastCode: last?.purchaseOrderNumber,
                override: payload.overrideCodeValidation,
            });
            if (!valid) {
                throw new common_1.BadRequestException(`Invalid code '${userPurchaseOrderNumber}'. Expected '${expectedCode}'.`);
            }
        }
        console.log('here');
        return this.dataSource.transaction(async (manager) => {
            const purchaseOrderRepo = manager.getRepository(entities_2.PurchaseOrderOrmEntity);
            const purchaseOrderLineRepo = manager.getRepository(entities_2.PurchaseOrderLineOrmEntity);
            const warehouseRepo = manager.getRepository(entities_1.WarehouseOrmEntity);
            const warehouse = await this.resolveWarehouse(payload.warehouseId ?? payload.branchId ?? '', warehouseRepo, currentUser.organizationId);
            const linesPayload = this.normalizeLines(payload);
            const totals = this.calculateTotals(linesPayload);
            const purchaseOrderNumber = userPurchaseOrderNumber || `PO-${Date.now()}`;
            const purchaseOrder = await purchaseOrderRepo.save(purchaseOrderRepo.create({
                organizationId: currentUser.organizationId,
                purchaseOrderNumber,
                supplierId: payload.supplierId,
                warehouseId: warehouse.id,
                currencyCode: payload.currencyCode ?? 'NGN',
                orderDate: payload.orderDate ?? new Date().toISOString().slice(0, 10),
                expectedDate: payload.expectedDate ?? null,
                status: payload.status ?? 'draft',
                subtotalAmount: totals.subtotalAmount,
                taxAmount: totals.taxAmount,
                totalAmount: totals.totalAmount,
                createdByUserId: currentUser.sub ?? persistence_scope_1.DEFAULT_SYSTEM_USER_ID,
                approvedByUserId: payload.status === 'approved' || payload.status === 'received' ? currentUser.sub ?? persistence_scope_1.DEFAULT_SYSTEM_USER_ID : null,
                approvedAt: payload.status === 'approved' || payload.status === 'received' ? new Date() : null,
                note: payload.note ?? null,
            }));
            console.log('here...1', { purchaseOrder });
            const pol = await purchaseOrderLineRepo.save(linesPayload.map((line) => purchaseOrderLineRepo.create({
                purchaseOrder,
                itemId: line.itemId,
                orderedQty: line.orderedQty,
                receivedQty: line.receivedQty ?? 0,
                uomId: line.uomId,
                unitCost: line.unitCost,
                discountPercent: line.discountPercent ?? 0,
                taxPercent: line.taxPercent ?? 0,
                lineSubtotal: this.computeLineSubtotal(line),
                lineTotal: this.computeLineTotal(line),
            })));
            console.log('here...2', { pol });
            return this.getById(purchaseOrder.id, currentUser.organizationId, manager);
        });
    }
    async resolveWarehouse(idOrCode, repo, organizationId) {
        if (!idOrCode)
            throw new common_1.BadRequestException('warehouseId is required');
        const byId = await repo.findOne({ where: { id: idOrCode, organizationId } });
        if (byId) {
            return byId;
        }
        const byCode = await repo.findOne({ where: { code: idOrCode, organizationId } });
        if (byCode) {
            return byCode;
        }
        return repo.save(repo.create({
            organizationId,
            storeId: null,
            code: idOrCode,
            name: `Warehouse ${idOrCode}`,
            isActive: true,
        }));
    }
    async getById(purchaseId, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID, manager) {
        const repo = manager ? manager.getRepository(entities_2.PurchaseOrderOrmEntity) : this.purchaseOrderRepository;
        const row = await repo.findOne({
            where: { id: purchaseId, organizationId },
            relations: ['lines', 'lines.item', 'warehouse', 'supplier'],
        });
        if (!row) {
            throw new common_1.NotFoundException('Purchase order not found');
        }
        const firstLine = row.lines[0] ?? null;
        return {
            id: row.id,
            supplierId: row.supplierId,
            warehouseId: row.warehouseId,
            branchId: row.warehouseId,
            supplier: row.supplier ? { id: row.supplier.id, name: row.supplier.name } : null,
            warehouse: row.warehouse ? { id: row.warehouse.id, name: row.warehouse.name } : null,
            currencyCode: row.currencyCode,
            orderDate: row.orderDate,
            expectedDate: row.expectedDate,
            totalCost: Number(row.totalAmount),
            invoiceNumber: row.purchaseOrderNumber,
            status: row.status,
            note: row.note,
            lines: row.lines.map((line) => this.mapLine(line)),
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            archivedAt: null,
        };
    }
    async updatePurchase(purchaseId, payload, currentUser) {
        return this.dataSource.transaction(async (manager) => {
            const purchaseOrderRepo = manager.getRepository(entities_2.PurchaseOrderOrmEntity);
            const purchaseOrderLineRepo = manager.getRepository(entities_2.PurchaseOrderLineOrmEntity);
            const warehouseRepo = manager.getRepository(entities_1.WarehouseOrmEntity);
            const order = await purchaseOrderRepo.findOne({
                where: { id: purchaseId, organizationId: currentUser.organizationId },
                relations: ['lines'],
            });
            if (!order)
                throw new common_1.NotFoundException('Purchase order not found');
            if (payload.supplierId !== undefined)
                order.supplierId = payload.supplierId;
            if (payload.warehouseId !== undefined || payload.branchId !== undefined) {
                const warehouse = await this.resolveWarehouse(payload.warehouseId ?? payload.branchId ?? '', warehouseRepo, currentUser.organizationId);
                order.warehouseId = warehouse.id;
            }
            if (payload.purchaseOrderNumber !== undefined)
                order.purchaseOrderNumber = payload.purchaseOrderNumber;
            if (payload.invoiceNumber !== undefined && payload.purchaseOrderNumber === undefined)
                order.purchaseOrderNumber = payload.invoiceNumber;
            if (payload.currencyCode !== undefined)
                order.currencyCode = payload.currencyCode;
            if (payload.orderDate !== undefined)
                order.orderDate = payload.orderDate;
            if (payload.expectedDate !== undefined)
                order.expectedDate = payload.expectedDate ?? null;
            if (payload.status !== undefined) {
                order.status = payload.status;
                order.approvedByUserId =
                    payload.status === 'approved' || payload.status === 'received' ? currentUser.sub ?? persistence_scope_1.DEFAULT_SYSTEM_USER_ID : order.approvedByUserId;
                order.approvedAt = payload.status === 'approved' || payload.status === 'received' ? new Date() : order.approvedAt;
            }
            if (payload.note !== undefined)
                order.note = payload.note ?? null;
            if (payload.lines || payload.itemId || payload.quantity || payload.unitCost) {
                await purchaseOrderLineRepo.delete({ purchaseOrder: { id: order.id } });
                const linesPayload = this.normalizeLines(payload);
                const totals = this.calculateTotals(linesPayload);
                order.subtotalAmount = totals.subtotalAmount;
                order.taxAmount = totals.taxAmount;
                order.totalAmount = totals.totalAmount;
                order.lines = await purchaseOrderLineRepo.save(linesPayload.map((line) => purchaseOrderLineRepo.create({
                    purchaseOrder: order,
                    itemId: line.itemId,
                    orderedQty: line.orderedQty,
                    receivedQty: line.receivedQty ?? 0,
                    uomId: line.uomId,
                    unitCost: line.unitCost,
                    discountPercent: line.discountPercent ?? 0,
                    taxPercent: line.taxPercent ?? 0,
                    lineSubtotal: this.computeLineSubtotal(line),
                    lineTotal: this.computeLineTotal(line),
                })));
            }
            const saved = await purchaseOrderRepo.save(order);
            return this.getById(saved.id, currentUser.organizationId, manager);
        });
    }
    async removePurchase(purchaseId, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const result = await this.purchaseOrderRepository.delete({ id: purchaseId, organizationId });
        if (!result.affected)
            throw new common_1.NotFoundException('Purchase order not found');
    }
    async addLine(purchaseId, payload, currentUser) {
        return this.dataSource.transaction(async (manager) => {
            const poRepo = manager.getRepository(entities_2.PurchaseOrderOrmEntity);
            const poLineRepo = manager.getRepository(entities_2.PurchaseOrderLineOrmEntity);
            const order = await poRepo.findOne({
                where: { id: purchaseId, organizationId: currentUser.organizationId },
                relations: ['lines', 'lines.item'],
            });
            if (!order)
                throw new common_1.NotFoundException('Purchase order not found');
            if (order.status !== 'draft') {
                throw new common_1.ForbiddenException('Lines can only be added to draft purchase orders');
            }
            const line = poLineRepo.create({
                purchaseOrder: order,
                itemId: payload.itemId,
                orderedQty: payload.orderedQty,
                receivedQty: 0,
                uomId: payload.uomId,
                unitCost: payload.unitCost,
                discountPercent: payload.discountPercent ?? 0,
                taxPercent: payload.taxPercent ?? 0,
                lineSubtotal: this.computeLineSubtotal(payload),
                lineTotal: this.computeLineTotal(payload),
            });
            const saved = await poLineRepo.save(line);
            order.lines.push(saved);
            const totals = this.calculateTotals(order.lines.map((l) => ({
                itemId: l.itemId,
                orderedQty: Number(l.orderedQty),
                receivedQty: Number(l.receivedQty),
                uomId: l.uomId,
                unitCost: Number(l.unitCost),
                discountPercent: Number(l.discountPercent),
                taxPercent: Number(l.taxPercent),
            })));
            order.subtotalAmount = totals.subtotalAmount;
            order.taxAmount = totals.taxAmount;
            order.totalAmount = totals.totalAmount;
            await poRepo.save(order);
            return this.getById(purchaseId, currentUser.organizationId, manager);
        });
    }
    async updateLine(purchaseId, lineId, payload, currentUser) {
        return this.dataSource.transaction(async (manager) => {
            const poRepo = manager.getRepository(entities_2.PurchaseOrderOrmEntity);
            const poLineRepo = manager.getRepository(entities_2.PurchaseOrderLineOrmEntity);
            const order = await poRepo.findOne({
                where: { id: purchaseId, organizationId: currentUser.organizationId },
                relations: ['lines', 'lines.item'],
            });
            if (!order)
                throw new common_1.NotFoundException('Purchase order not found');
            const line = order.lines.find((l) => l.id === lineId);
            if (!line)
                throw new common_1.NotFoundException('Purchase order line not found');
            const status = order.status;
            const isReceived = Number(line.receivedQty) >= Number(line.orderedQty);
            if (status === 'received' || status === 'cancelled') {
                throw new common_1.ForbiddenException('Cannot modify lines on received or cancelled purchase orders');
            }
            if (status === 'approved' || status === 'partially_received') {
                const allowedFields = new Set();
                allowedFields.add('unitCost');
                if (!isReceived) {
                    allowedFields.add('receivedQty');
                }
                if (payload.orderedQty !== undefined && !allowedFields.has('orderedQty')) {
                    throw new common_1.ForbiddenException('Cannot change ordered quantity in approved status');
                }
                if (payload.uomId !== undefined && !allowedFields.has('uomId')) {
                    throw new common_1.ForbiddenException('Cannot change UOM in approved status');
                }
                if (payload.discountPercent !== undefined && !allowedFields.has('discountPercent')) {
                    throw new common_1.ForbiddenException('Cannot change discount in approved status');
                }
                if (payload.taxPercent !== undefined && !allowedFields.has('taxPercent')) {
                    throw new common_1.ForbiddenException('Cannot change tax in approved status');
                }
            }
            if (payload.orderedQty !== undefined)
                line.orderedQty = payload.orderedQty;
            if (payload.uomId !== undefined)
                line.uomId = payload.uomId;
            if (payload.unitCost !== undefined)
                line.unitCost = payload.unitCost;
            if (payload.receivedQty !== undefined)
                line.receivedQty = payload.receivedQty;
            if (payload.discountPercent !== undefined)
                line.discountPercent = payload.discountPercent;
            if (payload.taxPercent !== undefined)
                line.taxPercent = payload.taxPercent;
            line.lineSubtotal = this.computeLineSubtotal({
                itemId: line.itemId,
                orderedQty: Number(line.orderedQty),
                uomId: line.uomId,
                unitCost: Number(line.unitCost),
                discountPercent: Number(line.discountPercent),
                taxPercent: Number(line.taxPercent),
            });
            line.lineTotal = this.computeLineTotal({
                itemId: line.itemId,
                orderedQty: Number(line.orderedQty),
                uomId: line.uomId,
                unitCost: Number(line.unitCost),
                discountPercent: Number(line.discountPercent),
                taxPercent: Number(line.taxPercent),
            });
            await poLineRepo.save(line);
            const totals = this.calculateTotals(order.lines.map((l) => ({
                itemId: l.itemId,
                orderedQty: Number(l.orderedQty),
                receivedQty: Number(l.receivedQty),
                uomId: l.uomId,
                unitCost: Number(l.unitCost),
                discountPercent: Number(l.discountPercent),
                taxPercent: Number(l.taxPercent),
            })));
            order.subtotalAmount = totals.subtotalAmount;
            order.taxAmount = totals.taxAmount;
            order.totalAmount = totals.totalAmount;
            await poRepo.save(order);
            return this.getById(purchaseId, currentUser.organizationId, manager);
        });
    }
    async removeLine(purchaseId, lineId, currentUser) {
        return this.dataSource.transaction(async (manager) => {
            const poRepo = manager.getRepository(entities_2.PurchaseOrderOrmEntity);
            const poLineRepo = manager.getRepository(entities_2.PurchaseOrderLineOrmEntity);
            const order = await poRepo.findOne({
                where: { id: purchaseId, organizationId: currentUser.organizationId },
                relations: ['lines', 'lines.item'],
            });
            if (!order)
                throw new common_1.NotFoundException('Purchase order not found');
            if (order.status !== 'draft') {
                throw new common_1.ForbiddenException('Lines can only be deleted from draft purchase orders');
            }
            const line = order.lines.find((l) => l.id === lineId);
            if (!line)
                throw new common_1.NotFoundException('Purchase order line not found');
            await poLineRepo.remove(line);
            order.lines = order.lines.filter((l) => l.id !== lineId);
            const totals = order.lines.length
                ? this.calculateTotals(order.lines.map((l) => ({
                    itemId: l.itemId,
                    orderedQty: Number(l.orderedQty),
                    receivedQty: Number(l.receivedQty),
                    uomId: l.uomId,
                    unitCost: Number(l.unitCost),
                    discountPercent: Number(l.discountPercent),
                    taxPercent: Number(l.taxPercent),
                })))
                : { subtotalAmount: 0, taxAmount: 0, totalAmount: 0 };
            order.subtotalAmount = totals.subtotalAmount;
            order.taxAmount = totals.taxAmount;
            order.totalAmount = totals.totalAmount;
            await poRepo.save(order);
            return this.getById(purchaseId, currentUser.organizationId, manager);
        });
    }
    resolveSortColumn(sortBy) {
        const map = {
            status: 'purchase.status',
            invoiceNumber: 'purchase.purchase_order_number',
            totalCost: 'purchase.total_amount',
            updatedAt: 'purchase.updated_at',
            createdAt: 'purchase.createdAt',
        };
        return map[sortBy] ?? 'purchase.created_at';
    }
    normalizeLines(payload) {
        if (payload.lines?.length) {
            return payload.lines;
        }
        if (!payload.itemId || !payload.quantity || payload.unitCost === undefined) {
            throw new common_1.BadRequestException('Either lines or itemId/quantity/unitCost must be provided');
        }
        return [
            {
                itemId: payload.itemId,
                orderedQty: payload.quantity,
                receivedQty: payload.quantity,
                uomId: persistence_scope_1.DEFAULT_UOM_ID,
                unitCost: payload.unitCost,
                discountPercent: 0,
                taxPercent: 0,
            },
        ];
    }
    computeLineSubtotal(line) {
        const gross = Number(line.orderedQty) * Number(line.unitCost);
        const discount = gross * (Number(line.discountPercent ?? 0) / 100);
        return Number((gross - discount).toFixed(2));
    }
    computeLineTotal(line) {
        const subtotal = this.computeLineSubtotal(line);
        const tax = subtotal * (Number(line.taxPercent ?? 0) / 100);
        return Number((subtotal + tax).toFixed(2));
    }
    calculateTotals(lines) {
        const subtotalAmount = Number(lines.reduce((sum, line) => sum + this.computeLineSubtotal(line), 0).toFixed(2));
        const totalAmount = Number(lines.reduce((sum, line) => sum + this.computeLineTotal(line), 0).toFixed(2));
        return {
            subtotalAmount,
            taxAmount: Number((totalAmount - subtotalAmount).toFixed(2)),
            totalAmount,
        };
    }
    mapLine(line) {
        return {
            id: line.id,
            itemId: line.itemId,
            itemCode: line.item?.code ?? '',
            itemName: line.item?.name ?? '',
            orderedQty: Number(line.orderedQty),
            receivedQty: Number(line.receivedQty),
            uomId: line.uomId,
            unitCost: Number(line.unitCost),
            discountPercent: Number(line.discountPercent),
            taxPercent: Number(line.taxPercent),
            lineSubtotal: Number(line.lineSubtotal),
            lineTotal: Number(line.lineTotal),
        };
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.PurchaseOrderOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_2.PurchaseOrderLineOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.WarehouseOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map