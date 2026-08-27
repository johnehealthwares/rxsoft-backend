import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, IsNull, Repository } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { UomOrmEntity } from '../../sales/entities';
import {
  StockAdjustmentOrmEntity,
  StockBalanceOrmEntity,
  StockLocationOrmEntity,
  StockMovementOrmEntity,
  WarehouseOrmEntity,
} from '../../inventory/entities';
import { GoodsReceiptLineOrmEntity, GoodsReceiptOrmEntity, PurchaseOrderLineOrmEntity, PurchaseOrderOrmEntity } from '../entities';
import {
  CreatePurchasePayload,
  GoodsReceiptPayload,
  PurchaseListQuery,
  PurchaseUpdatePayload,
  PurchasesAnalytics,
  PurchasesAnalyticsCategory,
  PurchasesAnalyticsLocation,
  PurchasesAnalyticsQuery,
  PurchasesAnalyticsRecentPurchase,
  PurchasesAnalyticsStatus,
  PurchasesAnalyticsSupplier,
  PurchasesAnalyticsTrendPoint,
  PurchasesRepository,
  ReceiveGoodsResult,
  ReceiptListQuery,
  UnpostGoodsPayload,
} from './purchases.repository';

@Injectable()
export class TypeormPurchasesRepository implements PurchasesRepository {
  constructor(
    @InjectRepository(PurchaseOrderOrmEntity)
    private readonly purchaseOrderRepository: Repository<PurchaseOrderOrmEntity>,
    @InjectRepository(PurchaseOrderLineOrmEntity)
    private readonly purchaseOrderLineRepository: Repository<PurchaseOrderLineOrmEntity>,
    @InjectRepository(GoodsReceiptOrmEntity)
    private readonly goodsReceiptRepository: Repository<GoodsReceiptOrmEntity>,
    @InjectRepository(GoodsReceiptLineOrmEntity)
    private readonly goodsReceiptLineRepository: Repository<GoodsReceiptLineOrmEntity>,
    @InjectRepository(StockMovementOrmEntity)
    private readonly stockMovementRepository: Repository<StockMovementOrmEntity>,
    @InjectRepository(StockBalanceOrmEntity)
    private readonly stockBalanceRepository: Repository<StockBalanceOrmEntity>,
    @InjectRepository(StockLocationOrmEntity)
    private readonly stockLocationRepository: Repository<StockLocationOrmEntity>,
    @InjectRepository(WarehouseOrmEntity)
    private readonly warehouseRepository: Repository<WarehouseOrmEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async list(query: PurchaseListQuery): Promise<{ items: PurchaseOrderOrmEntity[]; total: number }> {
    const qb = this.purchaseOrderRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.lines', 'line')
      .where('purchase.organization_id = :organizationId', { organizationId: query.organizationId })
      .orderBy('purchase.created_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.status) {
      qb.andWhere('purchase.status = :status', { status: query.status });
    }

    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  async getById(id: string, organizationId: string): Promise<PurchaseOrderOrmEntity | null> {
    return this.purchaseOrderRepository.findOne({
      where: { id, organizationId },
      relations: ['lines'],
    });
  }

  async create(payload: CreatePurchasePayload): Promise<PurchaseOrderOrmEntity> {
    return this.dataSource.transaction(async (manager) => {
      const poRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const poLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);

      const po = poRepo.create({
        organizationId: payload.organizationId,
        purchaseOrderNumber: payload.purchaseOrderNumber,
        supplierId: payload.supplierId,
        warehouseId: payload.warehouseId,
        currencyCode: payload.currencyCode,
        orderDate: payload.orderDate,
        expectedDate: payload.expectedDate,
        status: payload.status,
        subtotalAmount: payload.subtotalAmount,
        taxAmount: payload.taxAmount,
        totalAmount: payload.totalAmount,
        createdByUserId: payload.createdByUserId,
        approvedByUserId: payload.approvedByUserId,
        approvedAt: payload.approvedAt,
        note: payload.note,
      });
      const savedPo = await poRepo.save(po);

      if (payload.lines.length) {
        const lineEntities = payload.lines.map((line) =>
          poLineRepo.create({
            purchaseOrder: savedPo,
            itemId: line.itemId,
            orderedQty: line.orderedQty,
            receivedQty: line.receivedQty,
            uomId: line.uomId,
            unitCost: line.unitCost,
            discountPercent: line.discountPercent,
            taxPercent: line.taxPercent,
            lineSubtotal: line.lineSubtotal,
            lineTotal: line.lineTotal,
          }),
        );
        savedPo.lines = await poLineRepo.save(lineEntities);
      }

      return savedPo;
    });
  }

  async update(id: string, organizationId: string, payload: PurchaseUpdatePayload): Promise<PurchaseOrderOrmEntity> {
    return this.dataSource.transaction(async (manager) => {
      const poRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const poLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);

      const po = await poRepo.findOne({
        where: { id, organizationId },
        relations: ['lines'],
      });
      if (!po) throw new NotFoundException('Purchase order not found');

      if (payload.supplierId !== undefined) po.supplierId = payload.supplierId;
      if (payload.warehouseId !== undefined) po.warehouseId = payload.warehouseId;
      if (payload.purchaseOrderNumber !== undefined) po.purchaseOrderNumber = payload.purchaseOrderNumber;
      if (payload.currencyCode !== undefined) po.currencyCode = payload.currencyCode;
      if (payload.orderDate !== undefined) po.orderDate = payload.orderDate;
      if (payload.expectedDate !== undefined) po.expectedDate = payload.expectedDate;
      if (payload.status !== undefined) po.status = payload.status;
      if (payload.subtotalAmount !== undefined) po.subtotalAmount = payload.subtotalAmount;
      if (payload.taxAmount !== undefined) po.taxAmount = payload.taxAmount;
      if (payload.totalAmount !== undefined) po.totalAmount = payload.totalAmount;
      if (payload.createdByUserId !== undefined) po.createdByUserId = payload.createdByUserId;
      if (payload.approvedByUserId !== undefined) po.approvedByUserId = payload.approvedByUserId;
      if (payload.approvedAt !== undefined) po.approvedAt = payload.approvedAt;
      if (payload.note !== undefined) po.note = payload.note;

      if (payload.lines) {
        await poLineRepo.delete({ purchaseOrder: { id: po.id } });
        po.lines = await poLineRepo.save(
          payload.lines.map((line) =>
            poLineRepo.create({
              purchaseOrder: po,
              itemId: line.itemId,
              orderedQty: line.orderedQty,
              receivedQty: line.receivedQty,
              uomId: line.uomId,
              unitCost: line.unitCost,
              discountPercent: line.discountPercent,
              taxPercent: line.taxPercent,
              lineSubtotal: line.lineSubtotal,
              lineTotal: line.lineTotal,
            }),
          ),
        );
      }

      return poRepo.save(po);
    });
  }

