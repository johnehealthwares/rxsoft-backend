import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, IsNull, Repository } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { OrganisationItemOrmEntity } from '../../catalog/entities/organisation-item.orm-entity';
import { UsersProxyService } from '../../users-proxy/users-proxy.service';
import {
  StockAdjustmentOrmEntity,
  StockBalanceOrmEntity,
  StockLocationOrmEntity,
  StockLotOrmEntity,
  StockMovementOrmEntity,
  StoreStockLocationOrmEntity,
} from '../../inventory/entities';
import { UomConverterService } from '../services/uom-converter.service';
import { ReceivableTransactionOrmEntity } from '../../receivables/entities';
import { Sale } from '../domains/sale.entity';
import {
  AccountReceivableOrmEntity,
  PaymentMethodOrmEntity,
  SaleLineOrmEntity,
  SaleOrmEntity,
  SalePaymentOrmEntity,
  SaleRefundLineOrmEntity,
  SaleRefundOrmEntity,
  UomOrmEntity,
} from '../entities';
import {
  CreateSaleRefundRepositoryPayload,
  CreateSaleRefundResult,
  CreateSaleRepositoryPayload,
  CreateSaleResult,
  SalesListQuery,
  SalesMetrics,
  SalesMetricsQuery,
  SalesRepository,
} from './sales.repository';
import { applyFilters } from 'src/database/list';

function toDomain(entity: SaleOrmEntity & { storeLocationName?: string }): Sale {
  return new Sale(
    entity.id,
    entity.organizationId,
    entity.saleNumber,
    entity.saleChannel,
    entity.storeId,
    (entity as any).storeLocationName ?? null,
    entity.status,
    entity.totalAmount,
    entity.paidAmount,
    entity.changeAmount,
    entity.saleDate,
  );
}

@Injectable()
export class TypeormSalesRepository implements SalesRepository {
  async findById(organizationId: string, saleId: string): Promise<Sale | null> {
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
    if (!entity) return null;

    // Attach store location name for the toDomain mapping
    if (entity.storeId) {
      const location = await this.dataSource
        .createQueryBuilder()
        .select('sl.name', 'name')
        .from(StockLocationOrmEntity, 'sl')
        .where('sl.id::text = :id', { id: entity.storeId })
        .getRawOne<{ name: string }>();
      (entity as any).storeLocationName = location?.name ?? null;
    }

    return toDomain(entity);
  }

  async findLastCreated(organizationId: string): Promise<Pick<Sale, 'saleNumber'> | null> {
    const entity = await this.saleRepository.findOne({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      select: ['saleNumber'],
    });
    return entity ? { saleNumber: entity.saleNumber } : null;
  }
  constructor(
    @InjectRepository(SaleOrmEntity)
    private readonly saleRepository: Repository<SaleOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository: Repository<ItemOrmEntity>,
    @InjectRepository(UomOrmEntity)
    private readonly uomRepository: Repository<UomOrmEntity>,
    private readonly dataSource: DataSource,
    private readonly uomConverter: UomConverterService,
    private readonly usersProxy: UsersProxyService,
  ) {}

