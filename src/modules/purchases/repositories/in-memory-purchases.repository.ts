import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PurchaseOrderOrmEntity } from '../entities/purchase-order.orm-entity';
import { PurchaseOrderLineOrmEntity } from '../entities/purchase-order-line.orm-entity';
import { GoodsReceiptOrmEntity } from '../entities/goods-receipt.orm-entity';
import {
  CreatePurchasePayload,
  GoodsReceiptPayload,
  PurchaseListQuery,
  PurchaseUpdatePayload,
  PurchasesRepository,
  ReceiveGoodsResult,
  ReceiptListQuery,
  UnpostGoodsPayload,
} from './purchases.repository';

@Injectable()
export class InMemoryPurchasesRepository implements PurchasesRepository {
  private readonly purchaseOrders: PurchaseOrderOrmEntity[] = [];
  private readonly purchaseOrderLines: PurchaseOrderLineOrmEntity[] = [];

  async list(query: PurchaseListQuery): Promise<{ items: PurchaseOrderOrmEntity[]; total: number }> {
    let items = this.purchaseOrders.filter((po) => po.organizationId === query.organizationId);
    if (query.status) {
      items = items.filter((po) => po.status === query.status);
    }
    const total = items.length;
    return {
      items: items.slice(query.offset, query.offset + query.limit),
      total,
    };
  }

  async getById(id: string, organizationId: string): Promise<PurchaseOrderOrmEntity | null> {
    const po = this.purchaseOrders.find((p) => p.id === id && p.organizationId === organizationId);
    if (!po) return null;
    po.lines = this.purchaseOrderLines.filter((l) => l.purchaseOrder?.id === po.id);
    return po;
  }

  async create(payload: CreatePurchasePayload): Promise<PurchaseOrderOrmEntity> {
    const id = randomUUID();
    const po = new PurchaseOrderOrmEntity();
    Object.assign(po, {
      id,
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
      createdAt: new Date(),
      updatedAt: new Date(),
      lines: [],
    });
    this.purchaseOrders.push(po);

    const lines = payload.lines.map((line) => {
      const lineEntity = new PurchaseOrderLineOrmEntity();
      Object.assign(lineEntity, {
        id: randomUUID(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      this.purchaseOrderLines.push(lineEntity);
      return lineEntity;
    });
    po.lines = lines;
    return po;
  }

  async update(id: string, organizationId: string, payload: PurchaseUpdatePayload): Promise<PurchaseOrderOrmEntity> {
    const po = this.purchaseOrders.find((p) => p.id === id && p.organizationId === organizationId);
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
    po.updatedAt = new Date();

    if (payload.lines) {
      const oldLineIds = this.purchaseOrderLines
        .filter((l) => l.purchaseOrder?.id === po.id)
        .map((l) => l.id);
      for (const oldId of oldLineIds) {
        const idx = this.purchaseOrderLines.findIndex((l) => l.id === oldId);
        if (idx >= 0) this.purchaseOrderLines.splice(idx, 1);
      }

      po.lines = payload.lines.map((line) => {
        const lineEntity = new PurchaseOrderLineOrmEntity();
        Object.assign(lineEntity, {
          id: randomUUID(),
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
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        this.purchaseOrderLines.push(lineEntity);
        return lineEntity;
      });
    }

    return po;
  }

  async delete(id: string, organizationId: string): Promise<void> {
    const idx = this.purchaseOrders.findIndex((p) => p.id === id && p.organizationId === organizationId);
    if (idx < 0) throw new NotFoundException('Purchase order not found');
    this.purchaseOrders.splice(idx, 1);

    const lineIds = this.purchaseOrderLines
      .filter((l) => l.purchaseOrder?.id === id)
      .map((l) => l.id);
    for (const lineId of lineIds) {
      const li = this.purchaseOrderLines.findIndex((l) => l.id === lineId);
      if (li >= 0) this.purchaseOrderLines.splice(li, 1);
    }
  }

  async receiveGoods(_payload: GoodsReceiptPayload): Promise<ReceiveGoodsResult> {
    return {
      receiptId: '',
      receiptNumber: '',
      poStatus: 'partially_received',
      lines: [],
    };
  }

  async unpostGoods(_payload: UnpostGoodsPayload): Promise<void> {
    // No-op for in-memory
  }

  async listReceipts(query: ReceiptListQuery): Promise<{ items: GoodsReceiptOrmEntity[]; total: number }> {
    return { items: [], total: 0 };
  }

  async findLastReceipt(_organizationId: string): Promise<Pick<GoodsReceiptOrmEntity, 'receiptNumber'> | null> {
    return null;
  }
}