  async delete(id: string, organizationId: string): Promise<void> {
    const result = await this.purchaseOrderRepository.delete({ id, organizationId });
    if (!result.affected) throw new NotFoundException('Purchase order not found');
  }

  async receiveGoods(payload: GoodsReceiptPayload): Promise<ReceiveGoodsResult> {
    return this.dataSource.transaction(async (manager) => {
      const poRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const poLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);
      const grRepo = manager.getRepository(GoodsReceiptOrmEntity);
      const grLineRepo = manager.getRepository(GoodsReceiptLineOrmEntity);
      const movementRepo = manager.getRepository(StockMovementOrmEntity);
      const balanceRepo = manager.getRepository(StockBalanceOrmEntity);
      const adjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);
      const warehouseRepo = manager.getRepository(WarehouseOrmEntity);
      const locationRepo = manager.getRepository(StockLocationOrmEntity);
      const itemRepo2 = manager.getRepository(ItemOrmEntity);
      const uomRepo = manager.getRepository(UomOrmEntity);

      const itemIds = [...new Set(payload.lines.map((l) => l.itemId))];
      const grItems = await itemRepo2.find({
        where: { id: In(itemIds) },
        select: ['id', 'baseUomId'],
      });
      const itemBaseUomMap = new Map(grItems.map((i) => [i.id, i.baseUomId]));

      const uomIds = [...new Set(payload.lines.map((l) => l.uomId))];
      const grUoms = await uomRepo.find({ where: { id: In(uomIds) } });
      const uomFactorMap = new Map(grUoms.map((u) => [u.id, u.factor]));

      const po = await poRepo.findOne({
        where: { id: payload.purchaseOrderId, organizationId: payload.organizationId },
        relations: ['lines'],
      });
      if (!po) throw new NotFoundException('Purchase order not found');
      if (po.status !== 'approved' && po.status !== 'partially_received') {
        throw new BadRequestException('Purchase order must be in approved or partially_received status to receive goods');
      }

      for (const incomingLine of payload.lines) {
        const poLine = po.lines.find((l) => l.itemId === incomingLine.itemId);
        if (!poLine) {
          throw new BadRequestException(`Item ${incomingLine.itemId} not found on purchase order`);
        }
        const newReceivedQty = Number(poLine.receivedQty) + Number(incomingLine.receivedQty);
        if (newReceivedQty > Number(poLine.orderedQty)) {
          throw new BadRequestException(
            `Received quantity for item ${incomingLine.itemId} exceeds ordered quantity`,
          );
        }
      }

      const gr = grRepo.create({
        organizationId: payload.organizationId,
        receiptNumber: payload.receiptNumber,
        purchaseOrder: po,
        receivedDate: payload.receivedDate,
        createdByUserId: payload.createdByUserId,
        note: payload.note,
      });
      const savedGr = await grRepo.save(gr);

      const savedGrLines = await grLineRepo.save(
        payload.lines.map((line) =>
          grLineRepo.create({
            goodsReceipt: savedGr,
            itemId: line.itemId,
            orderedQty: line.orderedQty,
            receivedQty: line.receivedQty,
            uomId: line.uomId,
            unitCost: line.unitCost,
          }),
        ),
      );

      for (const incomingLine of payload.lines) {
        const poLine = po.lines.find((l) => l.itemId === incomingLine.itemId)!;
        poLine.receivedQty = Number(poLine.receivedQty) + Number(incomingLine.receivedQty);
        // Persist the cost that was applied at receive time back onto the PO
        // line so the order reflects the actual goods-intake cost.
        if (incomingLine.unitCost !== undefined && Number(incomingLine.unitCost) > 0) {
          poLine.unitCost = Number(incomingLine.unitCost);
          poLine.lineSubtotal = Number(
            (Number(poLine.orderedQty) * Number(poLine.unitCost)
              * (1 - Number(poLine.discountPercent ?? 0) / 100)).toFixed(2),
          );
          poLine.lineTotal = Number(
            (Number(poLine.lineSubtotal)
              * (1 + Number(poLine.taxPercent ?? 0) / 100)).toFixed(2),
          );
        }
      }
      await poLineRepo.save(po.lines);

      const allFullyReceived = po.lines.every(
        (line) => Number(line.receivedQty) >= Number(line.orderedQty),
      );
      po.status = allFullyReceived ? 'received' : 'partially_received';

      // Recompute PO totals from the (possibly cost-updated) lines.
      po.subtotalAmount = Number(po.lines.reduce((s, l) => s + Number(l.lineSubtotal ?? 0), 0).toFixed(2));
      po.taxAmount = Number(po.lines.reduce((s, l) => s + (Number(l.lineTotal ?? 0) - Number(l.lineSubtotal ?? 0)), 0).toFixed(2));
      po.totalAmount = Number(po.lines.reduce((s, l) => s + Number(l.lineTotal ?? 0), 0).toFixed(2));
      await poRepo.save(po);

      const warehouse = await warehouseRepo.findOne({
        where: { id: po.warehouseId, organizationId: payload.organizationId },
        relations: ['stockLocations'],
      });
      if (!warehouse) throw new BadRequestException('Warehouse not found');

      let stockLocation = warehouse.stockLocations?.find(
        (loc) => loc.locationType === 'internal' && loc.isActive,
      );
      if (!stockLocation) {
        stockLocation = await locationRepo.findOne({
          where: { warehouseId: warehouse.id, locationType: 'internal', isActive: true, organizationId: payload.organizationId },
        }) ?? undefined;
      }
      if (!stockLocation) {
        stockLocation = locationRepo.create({
          organizationId: payload.organizationId,
          warehouseId: warehouse.id,
          code: `${warehouse.code}-RECEIVING`,
          name: `Receiving location for ${warehouse.name}`,
          locationType: 'internal',
          isActive: true,
        });
        stockLocation = await locationRepo.save(stockLocation);
      }

      for (const incomingLine of payload.lines) {
        const lineUomFactor = uomFactorMap.get(incomingLine.uomId) ?? 1;
        const baseUomId = itemBaseUomMap.get(incomingLine.itemId);
        const baseUomFactor = baseUomId ? (uomFactorMap.get(baseUomId) ?? 1) : 1;
        const baseQty = Number((incomingLine.receivedQty * lineUomFactor / baseUomFactor).toFixed(4));

        await movementRepo.save(
          movementRepo.create({
            organizationId: payload.organizationId,
            inventoryDocumentId: savedGr.id,
            inventoryDocumentLineId: null,
            item: { id: incomingLine.itemId },
            lot: null,
            fromLocation: null,
            toLocation: { id: stockLocation.id },
            movementType: 'in',
            quantity: baseQty,
            unitCost: incomingLine.unitCost,
            occurredAt: payload.receivedDate,
            createdByUserId: payload.createdByUserId,
          }),
        );

        let balance = await balanceRepo.findOne({
          where: {
            organizationId: payload.organizationId,
            item: { id: incomingLine.itemId },
            location: { id: stockLocation.id },
            lot: IsNull(),
          },
          relations: ['item', 'location'],
        });

        const upsertBalance =
          balance ??
          balanceRepo.create({
            organizationId: payload.organizationId,
            item: { id: incomingLine.itemId },
            location: { id: stockLocation.id },
            lot: null,
            quantityOnHand: 0,
            quantityReserved: 0,
            averageCost: 0,
          });

        const oldQty = upsertBalance.quantityOnHand;
        const newQty = Number((oldQty + baseQty).toFixed(4));
        upsertBalance.quantityOnHand = newQty;
        upsertBalance.averageCost = oldQty + baseQty > 0
          ? Number(((oldQty * upsertBalance.averageCost + baseQty * incomingLine.unitCost) / (oldQty + baseQty)).toFixed(4))
          : incomingLine.unitCost;
        const savedBalance = await balanceRepo.save(upsertBalance);

        await adjustmentRepo.save(
          adjustmentRepo.create({
            stockBalance: savedBalance,
            reason: `goods_receipt:${savedGr.receiptNumber}`,
            deltaQuantity: baseQty,
            performedByUserId: payload.createdByUserId,
            performedAt: payload.receivedDate,
          }),
        );
      }

      return {
        receiptId: savedGr.id,
        receiptNumber: savedGr.receiptNumber,
        poStatus: po.status,
        lines: savedGrLines.map((l) => ({
          itemId: l.itemId,
          receiptLineId: l.id,
          receivedQty: Number(l.receivedQty),
        })),
      };
    });
  }

  async unpostGoods(payload: UnpostGoodsPayload): Promise<void> {
    const line = await this.goodsReceiptLineRepository.findOne({
      where: { id: payload.receiptLineId },
      relations: ['goodsReceipt', 'goodsReceipt.purchaseOrder'],
    });
    if (!line) throw new NotFoundException('Goods receipt line not found');
    if (line.isUnposted) throw new BadRequestException('Goods receipt line is already unposted');

    const receipt = line.goodsReceipt;
    const po = receipt?.purchaseOrder;
    const baseQty = Number(line.receivedQty);

    const stockMovement = await this.stockMovementRepository.findOne({
      where: {
        inventoryDocumentId: receipt.id,
        inventoryDocumentLineId: line.id,
        movementType: 'in',
      },
    });
    if (!stockMovement) {
      await this.goodsReceiptLineRepository.update(line.id, { isUnposted: true });
      return;
    }

    const toLocation = stockMovement.toLocation;
    if (!toLocation) {
      throw new BadRequestException('Cannot unpost: original stock movement has no source location');
    }

    await this.dataSource.transaction(async (manager) => {
      const movementRepo = manager.getRepository(StockMovementOrmEntity);
      const balanceRepo = manager.getRepository(StockBalanceOrmEntity);
      const adjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);
      const grLineRepo = manager.getRepository(GoodsReceiptLineOrmEntity);
      const poLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);
      const poRepo = manager.getRepository(PurchaseOrderOrmEntity);

      await movementRepo.save(
        movementRepo.create({
          organizationId: payload.organizationId,
          inventoryDocumentId: receipt.id,
          inventoryDocumentLineId: line.id,
          item: { id: line.itemId },
          lot: null,
          fromLocation: toLocation,
          toLocation: null,
          movementType: 'out',
          quantity: baseQty,
          unitCost: line.unitCost,
          occurredAt: new Date(),
          createdByUserId: payload.performedByUserId,
        }),
      );

      const balance = await balanceRepo.findOne({
        where: {
          organizationId: payload.organizationId,
          item: { id: line.itemId },
          location: { id: toLocation.id },
        },
        relations: ['item', 'location'],
      });
      if (balance) {
        balance.quantityOnHand = Number(Math.max(0, balance.quantityOnHand - baseQty).toFixed(4));
        const savedBalance = await balanceRepo.save(balance);

        await adjustmentRepo.save(
          adjustmentRepo.create({
            stockBalance: savedBalance,
            reason: `goods_unpost:${receipt.receiptNumber}`,
            deltaQuantity: -baseQty,
            performedByUserId: payload.performedByUserId,
            performedAt: new Date(),
          }),
        );
      }

      await grLineRepo.update(line.id, { isUnposted: true });

      const poId = po?.id;
      if (!poId) return;

      const allPoLines = await poLineRepo.find({
        where: { itemId: line.itemId },
        relations: ['purchaseOrder'],
      });

      const matchedPoLines = allPoLines.filter(
        (pl) => pl.purchaseOrder?.id === poId,
      );

      for (const pl of matchedPoLines) {
        pl.receivedQty = Number(Math.max(0, pl.receivedQty - baseQty).toFixed(3));
        await poLineRepo.save(pl);
      }

      const totalOrdered = matchedPoLines.reduce((s, l) => s + Number(l.orderedQty), 0);
      const totalReceived = matchedPoLines.reduce((s, l) => s + Number(l.receivedQty), 0);
      const newStatus = totalReceived <= 0 ? 'approved' : totalReceived < totalOrdered ? 'partially_received' : 'received';
      if (poId) {
        await poRepo.update(poId, { status: newStatus as any });
      }
    });
  }

  async listReceipts(query: ReceiptListQuery): Promise<{ items: GoodsReceiptOrmEntity[]; total: number }> {
    const qb = this.goodsReceiptRepository
      .createQueryBuilder('receipt')
      .leftJoinAndSelect('receipt.lines', 'lines')
      .leftJoinAndSelect('receipt.purchaseOrder', 'purchaseOrder')
      .where('receipt.organization_id = :organizationId', { organizationId: query.organizationId });

    if (query.purchaseOrderId) {
      qb.andWhere('receipt.purchase_order_id = :purchaseOrderId', { purchaseOrderId: query.purchaseOrderId });
    }

    if (query.search) {
      qb.andWhere(
        '(receipt.receipt_number ILIKE :search OR purchaseOrder.purchase_order_number ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy('receipt.createdAt', 'DESC').skip(query.offset).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  async findLastReceipt(organizationId: string): Promise<Pick<GoodsReceiptOrmEntity, 'receiptNumber'> | null> {
    const receipt = await this.goodsReceiptRepository.findOne({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      select: ['receiptNumber'],
    });
    return receipt ?? null;
  }

  /**
   * Aggregates the Purchases Analytics dashboard payload in one pass. Applies the
   * same tenant + date/warehouse/supplier/category filters to every sub-series so
   * the KPI cards and chart segments reconcile.
   */
  async getAnalytics(query: PurchasesAnalyticsQuery): Promise<PurchasesAnalytics> {
    const [summary, itemsPurchased, trendRows, categoryRows, supplierRows, locationRows, statusRows, recentRows] =
      await Promise.all([
        this.buildAnalyticsBaseQb(query)
          .leftJoin('purchase.lines', 'po_line')
          .select('COUNT(DISTINCT purchase.id)', 'totalPOs')
          .addSelect('COALESCE(SUM(po_line.line_total), 0)', 'totalValue')
          .addSelect('COUNT(DISTINCT purchase.supplier_id)', 'activeSuppliers')
          .getRawOne<{ totalPOs: string; totalValue: string; activeSuppliers: string }>(),
        this.buildAnalyticsBaseQb(query)
          .leftJoin('purchase.lines', 'po_line')
          .select('COALESCE(SUM(po_line.ordered_qty), 0)', 'itemsPurchased')
          .getRawOne<{ itemsPurchased: string }>(),
        this.buildAnalyticsBaseQb(query)
          .leftJoin('purchase.lines', 'po_line')
          .select("TO_CHAR(purchase.order_date, 'YYYY-MM-DD')", 'day')
          .addSelect('COUNT(DISTINCT purchase.id)', 'orders')
          .addSelect('COALESCE(SUM(po_line.line_total), 0)', 'value')
          .groupBy('day')
          .orderBy('day', 'ASC')
          .getRawMany<{ day: string; orders: string; value: string }>(),
        this.buildAnalyticsBaseQb(query)
          .innerJoin('purchase.lines', 'po_line')
          .innerJoin('po_line.item', 'item')
          .innerJoin('item.category', 'cat')
          .select([
            'cat.code AS code',
            'cat.name AS name',
            'COALESCE(SUM(po_line.line_total), 0) AS value',
          ])
          .groupBy('cat.code')
          .addGroupBy('cat.name')
          .orderBy('value', 'DESC')
          .limit(5)
          .getRawMany<{ code: string; name: string; value: string }>(),
        this.buildAnalyticsBaseQb(query)
          .leftJoin('purchase.lines', 'po_line')
          .innerJoin('purchase.supplier', 'supplier')
          .select([
            'purchase.supplier_id AS supplierId',
            'supplier.name AS name',
            'COALESCE(SUM(po_line.line_total), 0) AS value',
          ])
          .groupBy('purchase.supplier_id')
          .addGroupBy('supplier.name')
          .orderBy('value', 'DESC')
          .getRawMany<{ supplierId: string; name: string; value: string }>(),
        this.buildAnalyticsBaseQb(query)
          .leftJoin('purchase.lines', 'po_line')
          .leftJoin(WarehouseOrmEntity, 'warehouse', 'warehouse.id = purchase.warehouse_id')
          .select([
            'purchase.warehouse_id AS warehouseId',
            "COALESCE(warehouse.name, 'Unassigned') AS name",
            'COALESCE(SUM(po_line.line_total), 0) AS value',
          ])
          .groupBy('purchase.warehouse_id')
          .addGroupBy('warehouse.name')
          .orderBy('value', 'DESC')
          .getRawMany<{ warehouseId: string; name: string; value: string }>(),
        this.buildAnalyticsBaseQb(query)
          .select('purchase.status AS status')
          .addSelect('COUNT(DISTINCT purchase.id) AS count')
          .groupBy('purchase.status')
          .getRawMany<{ status: string; count: string }>(),
        this.purchaseOrderRepository
          .createQueryBuilder('purchase')
          .leftJoin('purchase.lines', 'po_line')
          .leftJoin('purchase.supplier', 'supplier')
          .select('purchase.id', 'id')
          .addSelect('purchase.purchase_order_number', 'purchaseOrderNumber')
          .addSelect("TO_CHAR(purchase.order_date, 'YYYY-MM-DD')", 'orderDate')
          .addSelect('purchase.status', 'status')
          .addSelect('COALESCE(SUM(po_line.line_total), 0)', 'totalAmount')
          .addSelect('supplier.name', 'supplierName')
          .where('purchase.organization_id = :organizationId', { organizationId: query.organizationId })
          .groupBy('purchase.id')
          .addGroupBy('purchase.purchase_order_number')
          .addGroupBy('purchase.order_date')
          .addGroupBy('purchase.status')
          .addGroupBy('supplier.name')
          .orderBy('purchase.order_date', 'DESC')
          .take(5)
          .getRawMany<{
            id: string;
            purchaseOrderNumber: string;
            orderDate: string;
            status: string;
            totalAmount: string;
            supplierName: string | null;
          }>(),
      ]);

    const totalPOs = Number(summary?.totalPOs ?? 0);
    const totalValue = Number(summary?.totalValue ?? 0);

    const trend: PurchasesAnalyticsTrendPoint[] = (trendRows ?? []).map((row) => ({
      day: row.day,
      value: Number(row.value),
      orders: Number(row.orders),
    }));

    const byCategory: PurchasesAnalyticsCategory[] = (categoryRows ?? []).map((row) => ({
      code: row.code,
      name: row.name,
      value: Number(row.value),
      pct: totalValue > 0 ? Number(((Number(row.value) / totalValue) * 100).toFixed(1)) : 0,
    }));

    const bySupplier: PurchasesAnalyticsSupplier[] = (supplierRows ?? []).map((row) => ({
      supplierId: row.supplierId,
      name: row.name,
      value: Number(row.value),
    }));

    const byLocation: PurchasesAnalyticsLocation[] = (locationRows ?? []).map((row) => ({
      warehouseId: row.warehouseId,
      name: row.name,
      value: Number(row.value),
      pct: totalValue > 0 ? Number(((Number(row.value) / totalValue) * 100).toFixed(1)) : 0,
    }));

    const byStatus: PurchasesAnalyticsStatus[] = (statusRows ?? []).map((row) => ({
      status: row.status,
      count: Number(row.count),
    }));

    const recent: PurchasesAnalyticsRecentPurchase[] = (recentRows ?? []).map((po) => ({
      id: po.id,
      purchaseOrderNumber: po.purchaseOrderNumber,
      orderDate: po.orderDate,
      status: po.status,
      totalAmount: Number(po.totalAmount),
      supplierName: po.supplierName ?? null,
    }));

    return {
      summary: {
        totalValue,
        totalPOs,
        itemsPurchased: Number(itemsPurchased?.itemsPurchased ?? 0),
        averagePOValue: totalPOs > 0 ? Number((totalValue / totalPOs).toFixed(2)) : 0,
        activeSuppliers: Number(summary?.activeSuppliers ?? 0),
        topSupplier: bySupplier[0] ? { ...bySupplier[0] } : null,
      },
      trend,
      byCategory,
      bySupplier,
      byLocation,
      byStatus,
      recent,
    };
  }

  private buildAnalyticsBaseQb(
    query: PurchasesAnalyticsQuery,
  ): import('typeorm').SelectQueryBuilder<PurchaseOrderOrmEntity> {
    const qb = this.purchaseOrderRepository.createQueryBuilder('purchase');

    if (query.organizationId) {
      qb.andWhere('purchase.organization_id = :organizationId', { organizationId: query.organizationId });
    }
    if (query.from) {
      qb.andWhere('purchase.order_date >= :from', { from: query.from });
    }
    if (query.to) {
      qb.andWhere('purchase.order_date <= :to', { to: query.to });
    }
    if (query.warehouseId) {
      qb.andWhere('purchase.warehouse_id = :warehouseId', { warehouseId: query.warehouseId });
    }
    if (query.supplierId) {
      qb.andWhere('purchase.supplier_id = :supplierId', { supplierId: query.supplierId });
    }
    if (query.categoryCode) {
      qb.andWhere(
        `EXISTS (SELECT 1 FROM purchase_order_lines pol_c
           INNER JOIN items it ON it.id = pol_c.item_id
           INNER JOIN item_categories cat ON cat.id = it.category_id
           WHERE pol_c.purchase_order_id = purchase.id AND cat.code = :categoryCode)`,
        { categoryCode: query.categoryCode },
      );
    }

    return qb;
  }
}
