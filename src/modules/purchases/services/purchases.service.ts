import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { DEFAULT_SYSTEM_USER_ID, DEFAULT_UOM_ID } from '../../../shared/constants/persistence-scope';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { WarehouseOrmEntity } from '../../inventory/entities';
import { OrganisationItemOrmEntity } from '../../catalog/entities/organisation-item.orm-entity';
import { CreatePurchaseDto, CreatePurchaseLineDto, PurchaseLineDto, UpdatePurchaseDto, UpdatePurchaseLineDto } from '../dto/purchases.dto';
import { PurchaseOrderLineOrmEntity, PurchaseOrderOrmEntity } from '../entities';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

type PurchaseSummaryType = {
  id: string;
  supplierId: string;
  warehouseId: string;
  branchId: string;
  supplier: { id: string; name: string } | null;
  warehouse: { id: string; name: string } | null;
  currencyCode: string;
  orderDate: string;
  expectedDate: string | null;
  totalCost: number;
  invoiceNumber: string;
  status: 'draft' | 'approved' | 'partially_received' | 'received' | 'cancelled';
  note: string | null;
  lines: Array<{
    id: string;
    itemId: string;
    itemCode: string;
    itemName: string;
    orderedQty: number;
    receivedQty: number;
    uomId: string;
    unitCost: number;
    discountPercent: number;
    taxPercent: number;
    lineSubtotal: number;
    lineTotal: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: null;
};

@Injectable()
export class PurchasesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(PurchaseOrderOrmEntity)
    private readonly purchaseOrderRepository: Repository<PurchaseOrderOrmEntity>,
    @InjectRepository(PurchaseOrderLineOrmEntity)
    private readonly purchaseOrderLineRepository: Repository<PurchaseOrderLineOrmEntity>,
    @InjectRepository(WarehouseOrmEntity)
    private readonly warehouseRepository: Repository<WarehouseOrmEntity>,
    @InjectRepository(OrganisationItemOrmEntity)
    private readonly orgItemRepository: Repository<OrganisationItemOrmEntity>,
  ) {}

  async list(query: ListQueryDto, organizationId): Promise<{ data: PurchaseSummaryType[]; total: number }> {
    const qb = this.purchaseOrderRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.lines', 'line')
      .leftJoinAndSelect('line.item', 'lineItem')
      .leftJoinAndSelect('line.uom', 'lineUom')
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
    console.log({query}, qb.getSql())
    qb
    .orderBy(this.resolveSortColumn(query.sortBy), query.sortOrder.toUpperCase() as 'ASC' | 'DESC')
      .skip(query.offset)
      .take(query.limit);
          console.log({query}, qb.getSql())

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

  async createPurchase(payload: CreatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType> {
    console.log({payload})
    const userPurchaseOrderNumber = payload.purchaseOrderNumber?.trim() || payload.invoiceNumber?.trim();
    if (userPurchaseOrderNumber) {
      const last = await this.purchaseOrderRepository.findOne({
        where: { organizationId: currentUser.organizationId },
        order: { createdAt: 'DESC' },
        select: ['purchaseOrderNumber'],
      });
      const { valid, expectedCode } = validateSequentialCode({
        providedCode: userPurchaseOrderNumber,
        lastCode: last?.purchaseOrderNumber,
        override: payload.overrideCodeValidation,
      });
      if (!valid) {
        throw new BadRequestException(`Invalid code '${userPurchaseOrderNumber}'. Expected '${expectedCode}'.`);
      }
    }
    console.log('here')
    return this.dataSource.transaction(async (manager) => {
      const purchaseOrderRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const purchaseOrderLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);
      const warehouseRepo = manager.getRepository(WarehouseOrmEntity);

      const warehouse = await this.resolveWarehouse(payload.warehouseId ?? payload.branchId ?? '', warehouseRepo, currentUser.organizationId);
      const linesPayload = this.normalizeLines(payload);
      await this.assertItemsOrgAdded(linesPayload.map((l) => l.itemId), currentUser.organizationId);
      const totals = this.calculateTotals(linesPayload);
      const purchaseOrderNumber = userPurchaseOrderNumber || `PO-${Date.now()}`;

      const purchaseOrder = await purchaseOrderRepo.save(
        purchaseOrderRepo.create({
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
          createdByUserId: currentUser.sub ?? DEFAULT_SYSTEM_USER_ID,
          approvedByUserId: payload.status === 'approved' || payload.status === 'received' ? currentUser.sub ?? DEFAULT_SYSTEM_USER_ID : null,
          approvedAt: payload.status === 'approved' || payload.status === 'received' ? new Date() : null,
          note: payload.note ?? null,
        }),
      );
            console.log('here...1', {purchaseOrder})

      const pol = await purchaseOrderLineRepo.save(
        linesPayload.map((line) =>
          purchaseOrderLineRepo.create({
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
          }),
        ),
      );
      console.log('here...2', {pol})
      return this.getById(purchaseOrder.id, currentUser.organizationId, manager);
    });
  }

  private async resolveWarehouse(idOrCode: string, repo: Repository<WarehouseOrmEntity>, organizationId: string): Promise<WarehouseOrmEntity> {
    if (!idOrCode) throw new BadRequestException('warehouseId is required');
    const byId = await repo.findOne({ where: { id: idOrCode, organizationId } });
    if (byId) {
      return byId;
    }

    const byCode = await repo.findOne({ where: { code: idOrCode, organizationId } });
    if (byCode) {
      return byCode;
    }

    return repo.save(
      repo.create({
        organizationId,
        storeId: null,
        code: idOrCode,
        name: `Warehouse ${idOrCode}`,
        isActive: true,
      }),
    );
  }

  async getById(purchaseId: string, organizationId, manager?: EntityManager): Promise<PurchaseSummaryType> {
    const repo = manager ? manager.getRepository(PurchaseOrderOrmEntity) : this.purchaseOrderRepository;
    const row = await repo.findOne({
      where: { id: purchaseId, organizationId },
      relations: ['lines', 'lines.item', 'lines.uom', 'warehouse', 'supplier'],
    });

    if (!row) {
      throw new NotFoundException('Purchase order not found');
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

  async updatePurchase(purchaseId: string, payload: UpdatePurchaseDto, currentUser: RequestUser): Promise<PurchaseSummaryType> {
    return this.dataSource.transaction(async (manager) => {
      const purchaseOrderRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const purchaseOrderLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);
      const warehouseRepo = manager.getRepository(WarehouseOrmEntity);

      const order = await purchaseOrderRepo.findOne({
        where: { id: purchaseId, organizationId: currentUser.organizationId },
        relations: ['lines'],
      });
      if (!order) throw new NotFoundException('Purchase order not found');

      if (payload.supplierId !== undefined) order.supplierId = payload.supplierId;
      if (payload.warehouseId !== undefined || payload.branchId !== undefined) {
        const warehouse = await this.resolveWarehouse(payload.warehouseId ?? payload.branchId ?? '', warehouseRepo, currentUser.organizationId);
        order.warehouseId = warehouse.id;
      }
      if (payload.purchaseOrderNumber !== undefined) order.purchaseOrderNumber = payload.purchaseOrderNumber;
      if (payload.invoiceNumber !== undefined && payload.purchaseOrderNumber === undefined) order.purchaseOrderNumber = payload.invoiceNumber;
      if (payload.currencyCode !== undefined) order.currencyCode = payload.currencyCode;
      if (payload.orderDate !== undefined) order.orderDate = payload.orderDate;
      if (payload.expectedDate !== undefined) order.expectedDate = payload.expectedDate ?? null;
      if (payload.status !== undefined) {
        order.status = payload.status;
        order.approvedByUserId =
          payload.status === 'approved' || payload.status === 'received' ? currentUser.sub ?? DEFAULT_SYSTEM_USER_ID : order.approvedByUserId;
        order.approvedAt = payload.status === 'approved' || payload.status === 'received' ? new Date() : order.approvedAt;
      }
      if (payload.note !== undefined) order.note = payload.note ?? null;

      if (payload.lines || payload.itemId || payload.quantity || payload.unitCost) {
        await purchaseOrderLineRepo.delete({ purchaseOrder: { id: order.id } });
        const linesPayload = this.normalizeLines(payload);
        await this.assertItemsOrgAdded(linesPayload.map((l) => l.itemId), currentUser.organizationId);
        const totals = this.calculateTotals(linesPayload);
        order.subtotalAmount = totals.subtotalAmount;
        order.taxAmount = totals.taxAmount;
        order.totalAmount = totals.totalAmount;
        order.lines = await purchaseOrderLineRepo.save(
          linesPayload.map((line) =>
            purchaseOrderLineRepo.create({
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
            }),
          ),
        );
      }

      const saved = await purchaseOrderRepo.save(order);
      return this.getById(saved.id, currentUser.organizationId, manager);
    });
  }

  async removePurchase(purchaseId: string, organizationId): Promise<void> {
    const result = await this.purchaseOrderRepository.delete({ id: purchaseId, organizationId });
    if (!result.affected) throw new NotFoundException('Purchase order not found');
  }

  async addLine(purchaseId: string, payload: CreatePurchaseLineDto, currentUser: RequestUser): Promise<PurchaseSummaryType> {
    return this.dataSource.transaction(async (manager) => {
      const poRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const poLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);

      const order = await poRepo.findOne({
        where: { id: purchaseId, organizationId: currentUser.organizationId },
        relations: ['lines', 'lines.item'],
      });
      if (!order) throw new NotFoundException('Purchase order not found');
      if (order.status !== 'draft') {
        throw new ForbiddenException('Lines can only be added to draft purchase orders');
      }

      await this.assertItemsOrgAdded([payload.itemId], currentUser.organizationId);

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

      const totals = this.calculateTotals(
        order.lines.map((l) => ({
          itemId: l.itemId,
          orderedQty: Number(l.orderedQty),
          receivedQty: Number(l.receivedQty),
          uomId: l.uomId,
          unitCost: Number(l.unitCost),
          discountPercent: Number(l.discountPercent),
          taxPercent: Number(l.taxPercent),
        })),
      );
      order.subtotalAmount = totals.subtotalAmount;
      order.taxAmount = totals.taxAmount;
      order.totalAmount = totals.totalAmount;
      await poRepo.save(order);

      return this.getById(purchaseId, currentUser.organizationId, manager);
    });
  }

  async updateLine(purchaseId: string, lineId: string, payload: UpdatePurchaseLineDto, currentUser: RequestUser): Promise<PurchaseSummaryType> {
    return this.dataSource.transaction(async (manager) => {
      const poRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const poLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);

      const order = await poRepo.findOne({
        where: { id: purchaseId, organizationId: currentUser.organizationId },
        relations: ['lines', 'lines.item'],
      });
      if (!order) throw new NotFoundException('Purchase order not found');

      const line = order.lines.find((l) => l.id === lineId);
      if (!line) throw new NotFoundException('Purchase order line not found');

      const status = order.status;
      const isReceived = Number(line.receivedQty) >= Number(line.orderedQty);

      if (status === 'received' || status === 'cancelled') {
        throw new ForbiddenException('Cannot modify lines on received or cancelled purchase orders');
      }

      if (status === 'approved' || status === 'partially_received') {
        const allowedFields = new Set<string>();
        allowedFields.add('unitCost');
        if (!isReceived) {
          allowedFields.add('receivedQty');
        }
        if (payload.orderedQty !== undefined && !allowedFields.has('orderedQty')) {
          throw new ForbiddenException('Cannot change ordered quantity in approved status');
        }
        if (payload.uomId !== undefined && !allowedFields.has('uomId')) {
          throw new ForbiddenException('Cannot change UOM in approved status');
        }
        if (payload.discountPercent !== undefined && !allowedFields.has('discountPercent')) {
          throw new ForbiddenException('Cannot change discount in approved status');
        }
        if (payload.taxPercent !== undefined && !allowedFields.has('taxPercent')) {
          throw new ForbiddenException('Cannot change tax in approved status');
        }
      }

      if (payload.orderedQty !== undefined) line.orderedQty = payload.orderedQty;
      if (payload.uomId !== undefined) line.uomId = payload.uomId;
      if (payload.unitCost !== undefined) line.unitCost = payload.unitCost;
      if (payload.receivedQty !== undefined) line.receivedQty = payload.receivedQty;
      if (payload.discountPercent !== undefined) line.discountPercent = payload.discountPercent;
      if (payload.taxPercent !== undefined) line.taxPercent = payload.taxPercent;

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

      const totals = this.calculateTotals(
        order.lines.map((l) => ({
          itemId: l.itemId,
          orderedQty: Number(l.orderedQty),
          receivedQty: Number(l.receivedQty),
          uomId: l.uomId,
          unitCost: Number(l.unitCost),
          discountPercent: Number(l.discountPercent),
          taxPercent: Number(l.taxPercent),
        })),
      );
      order.subtotalAmount = totals.subtotalAmount;
      order.taxAmount = totals.taxAmount;
      order.totalAmount = totals.totalAmount;
      await poRepo.save(order);

      return this.getById(purchaseId, currentUser.organizationId, manager);
    });
  }

  async removeLine(purchaseId: string, lineId: string, currentUser: RequestUser): Promise<PurchaseSummaryType> {
    return this.dataSource.transaction(async (manager) => {
      const poRepo = manager.getRepository(PurchaseOrderOrmEntity);
      const poLineRepo = manager.getRepository(PurchaseOrderLineOrmEntity);

      const order = await poRepo.findOne({
        where: { id: purchaseId, organizationId: currentUser.organizationId },
        relations: ['lines', 'lines.item'],
      });
      if (!order) throw new NotFoundException('Purchase order not found');
      if (order.status !== 'draft') {
        throw new ForbiddenException('Lines can only be deleted from draft purchase orders');
      }

      const line = order.lines.find((l) => l.id === lineId);
      if (!line) throw new NotFoundException('Purchase order line not found');

      await poLineRepo.remove(line);
      order.lines = order.lines.filter((l) => l.id !== lineId);

      const totals = order.lines.length
        ? this.calculateTotals(
            order.lines.map((l) => ({
              itemId: l.itemId,
              orderedQty: Number(l.orderedQty),
              receivedQty: Number(l.receivedQty),
              uomId: l.uomId,
              unitCost: Number(l.unitCost),
              discountPercent: Number(l.discountPercent),
              taxPercent: Number(l.taxPercent),
            })),
          )
        : { subtotalAmount: 0, taxAmount: 0, totalAmount: 0 };

      order.subtotalAmount = totals.subtotalAmount;
      order.taxAmount = totals.taxAmount;
      order.totalAmount = totals.totalAmount;
      await poRepo.save(order);

      return this.getById(purchaseId, currentUser.organizationId, manager);
    });
  }

  // Strict tenant scope: purchase lines may only reference items the org has
  // explicitly added (active organisation_items rows).
  private async assertItemsOrgAdded(itemIds: string[], organizationId: string): Promise<void> {
    const uniqueIds = [...new Set(itemIds.filter(Boolean))];
    if (!uniqueIds.length) return;

    const rows = await this.orgItemRepository.find({
      where: { organizationId, itemId: In(uniqueIds), isActive: true },
      select: ['itemId'],
    });
    const added = new Set(rows.map((r) => r.itemId));
    const missing = uniqueIds.filter((id) => !added.has(id));
    if (missing.length) {
      throw new BadRequestException(
        `Item(s) not added to this organisation: ${missing.join(', ')}`,
      );
    }
  }

  private resolveSortColumn(sortBy: string): string {
    const map: Record<string, string> = {
      status: 'purchase.status',
      invoiceNumber: 'purchase.purchase_order_number',
      totalCost: 'purchase.total_amount',
      updatedAt: 'purchase.updated_at',
      createdAt: 'purchase.createdAt',
    };

    return map[sortBy] ?? 'purchase.created_at';
  }

  private normalizeLines(payload: CreatePurchaseDto | UpdatePurchaseDto): PurchaseLineDto[] {
    if (payload.lines?.length) {
      return payload.lines;
    }

    if (!payload.itemId || !payload.quantity || payload.unitCost === undefined) {
      throw new BadRequestException('Either lines or itemId/quantity/unitCost must be provided');
    }

    return [
      {
        itemId: payload.itemId,
        orderedQty: payload.quantity,
        receivedQty: payload.quantity,
        uomId: DEFAULT_UOM_ID,
        unitCost: payload.unitCost,
        discountPercent: 0,
        taxPercent: 0,
      },
    ];
  }

  private computeLineSubtotal(line: PurchaseLineDto): number {
    const gross = Number(line.orderedQty) * Number(line.unitCost);
    const discount = gross * (Number(line.discountPercent ?? 0) / 100);
    return Number((gross - discount).toFixed(2));
  }

  private computeLineTotal(line: PurchaseLineDto): number {
    const subtotal = this.computeLineSubtotal(line);
    const tax = subtotal * (Number(line.taxPercent ?? 0) / 100);
    return Number((subtotal + tax).toFixed(2));
  }

  private calculateTotals(lines: PurchaseLineDto[]): { subtotalAmount: number; taxAmount: number; totalAmount: number } {
    const subtotalAmount = Number(lines.reduce((sum, line) => sum + this.computeLineSubtotal(line), 0).toFixed(2));
    const totalAmount = Number(lines.reduce((sum, line) => sum + this.computeLineTotal(line), 0).toFixed(2));
    return {
      subtotalAmount,
      taxAmount: Number((totalAmount - subtotalAmount).toFixed(2)),
      totalAmount,
    };
  }

  private mapLine(line: PurchaseOrderLineOrmEntity) {
    return {
      id: line.id,
      itemId: line.itemId,
      itemCode: line.item?.name ?? '',
      itemName: line.item?.name ?? '',
      orderedQty: Number(line.orderedQty),
      receivedQty: Number(line.receivedQty),
      uomId: line.uomId,
      uomName: line.uom?.name ?? '',
      unitCost: Number(line.unitCost),
      discountPercent: Number(line.discountPercent),
      taxPercent: Number(line.taxPercent),
      lineSubtotal: Number(line.lineSubtotal),
      lineTotal: Number(line.lineTotal),
    };
  }
}