  async list(query: SalesListQuery): Promise<{ items: Sale[]; total: number }> {
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
        applyFilters(qb, 'sale', filters);
      } else {
        qb.andWhere('sale.sale_number ILIKE :search', { search: `%${query.search}%` });
      }
    }
    console.log("qb.getParameters()",qb.getSql(), qb.getParameters())
    const [entities, total] = await qb.getManyAndCount();

    // Batch-load store location names
    const storeIds = [...new Set(entities.map((e) => e.storeId).filter(Boolean))];
    const locationMap = new Map<string, string>();
    if (storeIds.length > 0) {
      const locations = await this.dataSource
        .createQueryBuilder()
        .select('sl.id', 'id')
        .addSelect('sl.name', 'name')
        .from(StockLocationOrmEntity, 'sl')
        .where('sl.id::text IN (:...ids)', { ids: storeIds })
        .getRawMany<{ id: string; name: string }>();
      for (const loc of locations) {
        locationMap.set(loc.id, loc.name);
      }
    }

    return {
      items: entities.map((entity) => {
        (entity as any).storeLocationName = locationMap.get(entity.storeId) ?? null;
        return toDomain(entity);
      }),
      total,
    };
  }

  async getMetrics(query: SalesMetricsQuery): Promise<SalesMetrics> {
    const applySearch = async (qb: import('typeorm').SelectQueryBuilder<any>) => {
      if (query.search) {
        if (query.search.includes('{')) {
          console.log(JSON.parse(query.search),'JSON.parse(query.search)')
          await applyFilters(qb, 'sale', JSON.parse(query.search));
        } else {
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
      .getRawOne<{ revenue: string }>();
    const totalRevenue = Number(totalRevenueResult?.revenue ?? 0);

    const channelRows = await baseQb.clone()
      .andWhere("sale.status = 'posted'")
      .select([
        'sale.sale_channel AS channel',
        'COUNT(*) AS count',
        'COALESCE(SUM(sale.total_amount), 0) AS revenue',
      ])
      .groupBy('sale.sale_channel')
      .getRawMany<{ channel: string; count: string; revenue: string }>();

    const byChannel: Record<string, { count: number; revenue: number }> = {};
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
      .getRawMany<{ category: string; count: string; revenue: string }>();

    const byCategory: Record<string, { count: number; revenue: number }> = {};
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

  async createWithSettlement(payload: CreateSaleRepositoryPayload): Promise<CreateSaleResult> {
    // Validate user references via identity service before starting transaction.
    await this.usersProxy.findById(payload.organizationId, payload.soldByUserId);
    const receiverIds = [
      ...new Set(
        payload.payments
          .map((payment) => payment.receivedByUserId)
          .filter((receivedByUserId): receivedByUserId is string => Boolean(receivedByUserId)),
      ),
    ];
    if (receiverIds.length) {
      await Promise.all(
        receiverIds.map((id) => this.usersProxy.findById(payload.organizationId, id)),
      );
    }

    return this.dataSource.transaction(async (manager) => {
      const saleRepo = manager.getRepository(SaleOrmEntity);
      const saleLineRepo = manager.getRepository(SaleLineOrmEntity);
      const salePaymentRepo = manager.getRepository(SalePaymentOrmEntity);
      const receivableRepo = manager.getRepository(AccountReceivableOrmEntity);
      const receivableTxnRepo = manager.getRepository(ReceivableTransactionOrmEntity);
      const itemRepo = manager.getRepository(ItemOrmEntity);
      const lotRepo = manager.getRepository(StockLotOrmEntity);
      const uomRepo = manager.getRepository(UomOrmEntity);
      const paymentMethodRepo = manager.getRepository(PaymentMethodOrmEntity);

      const itemIds = [...new Set(payload.lines.map((line) => line.itemId))];
      const items: ItemOrmEntity[] = [];
      if (itemIds.length) {
        const foundItems = await itemRepo.find({
          where: { id: In(itemIds) },
          select: ['id', 'baseUomId'],
        });
        if (foundItems.length !== itemIds.length) {
          throw new Error('One or more item references are invalid');
        }
        const blacklisted = await manager
          .getRepository(OrganisationItemOrmEntity)
          .find({
            where: {
              organizationId: payload.organizationId,
              itemId: In(itemIds),
              isActive: false,
            },
            select: ['itemId'],
          });
        if (blacklisted.length) {
          throw new Error('One or more items are blacklisted for this organisation');
        }
        items.push(...foundItems);
      }
      const itemBaseUomMap = new Map(items.map((i) => [i.id, i.baseUomId]));

      const uomIds = [...new Set(payload.lines.map((line) => line.uomId))];
      if (uomIds.length) {
        const uoms = await uomRepo.find({
          where: {
            id: In(uomIds),
          },
          select: ['id'],
        });
        if (uoms.length !== uomIds.length) {
          throw new Error('One or more UOM references are invalid');
        }
      }

      const lotIds = [...new Set(payload.lines.map((line) => line.lotId).filter((lotId): lotId is string => Boolean(lotId)))];
      if (lotIds.length) {
        const lots = await lotRepo.find({
          where: {
            id: In(lotIds),
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
            id: In(paymentMethodIds),
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
        // Save detail rows after header creation to keep line->sale FK consistent.
        const lineEntities = payload.lines.map((line) =>
          saleLineRepo.create({
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
          }),
        );
        await saleLineRepo.save(lineEntities);
      }

      if (payload.payments.length) {
        // Persist payment allocations linked to the sale.
        const paymentEntities = payload.payments.map((payment) =>
          salePaymentRepo.create({
            sale: savedSale,
            paymentMethod: { id: payment.paymentMethodId },
            amount: payment.amount,
            paymentReference: payment.paymentReference,
            paidAt: payment.paidAt,
            receivedByUserId: payment.receivedByUserId ?? null,
          }),
        );
        await salePaymentRepo.save(paymentEntities);
      }

      let receivableId: string | null = null;
      let outstandingAmount = 0;

      if (payload.receivable) {
        // Mirrors legacy rule: any underpayment opens an accounts receivable.
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
        await receivableTxnRepo.save(
          receivableTxnRepo.create({
            receivable: savedReceivable,
            transactionType: 'charge',
            amount: savedReceivable.originalAmount,
            transactionDate: payload.saleDate,
            paymentMethod: null,
            referenceNumber: savedSale.saleNumber,
            receivedByUserId: null,
          }),
        );
        receivableId = savedReceivable.id;
        outstandingAmount = savedReceivable.outstandingAmount;
      }

      if (payload.status !== 'draft') {
        await this.applyStockIssue(manager, {
          organizationId: payload.organizationId,
          storeId: payload.storeId,
          stockLocationId: payload.stockLocationId ?? null,
          saleNumber: payload.saleNumber,
          soldByUserId: payload.soldByUserId,
          saleDate: payload.saleDate,
          inventoryDocumentId: savedSale.id,
          lines: payload.lines,
          itemBaseUomMap,
        });
      }

      return {
        sale: toDomain(savedSale),
        receivableCreated: Boolean(payload.receivable),
        receivableId,
        outstandingAmount,
      };
    });
  }

  async postExistingSale(
    organizationId: string,
    saleId: string,
    stockLocationId: string | null,
    soldByUserId: string,
  ): Promise<Sale> {
    return this.dataSource.transaction(async (manager) => {
      const saleRepo = manager.getRepository(SaleOrmEntity);
      const saleLineRepo = manager.getRepository(SaleLineOrmEntity);
      const itemRepo = manager.getRepository(ItemOrmEntity);

      const sale = await saleRepo.findOne({ where: { id: saleId, organizationId } });
      if (!sale) throw new NotFoundException('Draft sale not found');
      if (sale.status !== 'draft') throw new BadRequestException('Only draft sales can be completed');

      const lines = await saleLineRepo.find({ where: { sale: { id: sale.id } } });
      if (!lines.length) throw new BadRequestException('Sale has no lines');

      const itemIds = [...new Set(lines.map((l) => l.item.id))];
      const items = await itemRepo.find({ where: { id: In(itemIds) }, select: ['id', 'baseUomId'] });
      const itemBaseUomMap = new Map(items.map((i) => [i.id, i.baseUomId]));

      const blacklisted = await manager.getRepository(OrganisationItemOrmEntity).find({
        where: { organizationId, itemId: In(itemIds), isActive: false },
        select: ['itemId'],
      });
      if (blacklisted.length) {
        throw new BadRequestException('One or more items are blacklisted for this organisation');
      }

      await this.applyStockIssue(manager, {
        organizationId,
        storeId: sale.storeId,
        stockLocationId: stockLocationId ?? sale.stockLocationId,
        saleNumber: sale.saleNumber,
        soldByUserId,
        saleDate: sale.saleDate,
        inventoryDocumentId: sale.id,
        lines: lines.map((l) => ({
          itemId: l.item.id,
          uomId: l.uom.id,
          lotId: l.lot?.id ?? null,
          quantity: l.quantity,
          unitPrice: l.unitPrice,
        })),
        itemBaseUomMap,
      });

      sale.status = 'posted';
      const saved = await saleRepo.save(sale);
      return toDomain(saved);
    });
  }

  private async applyStockIssue(
    manager: EntityManager,
    opts: {
      organizationId: string;
      storeId: string;
      stockLocationId: string | null;
      saleNumber: string;
      soldByUserId: string;
      saleDate: Date;
      inventoryDocumentId: string | null;
      lines: Array<{ itemId: string; uomId: string; lotId?: string | null; quantity: number; unitPrice: number }>;
      itemBaseUomMap: Map<string, string>;
    },
  ): Promise<void> {
    const stockBalanceRepo = manager.getRepository(StockBalanceOrmEntity);
    const stockAdjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);
    const stockMovementRepo = manager.getRepository(StockMovementOrmEntity);
    const storeStockLocationRepo = manager.getRepository(StoreStockLocationOrmEntity);
    const stockLocationRepo = manager.getRepository(StockLocationOrmEntity);
    const uomRepo = manager.getRepository(UomOrmEntity);

    let stockLocation: StockLocationOrmEntity | null = null;
    if (opts.stockLocationId) {
      stockLocation = await stockLocationRepo.findOne({
        where: { id: opts.stockLocationId, organizationId: opts.organizationId },
      });
      if (!stockLocation) {
        throw new BadRequestException('Stock location not found');
      }
    } else {
      const ssl = await storeStockLocationRepo.findOne({
        where: {
          organizationId: opts.organizationId,
          storeId: opts.storeId,
          purpose: 'sale_issue',
          isActive: true,
        },
        relations: ['stockLocation'],
      });
      if (!ssl) {
        throw new BadRequestException(
          'No active sale_issue stock location configured for this store, and no stockLocationId provided',
        );
      }
      stockLocation = ssl.stockLocation;
    }

    const uomMap = new Map<string, UomOrmEntity>();
    const uomIds = [...new Set(opts.lines.map((l) => l.uomId))];
    const uoms = await uomRepo.find({ where: { id: In(uomIds) } });
    for (const u of uoms) uomMap.set(u.id, u);

    for (const line of opts.lines) {
      const baseUomId = opts.itemBaseUomMap.get(line.itemId);
      if (!baseUomId) continue;

      const uom = uomMap.get(line.uomId);
      if (!uom) continue;

      const baseQty = await this.uomConverter.convertToBaseUom(line.quantity, line.uomId, baseUomId);

      const balanceWhere: any = {
        organizationId: opts.organizationId,
        item: { id: line.itemId },
        location: { id: stockLocation.id },
      };
      if (line.lotId) balanceWhere.lot = { id: line.lotId };
      const stockBalance = await stockBalanceRepo.findOne({ where: balanceWhere, relations: ['item', 'location', 'lot'] });

      if (!stockBalance) {
        throw new BadRequestException(
          `No stock balance found for item ${line.itemId} at location ${stockLocation.id}`,
        );
      }

      const available = Number((stockBalance.quantityOnHand - stockBalance.quantityReserved).toFixed(4));
      if (available < baseQty) {
        throw new BadRequestException(
          `Insufficient stock for item ${line.itemId}: ${available} available, ${baseQty} needed`,
        );
      }

      stockBalance.quantityOnHand = Number((stockBalance.quantityOnHand - baseQty).toFixed(4));
      const savedBalance = await stockBalanceRepo.save(stockBalance);

      await stockAdjustmentRepo.save(
        stockAdjustmentRepo.create({
          stockBalance: savedBalance,
          reason: `sale:${opts.saleNumber}`,
          deltaQuantity: -baseQty,
          performedByUserId: opts.soldByUserId,
          performedAt: opts.saleDate,
        }),
      );

      await stockMovementRepo.save(
        stockMovementRepo.create({
          organizationId: opts.organizationId,
          inventoryDocumentId: opts.inventoryDocumentId,
          inventoryDocumentLineId: null,
          item: { id: line.itemId },
          lot: line.lotId ? { id: line.lotId } : null,
          fromLocation: { id: stockLocation.id },
          toLocation: null,
          movementType: 'out',
          quantity: baseQty,
          unitCost: line.unitPrice,
          occurredAt: opts.saleDate,
          createdByUserId: opts.soldByUserId,
        }),
      );
    }
  }

  async createRefund(payload: CreateSaleRefundRepositoryPayload): Promise<CreateSaleRefundResult> {
    await this.usersProxy.findById(payload.organizationId, payload.refundedByUserId);

    return this.dataSource.transaction(async (manager) => {
      const saleRepo = manager.getRepository(SaleOrmEntity);
      const saleLineRepo = manager.getRepository(SaleLineOrmEntity);
      const refundRepo = manager.getRepository(SaleRefundOrmEntity);
      const refundLineRepo = manager.getRepository(SaleRefundLineOrmEntity);
      const receivableRepo = manager.getRepository(AccountReceivableOrmEntity);
      const receivableTxnRepo = manager.getRepository(ReceivableTransactionOrmEntity);
      const storeStockLocationRepo = manager.getRepository(StoreStockLocationOrmEntity);
      const stockBalanceRepo = manager.getRepository(StockBalanceOrmEntity);
      const stockAdjustmentRepo = manager.getRepository(StockAdjustmentOrmEntity);

      const sale = await saleRepo.findOne({
        where: { id: payload.saleId, organizationId: payload.organizationId },
      });
      if (!sale) {
        throw new NotFoundException('Sale not found');
      }
      if (sale.status === 'voided') {
        throw new BadRequestException('Cannot refund a voided sale');
      }

      const requestedLineIds = [...new Set(payload.lines.map((line) => line.saleLineId))];
      const saleLines = await saleLineRepo.find({
        where: {
          id: In(requestedLineIds),
          sale: { id: sale.id },
        },
        relations: ['sale', 'item', 'lot'],
      });
      if (saleLines.length !== requestedLineIds.length) {
        throw new BadRequestException('One or more sale lines are invalid for this sale');
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
      const refundedQtyByLineId = new Map<string, number>();
      for (const line of priorRefundLines) {
        const key = line.saleLine.id;
        refundedQtyByLineId.set(key, Number(((refundedQtyByLineId.get(key) ?? 0) + line.quantity).toFixed(4)));
      }
      const requestedQtyByLineId = new Map<string, number>();
      for (const line of payload.lines) {
        requestedQtyByLineId.set(
          line.saleLineId,
          Number(((requestedQtyByLineId.get(line.saleLineId) ?? 0) + line.quantity).toFixed(4)),
        );
      }

      for (const [saleLineId, requestedQty] of requestedQtyByLineId) {
        const saleLine = saleLines.find((line) => line.id === saleLineId)!;
        const alreadyRefundedQty = refundedQtyByLineId.get(saleLineId) ?? 0;
        const maxRefundableQty = Number((saleLine.quantity - alreadyRefundedQty).toFixed(4));
        if (requestedQty > maxRefundableQty) {
          throw new BadRequestException(
            `Refund quantity exceeds refundable quantity for sale line ${saleLineId}`,
          );
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
        const sourceLine = saleLineById.get(line.saleLineId)!;
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
        throw new BadRequestException(
          'No active sale_return stock location mapping configured for this store',
        );
      }

      // Restock refunded quantity at mapped sale_return stock location.
      for (const line of refundLineEntities) {
        const sourceLine = line.saleLine;
        const stockBalance = await stockBalanceRepo.findOne({
          where: {
            organizationId: payload.organizationId,
            item: { id: sourceLine.item.id },
            location: { id: saleReturnLocation.stockLocation.id },
            lot: sourceLine.lot ? { id: sourceLine.lot.id } : IsNull(),
          },
          relations: ['item', 'location', 'lot'],
        });

        const upsertBalance =
          stockBalance ??
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

        await stockAdjustmentRepo.save(
          stockAdjustmentRepo.create({
            stockBalance: savedBalance,
            reason: `sale_refund:${savedRefund.refundNumber}`,
            deltaQuantity: line.quantity,
            performedByUserId: payload.refundedByUserId,
            performedAt: payload.refundDate,
          }),
        );
      }

      // If sale created an open receivable, refund credit reduces outstanding balance.
      const receivable = await receivableRepo.findOne({
        where: { organizationId: payload.organizationId, saleId: sale.id },
      });
      if (receivable) {
        if (receivable.status === 'written_off') {
          throw new BadRequestException(
            'Cannot auto-credit a written-off receivable; resolve receivable status first',
          );
        }

        const creditAmount = Number(Math.min(totalAmount, receivable.outstandingAmount).toFixed(2));
        if (creditAmount > 0) {
          receivable.outstandingAmount = Number((receivable.outstandingAmount - creditAmount).toFixed(2));
          if (receivable.outstandingAmount <= 0) {
            receivable.outstandingAmount = 0;
            receivable.status = 'closed';
            receivable.closedAt = payload.refundDate;
          } else {
            receivable.status = 'partially_paid';
            receivable.closedAt = null;
          }
          await receivableRepo.save(receivable);

          await receivableTxnRepo.save(
            receivableTxnRepo.create({
              receivable,
              transactionType: 'adjustment',
              amount: -creditAmount,
              transactionDate: payload.refundDate,
              paymentMethod: null,
              referenceNumber: savedRefund.refundNumber,
              receivedByUserId: payload.refundedByUserId,
              note: `Auto credit from refund ${savedRefund.refundNumber}`,
            }),
          );
        }
      }

      // Mark sale as refunded only when every line is fully refunded.
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
      const cumulativeRefundQtyByLineId = new Map<string, number>();
      for (const line of cumulativeRefundLines) {
        const key = line.saleLine.id;
        cumulativeRefundQtyByLineId.set(
          key,
          Number(((cumulativeRefundQtyByLineId.get(key) ?? 0) + line.quantity).toFixed(4)),
        );
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
}
