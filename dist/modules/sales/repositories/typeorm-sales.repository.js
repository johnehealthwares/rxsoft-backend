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
exports.TypeormSalesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const users_proxy_service_1 = require("../../users-proxy/users-proxy.service");
const entities_1 = require("../../inventory/entities");
const uom_converter_service_1 = require("../services/uom-converter.service");
const entities_2 = require("../../receivables/entities");
const sale_entity_1 = require("../domains/sale.entity");
const entities_3 = require("../entities");
const list_1 = require("../../../database/list");
function toDomain(entity) {
    return new sale_entity_1.Sale(entity.id, entity.organizationId, entity.saleNumber, entity.saleChannel, entity.storeId, entity.storeLocationName ?? null, entity.status, entity.totalAmount, entity.paidAmount, entity.changeAmount, entity.saleDate);
}
let TypeormSalesRepository = class TypeormSalesRepository {
    saleRepository;
    itemRepository;
    uomRepository;
    dataSource;
    uomConverter;
    usersProxy;
    async findById(organizationId, saleId) {
        const entity = await this.saleRepository.findOne({
            where: { id: saleId, organizationId },
            relations: [
                'customer',
                'lines',
                'lines.item',
                'lines.item.category',
                'lines.item.baseUom',
                'lines.item.saleUom',
                'lines.uom',
                'payments',
                'payments.paymentMethod',
            ],
        });
        if (!entity)
            return null;
        if (entity.storeId) {
            const location = await this.dataSource
                .createQueryBuilder()
                .select('sl.name', 'name')
                .from(entities_1.StockLocationOrmEntity, 'sl')
                .where('sl.id::text = :id', { id: entity.storeId })
                .getRawOne();
            entity.storeLocationName = location?.name ?? null;
        }
        return toDomain(entity);
    }
    async findLastCreated(organizationId) {
        const entity = await this.saleRepository.findOne({
            where: { organizationId },
            order: { createdAt: 'DESC' },
            select: ['saleNumber'],
        });
        return entity ? { saleNumber: entity.saleNumber } : null;
    }
    constructor(saleRepository, itemRepository, uomRepository, dataSource, uomConverter, usersProxy) {
        this.saleRepository = saleRepository;
        this.itemRepository = itemRepository;
        this.uomRepository = uomRepository;
        this.dataSource = dataSource;
        this.uomConverter = uomConverter;
        this.usersProxy = usersProxy;
    }
    async list(query) {
        const qb = this.saleRepository
            .createQueryBuilder('sale')
            .where('sale.organization_id = :organizationId', { organizationId: query.organizationId })
            .orderBy('sale.saleDate', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.status) {
            qb.andWhere('sale.status = :status', { status: query.status });
        }
        if (query.search) {
            if (query.search.includes('{')) {
                const filters = JSON.parse(query.search);
                (0, list_1.applyFilters)(qb, 'sale', filters);
            }
            else {
                qb.andWhere('sale.sale_number ILIKE :search', { search: `%${query.search}%` });
            }
        }
        console.log("qb.getParameters()", qb.getSql(), qb.getParameters());
        const [entities, total] = await qb.getManyAndCount();
        const storeIds = [...new Set(entities.map((e) => e.storeId).filter(Boolean))];
        const locationMap = new Map();
        if (storeIds.length > 0) {
            const locations = await this.dataSource
                .createQueryBuilder()
                .select('sl.id', 'id')
                .addSelect('sl.name', 'name')
                .from(entities_1.StockLocationOrmEntity, 'sl')
                .where('sl.id::text IN (:...ids)', { ids: storeIds })
                .getRawMany();
            for (const loc of locations) {
                locationMap.set(loc.id, loc.name);
            }
        }
        return {
            items: entities.map((entity) => {
                entity.storeLocationName = locationMap.get(entity.storeId) ?? null;
                return toDomain(entity);
            }),
            total,
        };
    }
    async getMetrics(query) {
        const applySearch = async (qb) => {
            if (query.search) {
                if (query.search.includes('{')) {
                    console.log(JSON.parse(query.search), 'JSON.parse(query.search)');
                    await (0, list_1.applyFilters)(qb, 'sale', JSON.parse(query.search));
                }
                else {
                    qb.andWhere('(sale.sale_number ILIKE :search OR sale.sale_channel ILIKE :search)', {
                        search: `%${query.search}%`,
                    });
                }
            }
        };
        const baseQb = this.saleRepository.createQueryBuilder('sale')
            .where('sale.organization_id = :organizationId', { organizationId: query.organizationId });
        await applySearch(baseQb);
        const totalSales = await baseQb.clone().andWhere("sale.status = 'posted'").getCount();
        const inProgress = await baseQb.clone().andWhere("sale.status = 'draft'").getCount();
        const totalRevenueResult = await baseQb.clone()
            .andWhere("sale.status = 'posted'")
            .select('COALESCE(SUM(sale.total_amount), 0)', 'revenue')
            .getRawOne();
        const totalRevenue = Number(totalRevenueResult?.revenue ?? 0);
        const channelRows = await baseQb.clone()
            .andWhere("sale.status = 'posted'")
            .select([
            'sale.sale_channel AS channel',
            'COUNT(*) AS count',
            'COALESCE(SUM(sale.total_amount), 0) AS revenue',
        ])
            .groupBy('sale.sale_channel')
            .getRawMany();
        const byChannel = {};
        for (const row of channelRows) {
            byChannel[row.channel] = {
                count: Number(row.count),
                revenue: Number(row.revenue),
            };
        }
        const categoryRows = await this.saleRepository
            .createQueryBuilder('sale')
            .innerJoin('sale.lines', 'sale_line')
            .innerJoin('sale_line.item', 'item')
            .innerJoin('item.category', 'cat')
            .where('sale.organization_id = :organizationId', { organizationId: query.organizationId })
            .andWhere("sale.status = 'posted'")
            .select([
            'cat.code AS category',
            'COUNT(DISTINCT sale.id) AS count',
            'COALESCE(SUM(sale_line.line_total), 0) AS revenue',
        ])
            .groupBy('cat.code')
            .orderBy('revenue', 'DESC')
            .getRawMany();
        const byCategory = {};
        for (const row of categoryRows) {
            byCategory[row.category] = {
                count: Number(row.count),
                revenue: Number(row.revenue),
            };
        }
        for (const row of categoryRows) {
            byCategory[row.category] = {
                count: Number(row.count),
                revenue: Number(row.revenue),
            };
        }
        return { totalSales, totalRevenue, inProgress, byChannel, byCategory };
    }
    async createWithSettlement(payload) {
        await this.usersProxy.findById(payload.organizationId, payload.soldByUserId);
        const receiverIds = [
            ...new Set(payload.payments
                .map((payment) => payment.receivedByUserId)
                .filter((receivedByUserId) => Boolean(receivedByUserId))),
        ];
        if (receiverIds.length) {
            await Promise.all(receiverIds.map((id) => this.usersProxy.findById(payload.organizationId, id)));
        }
        return this.dataSource.transaction(async (manager) => {
            const saleRepo = manager.getRepository(entities_3.SaleOrmEntity);
            const saleLineRepo = manager.getRepository(entities_3.SaleLineOrmEntity);
            const salePaymentRepo = manager.getRepository(entities_3.SalePaymentOrmEntity);
            const receivableRepo = manager.getRepository(entities_3.AccountReceivableOrmEntity);
            const receivableTxnRepo = manager.getRepository(entities_2.ReceivableTransactionOrmEntity);
            const itemRepo = manager.getRepository(item_orm_entity_1.ItemOrmEntity);
            const lotRepo = manager.getRepository(entities_1.StockLotOrmEntity);
            const uomRepo = manager.getRepository(entities_3.UomOrmEntity);
            const paymentMethodRepo = manager.getRepository(entities_3.PaymentMethodOrmEntity);
            const itemIds = [...new Set(payload.lines.map((line) => line.itemId))];
            const items = [];
            if (itemIds.length) {
                const foundItems = await itemRepo.find({
                    where: {
                        id: (0, typeorm_2.In)(itemIds),
                        organizationId: payload.organizationId,
                    },
                    select: ['id', 'baseUomId'],
                });
                if (foundItems.length !== itemIds.length) {
                    throw new Error('One or more item references are invalid');
                }
                items.push(...foundItems);
            }
            const itemBaseUomMap = new Map(items.map((i) => [i.id, i.baseUomId]));
            const uomIds = [...new Set(payload.lines.map((line) => line.uomId))];
            if (uomIds.length) {
                const uoms = await uomRepo.find({
                    where: {
                        id: (0, typeorm_2.In)(uomIds),
                        organizationId: payload.organizationId,
                    },
                    select: ['id'],
                });
                if (uoms.length !== uomIds.length) {
                    throw new Error('One or more UOM references are invalid');
                }
            }
            const lotIds = [...new Set(payload.lines.map((line) => line.lotId).filter((lotId) => Boolean(lotId)))];
            if (lotIds.length) {
                const lots = await lotRepo.find({
                    where: {
                        id: (0, typeorm_2.In)(lotIds),
                        organizationId: payload.organizationId,
                    },
                    select: ['id'],
                });
                if (lots.length !== lotIds.length) {
                    throw new Error('One or more lot references are invalid');
                }
            }
            const paymentMethodIds = [...new Set(payload.payments.map((payment) => payment.paymentMethodId))];
            if (paymentMethodIds.length) {
                const paymentMethods = await paymentMethodRepo.find({
                    where: {
                        id: (0, typeorm_2.In)(paymentMethodIds),
                        organizationId: payload.organizationId,
                    },
                    select: ['id'],
                });
                if (paymentMethods.length !== paymentMethodIds.length) {
                    throw new Error('One or more payment method references are invalid');
                }
            }
            const saleEntity = saleRepo.create({
                organizationId: payload.organizationId,
                saleNumber: payload.saleNumber,
                saleChannel: payload.saleChannel,
                storeId: payload.storeId,
                customerId: payload.customerId,
                status: payload.status ?? 'posted',
                subtotalAmount: payload.subtotalAmount,
                discountAmount: 0,
                taxAmount: 0,
                totalAmount: payload.totalAmount,
                paidAmount: payload.paidAmount,
                changeAmount: payload.changeAmount,
                saleDate: payload.saleDate,
                soldByUserId: payload.soldByUserId,
            });
            const savedSale = await saleRepo.save(saleEntity);
            if (payload.lines.length) {
                const lineEntities = payload.lines.map((line) => saleLineRepo.create({
                    sale: savedSale,
                    lineNumber: line.lineNumber,
                    item: { id: line.itemId },
                    lot: line.lotId ? { id: line.lotId } : null,
                    uom: { id: line.uomId },
                    quantity: line.quantity,
                    unitPrice: line.unitPrice,
                    discountPercent: 0,
                    taxPercent: 0,
                    lineSubtotal: line.lineSubtotal,
                    lineTotal: line.lineTotal,
                }));
                await saleLineRepo.save(lineEntities);
            }
            if (payload.payments.length) {
                const paymentEntities = payload.payments.map((payment) => salePaymentRepo.create({
                    sale: savedSale,
                    paymentMethod: { id: payment.paymentMethodId },
                    amount: payment.amount,
                    paymentReference: payment.paymentReference,
                    paidAt: payment.paidAt,
                    receivedByUserId: payment.receivedByUserId ?? null,
                }));
                await salePaymentRepo.save(paymentEntities);
            }
            let receivableId = null;
            let outstandingAmount = 0;
            if (payload.receivable) {
                const receivable = receivableRepo.create({
                    organizationId: payload.organizationId,
                    customerId: payload.receivable.customerId,
                    saleId: savedSale.id,
                    receivableNumber: payload.receivable.receivableNumber,
                    originalAmount: payload.receivable.originalAmount,
                    outstandingAmount: payload.receivable.outstandingAmount,
                    status: 'open',
                    openedAt: payload.saleDate,
                    closedAt: null,
                });
                const savedReceivable = await receivableRepo.save(receivable);
                await receivableTxnRepo.save(receivableTxnRepo.create({
                    receivable: savedReceivable,
                    transactionType: 'charge',
                    amount: savedReceivable.originalAmount,
                    transactionDate: payload.saleDate,
                    paymentMethod: null,
                    referenceNumber: savedSale.saleNumber,
                    receivedByUserId: null,
                }));
                receivableId = savedReceivable.id;
                outstandingAmount = savedReceivable.outstandingAmount;
            }
            if (payload.status !== 'draft') {
                const stockBalanceRepo = manager.getRepository(entities_1.StockBalanceOrmEntity);
                const stockAdjustmentRepo = manager.getRepository(entities_1.StockAdjustmentOrmEntity);
                const stockMovementRepo = manager.getRepository(entities_1.StockMovementOrmEntity);
                const storeStockLocationRepo = manager.getRepository(entities_1.StoreStockLocationOrmEntity);
                const stockLocationRepo = manager.getRepository(entities_1.StockLocationOrmEntity);
                let stockLocation = null;
                if (payload.stockLocationId) {
                    stockLocation = await stockLocationRepo.findOne({
                        where: { id: payload.stockLocationId, organizationId: payload.organizationId },
                    });
                    if (!stockLocation) {
                        throw new common_1.BadRequestException('Stock location not found');
                    }
                }
                else {
                    const ssl = await storeStockLocationRepo.findOne({
                        where: {
                            organizationId: payload.organizationId,
                            storeId: payload.storeId,
                            purpose: 'sale_issue',
                            isActive: true,
                        },
                        relations: ['stockLocation'],
                    });
                    if (!ssl) {
                        throw new common_1.BadRequestException('No active sale_issue stock location configured for this store, and no stockLocationId provided');
                    }
                    stockLocation = ssl.stockLocation;
                }
                const uomMap = new Map();
                const uomIds = [...new Set(payload.lines.map((l) => l.uomId))];
                const uoms = await uomRepo.find({ where: { id: (0, typeorm_2.In)(uomIds) } });
                for (const u of uoms)
                    uomMap.set(u.id, u);
                for (const line of payload.lines) {
                    const baseUomId = itemBaseUomMap.get(line.itemId);
                    if (!baseUomId)
                        continue;
                    const uom = uomMap.get(line.uomId);
                    if (!uom)
                        continue;
                    const baseQty = await this.uomConverter.convertToBaseUom(line.quantity, line.uomId, baseUomId);
                    const balanceWhere = {
                        organizationId: payload.organizationId,
                        item: { id: line.itemId },
                        location: { id: stockLocation.id },
                    };
                    if (line.lotId)
                        balanceWhere.lot = { id: line.lotId };
                    let stockBalance = await stockBalanceRepo.findOne({ where: balanceWhere,
                        relations: ['item', 'location', 'lot'],
                    });
                    if (!stockBalance) {
                        throw new common_1.BadRequestException(`No stock balance found for item ${line.itemId} at location ${stockLocation.id}`);
                    }
                    const available = Number((stockBalance.quantityOnHand - stockBalance.quantityReserved).toFixed(4));
                    if (available < baseQty) {
                        throw new common_1.BadRequestException(`Insufficient stock for item ${line.itemId}: ${available} available, ${baseQty} needed`);
                    }
                    stockBalance.quantityOnHand = Number((stockBalance.quantityOnHand - baseQty).toFixed(4));
                    const savedBalance = await stockBalanceRepo.save(stockBalance);
                    const adjustment = stockAdjustmentRepo.create({
                        stockBalance: savedBalance,
                        reason: `sale:${savedSale.saleNumber}`,
                        deltaQuantity: -baseQty,
                        performedByUserId: payload.soldByUserId,
                        performedAt: payload.saleDate,
                    });
                    const savedAdjustment = await stockAdjustmentRepo.save(adjustment);
                    const movement = stockMovementRepo.create({
                        organizationId: payload.organizationId,
                        inventoryDocumentId: savedSale.id,
                        inventoryDocumentLineId: null,
                        item: { id: line.itemId },
                        lot: line.lotId ? { id: line.lotId } : null,
                        fromLocation: { id: stockLocation.id },
                        toLocation: null,
                        movementType: 'out',
                        quantity: baseQty,
                        unitCost: line.unitPrice,
                        occurredAt: payload.saleDate,
                        createdByUserId: payload.soldByUserId,
                    });
                    await stockMovementRepo.save(movement);
                }
            }
            return {
                sale: toDomain(savedSale),
                receivableCreated: Boolean(payload.receivable),
                receivableId,
                outstandingAmount,
            };
        });
    }
    async createRefund(payload) {
        await this.usersProxy.findById(payload.organizationId, payload.refundedByUserId);
        return this.dataSource.transaction(async (manager) => {
            const saleRepo = manager.getRepository(entities_3.SaleOrmEntity);
            const saleLineRepo = manager.getRepository(entities_3.SaleLineOrmEntity);
            const refundRepo = manager.getRepository(entities_3.SaleRefundOrmEntity);
            const refundLineRepo = manager.getRepository(entities_3.SaleRefundLineOrmEntity);
            const receivableRepo = manager.getRepository(entities_3.AccountReceivableOrmEntity);
            const receivableTxnRepo = manager.getRepository(entities_2.ReceivableTransactionOrmEntity);
            const storeStockLocationRepo = manager.getRepository(entities_1.StoreStockLocationOrmEntity);
            const stockBalanceRepo = manager.getRepository(entities_1.StockBalanceOrmEntity);
            const stockAdjustmentRepo = manager.getRepository(entities_1.StockAdjustmentOrmEntity);
            const sale = await saleRepo.findOne({
                where: { id: payload.saleId, organizationId: payload.organizationId },
            });
            if (!sale) {
                throw new common_1.NotFoundException('Sale not found');
            }
            if (sale.status === 'voided') {
                throw new common_1.BadRequestException('Cannot refund a voided sale');
            }
            const requestedLineIds = [...new Set(payload.lines.map((line) => line.saleLineId))];
            const saleLines = await saleLineRepo.find({
                where: {
                    id: (0, typeorm_2.In)(requestedLineIds),
                    sale: { id: sale.id },
                },
                relations: ['sale', 'item', 'lot'],
            });
            if (saleLines.length !== requestedLineIds.length) {
                throw new common_1.BadRequestException('One or more sale lines are invalid for this sale');
            }
            const priorRefundLines = await refundLineRepo.find({
                where: {
                    refund: {
                        sale: { id: sale.id },
                        organizationId: payload.organizationId,
                        status: 'posted',
                    },
                },
                relations: ['saleLine', 'refund', 'refund.sale'],
            });
            const refundedQtyByLineId = new Map();
            for (const line of priorRefundLines) {
                const key = line.saleLine.id;
                refundedQtyByLineId.set(key, Number(((refundedQtyByLineId.get(key) ?? 0) + line.quantity).toFixed(4)));
            }
            const requestedQtyByLineId = new Map();
            for (const line of payload.lines) {
                requestedQtyByLineId.set(line.saleLineId, Number(((requestedQtyByLineId.get(line.saleLineId) ?? 0) + line.quantity).toFixed(4)));
            }
            for (const [saleLineId, requestedQty] of requestedQtyByLineId) {
                const saleLine = saleLines.find((line) => line.id === saleLineId);
                const alreadyRefundedQty = refundedQtyByLineId.get(saleLineId) ?? 0;
                const maxRefundableQty = Number((saleLine.quantity - alreadyRefundedQty).toFixed(4));
                if (requestedQty > maxRefundableQty) {
                    throw new common_1.BadRequestException(`Refund quantity exceeds refundable quantity for sale line ${saleLineId}`);
                }
            }
            const refund = refundRepo.create({
                organizationId: payload.organizationId,
                sale: { id: sale.id },
                refundNumber: payload.refundNumber,
                status: 'posted',
                totalAmount: 0,
                refundDate: payload.refundDate,
                reason: payload.reason,
                refundedByUserId: payload.refundedByUserId,
            });
            const savedRefund = await refundRepo.save(refund);
            const saleLineById = new Map(saleLines.map((line) => [line.id, line]));
            const refundLineEntities = payload.lines.map((line) => {
                const sourceLine = saleLineById.get(line.saleLineId);
                const lineTotal = Number((line.quantity * sourceLine.unitPrice).toFixed(2));
                return refundLineRepo.create({
                    refund: savedRefund,
                    saleLine: sourceLine,
                    quantity: line.quantity,
                    unitPrice: sourceLine.unitPrice,
                    lineTotal,
                });
            });
            const savedRefundLines = await refundLineRepo.save(refundLineEntities);
            const totalAmount = Number(savedRefundLines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2));
            savedRefund.totalAmount = totalAmount;
            await refundRepo.save(savedRefund);
            const saleReturnLocation = await storeStockLocationRepo.findOne({
                where: {
                    organizationId: payload.organizationId,
                    storeId: sale.storeId,
                    purpose: 'sale_return',
                    isActive: true,
                },
                relations: ['stockLocation'],
            });
            if (!saleReturnLocation) {
                throw new common_1.BadRequestException('No active sale_return stock location mapping configured for this store');
            }
            for (const line of refundLineEntities) {
                const sourceLine = line.saleLine;
                const stockBalance = await stockBalanceRepo.findOne({
                    where: {
                        organizationId: payload.organizationId,
                        item: { id: sourceLine.item.id },
                        location: { id: saleReturnLocation.stockLocation.id },
                        lot: sourceLine.lot ? { id: sourceLine.lot.id } : (0, typeorm_2.IsNull)(),
                    },
                    relations: ['item', 'location', 'lot'],
                });
                const upsertBalance = stockBalance ??
                    stockBalanceRepo.create({
                        organizationId: payload.organizationId,
                        item: { id: sourceLine.item.id },
                        location: { id: saleReturnLocation.stockLocation.id },
                        lot: sourceLine.lot ? { id: sourceLine.lot.id } : null,
                        quantityOnHand: 0,
                        quantityReserved: 0,
                        averageCost: 0,
                    });
                upsertBalance.quantityOnHand = Number((upsertBalance.quantityOnHand + line.quantity).toFixed(4));
                const savedBalance = await stockBalanceRepo.save(upsertBalance);
                await stockAdjustmentRepo.save(stockAdjustmentRepo.create({
                    stockBalance: savedBalance,
                    reason: `sale_refund:${savedRefund.refundNumber}`,
                    deltaQuantity: line.quantity,
                    performedByUserId: payload.refundedByUserId,
                    performedAt: payload.refundDate,
                }));
            }
            const receivable = await receivableRepo.findOne({
                where: { organizationId: payload.organizationId, saleId: sale.id },
            });
            if (receivable) {
                if (receivable.status === 'written_off') {
                    throw new common_1.BadRequestException('Cannot auto-credit a written-off receivable; resolve receivable status first');
                }
                const creditAmount = Number(Math.min(totalAmount, receivable.outstandingAmount).toFixed(2));
                if (creditAmount > 0) {
                    receivable.outstandingAmount = Number((receivable.outstandingAmount - creditAmount).toFixed(2));
                    if (receivable.outstandingAmount <= 0) {
                        receivable.outstandingAmount = 0;
                        receivable.status = 'closed';
                        receivable.closedAt = payload.refundDate;
                    }
                    else {
                        receivable.status = 'partially_paid';
                        receivable.closedAt = null;
                    }
                    await receivableRepo.save(receivable);
                    await receivableTxnRepo.save(receivableTxnRepo.create({
                        receivable,
                        transactionType: 'adjustment',
                        amount: -creditAmount,
                        transactionDate: payload.refundDate,
                        paymentMethod: null,
                        referenceNumber: savedRefund.refundNumber,
                        receivedByUserId: payload.refundedByUserId,
                        note: `Auto credit from refund ${savedRefund.refundNumber}`,
                    }));
                }
            }
            const cumulativeRefundLines = await refundLineRepo.find({
                where: {
                    refund: {
                        sale: { id: sale.id },
                        organizationId: payload.organizationId,
                        status: 'posted',
                    },
                },
                relations: ['saleLine', 'refund', 'refund.sale'],
            });
            const cumulativeRefundQtyByLineId = new Map();
            for (const line of cumulativeRefundLines) {
                const key = line.saleLine.id;
                cumulativeRefundQtyByLineId.set(key, Number(((cumulativeRefundQtyByLineId.get(key) ?? 0) + line.quantity).toFixed(4)));
            }
            const saleLinesForStatus = await saleLineRepo.find({ where: { sale: { id: sale.id } }, relations: ['sale'] });
            const isFullyRefunded = saleLinesForStatus.every((line) => {
                const refundedQty = cumulativeRefundQtyByLineId.get(line.id) ?? 0;
                return refundedQty >= line.quantity;
            });
            if (isFullyRefunded && sale.status !== 'refunded') {
                sale.status = 'refunded';
                await saleRepo.save(sale);
            }
            return {
                id: savedRefund.id,
                saleId: sale.id,
                refundNumber: savedRefund.refundNumber,
                status: savedRefund.status,
                totalAmount,
                refundDate: savedRefund.refundDate,
            };
        });
    }
};
exports.TypeormSalesRepository = TypeormSalesRepository;
exports.TypeormSalesRepository = TypeormSalesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_3.SaleOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(item_orm_entity_1.ItemOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_3.UomOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        uom_converter_service_1.UomConverterService,
        users_proxy_service_1.UsersProxyService])
], TypeormSalesRepository);
//# sourceMappingURL=typeorm-sales.repository.js.map