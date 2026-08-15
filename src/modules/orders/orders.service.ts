import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderOrmEntity } from '../website/entities/order.orm-entity';
import { OrderItemOrmEntity } from '../website/entities/order-item.orm-entity';
import { DeliveryOrmEntity } from '../website/entities/delivery.orm-entity';
import { ItemOrmEntity } from '../catalog/entities/item.orm-entity';
import { SaleOrmEntity, SaleLineOrmEntity } from '../sales/entities';
import {
  StockBalanceOrmEntity,
  StockAdjustmentOrmEntity,
  StoreStockLocationOrmEntity,
  StockLocationOrmEntity,
} from '../inventory/entities';
import { PartyOrmEntity } from '../customers/entities/party.orm-entity';
import { PricingService } from '../pricing/services/pricing.service';
import { DEFAULT_STORE_ID, DEFAULT_UOM_ID } from '../../shared/constants/persistence-scope';

const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['dispatched', 'cancelled'],
  dispatched: ['in_transit'],
  in_transit: ['delivered'],
  delivered: [],
  cancelled: [],
};

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepo: Repository<OrderOrmEntity>,
    @InjectRepository(OrderItemOrmEntity)
    private readonly orderItemRepo: Repository<OrderItemOrmEntity>,
    @InjectRepository(DeliveryOrmEntity)
    private readonly deliveryRepo: Repository<DeliveryOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepo: Repository<ItemOrmEntity>,
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepo: Repository<PartyOrmEntity>,
    @InjectRepository(SaleOrmEntity)
    private readonly saleRepo: Repository<SaleOrmEntity>,
    @InjectRepository(SaleLineOrmEntity)
    private readonly saleLineRepo: Repository<SaleLineOrmEntity>,
    @InjectRepository(StockBalanceOrmEntity)
    private readonly stockBalanceRepo: Repository<StockBalanceOrmEntity>,
    @InjectRepository(StockAdjustmentOrmEntity)
    private readonly stockAdjustmentRepo: Repository<StockAdjustmentOrmEntity>,
    @InjectRepository(StoreStockLocationOrmEntity)
    private readonly storeStockLocationRepo: Repository<StoreStockLocationOrmEntity>,
    @InjectRepository(StockLocationOrmEntity)
    private readonly stockLocationRepo: Repository<StockLocationOrmEntity>,
    private readonly pricingService: PricingService,
  ) {}

  async listOrders(userId?: string) {
    const where = userId ? { createdBy: userId } : {};
    return this.orderRepo.find({ where, relations: ['items', 'delivery'], order: { createdAt: 'DESC' } });
  }

  async getOrder(id: string) {
    const order = await this.orderRepo.findOne({ where: { id }, relations: ['items', 'delivery'] });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async trackOrder(orderNumber: string) {
    const order = await this.orderRepo.findOne({ where: { orderNumber }, relations: ['items', 'delivery'] });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async createOrder(payload: {
    customerId?: string;
    paymentMethod: string;
    prescriptionIds?: string[];
    notes?: string;
    items: Array<{ itemId?: string; freetextName?: string; quantity: number; unitPrice?: number }>;
    delivery?: {
      address: string;
      city?: string;
      state?: string;
      phone?: string;
      shippingMethod?: string;
    };
  }, userId?: string, organizationId?: string) {
    let subtotal = 0;
    const orderItems: Array<{ itemId: string | null; freetextName: string | null; quantity: number; unitPrice: number }> = [];

    const itemIds = (payload.items ?? [])
      .filter((l) => l.itemId)
      .map((l) => l.itemId as string);
    const prices = organizationId && itemIds.length
      ? await this.pricingService.getPricesForItems(itemIds, organizationId)
      : new Map<string, number>();

    for (const line of payload.items ?? []) {
      const price = line.itemId
        ? (prices.get(line.itemId) ?? line.unitPrice ?? 0)
        : (line.unitPrice ?? 0);
      subtotal += price * line.quantity;
      orderItems.push({
        itemId: line.itemId ?? null,
        freetextName: line.freetextName ?? null,
        quantity: line.quantity,
        unitPrice: price,
      });
    }

    let customerId = payload.customerId ?? null;
    if (!customerId && userId) {
      const party = await this.partyRepo.findOne({ where: { userId } });
      if (party) customerId = party.id;
    }

    const order = this.orderRepo.create({
      orderNumber: `ORD-${Date.now()}`,
      customerId,
      paymentMethod: payload.paymentMethod,
      notes: payload.notes ?? null,
      orderStatus: 'pending',
      createdBy: userId ?? null,
      subtotalAmount: subtotal,
      totalAmount: subtotal,
    });

    const savedOrder = await this.orderRepo.save(order);

    if (orderItems.length > 0) {
      await this.orderItemRepo.save(
        orderItems.map((oi) =>
          this.orderItemRepo.create({ order: savedOrder, itemId: oi.itemId, freetextName: oi.freetextName, quantity: oi.quantity, unitPrice: oi.unitPrice }),
        ),
      );
    }

    if (payload.delivery) {
      const delivery = this.deliveryRepo.create({
        order: savedOrder,
        address: payload.delivery.address,
        city: payload.delivery.city ?? null,
        state: payload.delivery.state ?? null,
        phone: payload.delivery.phone ?? null,
        shippingMethod: payload.delivery.shippingMethod ?? null,
      });
      await this.deliveryRepo.save(delivery);
    }

    return this.orderRepo.findOne({
      where: { id: savedOrder.id },
      relations: ['items', 'delivery'],
    });
  }

  async listAllOrders(status?: string, page = 1, limit = 20) {
    const where: Record<string, unknown> = {};
    if (status) where.orderStatus = status;

    const [data, total] = await this.orderRepo.findAndCount({
      where: where as any,
      relations: ['items', 'delivery', 'sale'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async getAdminOrder(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'delivery', 'sale'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrderStatus(id: string, status: string) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    const allowed = ORDER_STATUS_TRANSITIONS[order.orderStatus] ?? [];
    if (!allowed.includes(status)) {
      throw new BadRequestException(
        `Cannot transition from ${order.orderStatus} to ${status}. Allowed: ${allowed.join(', ') || 'none'}`,
      );
    }

    order.orderStatus = status as any;
    return this.orderRepo.save(order);
  }

  async reconcileItem(orderId: string, orderItemId: string, itemId: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    const item = await this.itemRepo.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item not found');

    const orderItem = await this.orderItemRepo.findOne({ where: { id: orderItemId, order: { id: orderId } } });
    if (!orderItem) throw new NotFoundException('Order item not found');

    orderItem.itemId = itemId;
    orderItem.freetextName = null;
    return this.orderItemRepo.save(orderItem);
  }

  async reconcileAllItems(orderId: string, itemIds: Record<string, string>) {
    const order = await this.orderRepo.findOne({ where: { id: orderId }, relations: ['items'] });
    if (!order) throw new NotFoundException('Order not found');

    const results: OrderItemOrmEntity[] = [];
    for (const orderItem of order.items) {
      if (!orderItem.itemId) {
        const matchingItemId = itemIds[orderItem.id];
        if (!matchingItemId) continue;

        const item = await this.itemRepo.findOne({ where: { id: matchingItemId } });
        if (!item) throw new NotFoundException(`Item not found: ${matchingItemId}`);

        orderItem.itemId = matchingItemId;
        orderItem.freetextName = null;
        results.push(await this.orderItemRepo.save(orderItem));
      }
    }
    return results;
  }

  async postOrderAsSale(orderId: string, dto: { stockLocationId?: string }, currentUser: { organizationId: string; sub: string }) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, orderStatus: 'confirmed' },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException('Order must be in confirmed status to post as sale');
    if (!order.items?.length) throw new BadRequestException('Order has no items');

    for (const item of order.items) {
      if (!item.itemId) {
        throw new BadRequestException(`Order item "${item.freetextName ?? item.id}" has no linked item. Reconcile before posting.`);
      }
    }

    const itemIds = order.items.map((i) => i.itemId as string);
    const items = await this.itemRepo.findBy({ id: In(itemIds) });
    const itemMap = new Map(items.map((i) => [i.id, i]));

    const sale = this.saleRepo.create({
      organizationId: currentUser.organizationId,
      saleNumber: `WEBORD-${order.orderNumber.replace('ORD-', '')}`,
      saleChannel: 'website',
      storeId: DEFAULT_STORE_ID,
      customerId: order.customerId,
      status: 'draft',
      notes: order.notes,
      stockLocationId: dto.stockLocationId ?? null,
      subtotalAmount: order.subtotalAmount,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: order.totalAmount,
      paidAmount: 0,
      changeAmount: 0,
      saleDate: new Date(),
      soldByUserId: currentUser.sub,
      createdBy: currentUser.sub,
    });
    const savedSale = await this.saleRepo.save(sale);

    let lineNumber = 1;
    for (const orderItem of order.items) {
      const catalogItem = itemMap.get(orderItem.itemId as string);
      await this.saleLineRepo.save(
        this.saleLineRepo.create({
          sale: savedSale,
          lineNumber,
          item: { id: orderItem.itemId } as any,
          quantity: orderItem.quantity,
          unitPrice: orderItem.unitPrice,
          lineSubtotal: orderItem.unitPrice * orderItem.quantity,
          lineTotal: orderItem.unitPrice * orderItem.quantity,
          uom: { id: catalogItem?.baseUomId ?? DEFAULT_UOM_ID },
          lot: null,
        } as any),
      );
      lineNumber++;
    }

    order.saleId = savedSale.id;
    order.orderStatus = 'processing';
    await this.orderRepo.save(order);

    return this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['items', 'delivery', 'sale'],
    });
  }

  async completeSale(saleId: string, currentUser: { organizationId: string; sub: string }) {
    const sale = await this.saleRepo.findOne({ where: { id: saleId, status: 'draft' }, relations: ['lines', 'lines.item'] });
    if (!sale) throw new NotFoundException('Draft sale not found');

    const locationId = sale.stockLocationId;
    if (!locationId) {
      const ssl = await this.storeStockLocationRepo.findOne({
        where: { organizationId: currentUser.organizationId, storeId: sale.storeId, purpose: 'sale_issue', isActive: true },
        relations: ['stockLocation'],
      });
      if (!ssl) throw new BadRequestException('No sale_issue stock location configured');
      sale.stockLocationId = ssl.stockLocation.id;
    }

    const finalLocId = sale.stockLocationId!;
    if (!sale.lines?.length) throw new BadRequestException('Sale has no lines');

    for (const line of sale.lines) {
      const balance = await this.stockBalanceRepo.findOne({
        where: { organizationId: currentUser.organizationId, item: { id: line.item.id }, location: { id: finalLocId } },
        relations: ['item', 'location'],
      } as any);
      if (!balance) continue;

      balance.quantityOnHand = Number(Math.max(0, balance.quantityOnHand - line.quantity).toFixed(4));
      const savedBalance = await this.stockBalanceRepo.save(balance);

      await this.stockAdjustmentRepo.save(
        this.stockAdjustmentRepo.create({
          stockBalance: savedBalance,
          reason: `sale_fulfillment:${sale.saleNumber}`,
          deltaQuantity: -line.quantity,
          performedByUserId: currentUser.sub,
          performedAt: new Date(),
        }),
      );
    }

    sale.status = 'posted';
    await this.saleRepo.save(sale);
    await this.orderRepo.update({ saleId: sale.id }, { orderStatus: 'dispatched' } as any);

    return { id: sale.id, status: sale.status };
  }
}
