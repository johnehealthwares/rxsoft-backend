import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderOrmEntity } from '../website/entities/order.orm-entity';
import { OrderItemOrmEntity } from '../website/entities/order-item.orm-entity';
import { DeliveryOrmEntity } from '../website/entities/delivery.orm-entity';
import { ItemOrmEntity } from '../catalog/entities/item.orm-entity';
import { OrganisationItemOrmEntity } from '../catalog/entities/organisation-item.orm-entity';
import { OrganisationsProxyService } from '../organisations-proxy/organisations-proxy.service';
import { SaleOrmEntity, SaleLineOrmEntity } from '../sales/entities';
import { SALES_REPOSITORY } from '../sales/services/sales.di-tokens';
import type { SalesRepository } from '../sales/repositories/sales.repository';
import { PartyOrmEntity } from '../customers/entities/party.orm-entity';
import { StockLocationOrmEntity } from '../inventory/entities';
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
    @InjectRepository(OrganisationItemOrmEntity)
    private readonly orgItemRepo: Repository<OrganisationItemOrmEntity>,
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepo: Repository<PartyOrmEntity>,
    @InjectRepository(SaleOrmEntity)
    private readonly saleRepo: Repository<SaleOrmEntity>,
    @InjectRepository(SaleLineOrmEntity)
    private readonly saleLineRepo: Repository<SaleLineOrmEntity>,
    @InjectRepository(StockLocationOrmEntity)
    private readonly stockLocationRepo: Repository<StockLocationOrmEntity>,
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: SalesRepository,
    private readonly pricingService: PricingService,
    private readonly organisationsProxy: OrganisationsProxyService,
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
      organizationId: organizationId ?? null,
      stockLocationId: null,
      origin: 'website',
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
          this.orderItemRepo.create({ order: savedOrder, itemId: oi.itemId, freetextName: oi.freetextName, quantity: oi.quantity, unitPrice: oi.unitPrice, resolvedAt: oi.itemId ? new Date() : null }),
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

  private async resolveOrderOrg(order: OrderOrmEntity, organizationId?: string): Promise<string | null> {
    if (order.organizationId) return order.organizationId;
    if (!organizationId) return null;

    const org = await this.organisationsProxy.findById(organizationId);
    if (!org) throw new BadRequestException('Organization does not exist');

    order.organizationId = organizationId;
    await this.orderRepo.save(order);
    return organizationId;
  }

  private async assertItemVisibleInOrg(itemId: string, organizationId: string | null) {
    const item = await this.itemRepo.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Item not found');
    if (!organizationId) return;

    // Strict tenant scope: orders may only reference items the org has
    // explicitly added (active organisation_items row).
    const orgItem = await this.orgItemRepo.findOne({
      where: { organizationId, itemId, isActive: true },
    });
    if (!orgItem) {
      throw new BadRequestException('Item is not active for this organisation');
    }
  }

  async reconcileItem(orderId: string, orderItemId: string, itemId: string, opts?: { organizationId?: string }) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    const organizationId = await this.resolveOrderOrg(order, opts?.organizationId);
    await this.assertItemVisibleInOrg(itemId, organizationId);

    const orderItem = await this.orderItemRepo.findOne({ where: { id: orderItemId, order: { id: orderId } } });
    if (!orderItem) throw new NotFoundException('Order item not found');

    orderItem.itemId = itemId;
    orderItem.resolvedAt = new Date();
    return this.orderItemRepo.save(orderItem);
  }

  async reconcileAllItems(orderId: string, itemIds: Record<string, string>, opts?: { organizationId?: string }) {
    const order = await this.orderRepo.findOne({ where: { id: orderId }, relations: ['items'] });
    if (!order) throw new NotFoundException('Order not found');

    const organizationId = await this.resolveOrderOrg(order, opts?.organizationId);

    const results: OrderItemOrmEntity[] = [];
    for (const orderItem of order.items) {
      if (!orderItem.itemId) {
        const matchingItemId = itemIds[orderItem.id];
        if (!matchingItemId) continue;

        await this.assertItemVisibleInOrg(matchingItemId, organizationId);

        orderItem.itemId = matchingItemId;
        orderItem.resolvedAt = new Date();
        results.push(await this.orderItemRepo.save(orderItem));
      }
    }
    return results;
  }

  async postOrderAsSale(orderId: string, dto: { stockLocationId?: string; organizationId?: string }, currentUser: { organizationId: string; sub: string }) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, orderStatus: 'confirmed' },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException('Order must be in confirmed status to post as sale');
    if (!order.items?.length) throw new BadRequestException('Order has no items');

    // Organisation is updatable: an explicit organizationId overrides the order's
    // current org (and the caller's org), is validated, and is persisted onto
    // the order so the order carries it.
    let organizationId = order.organizationId ?? null;
    if (dto.organizationId) {
      const org = await this.organisationsProxy.findById(dto.organizationId);
      if (!org) throw new BadRequestException('Organization does not exist');
      organizationId = dto.organizationId;
      if (order.organizationId !== organizationId) {
        order.organizationId = organizationId;
        await this.orderRepo.save(order);
      }
    } else if (!organizationId) {
      organizationId = await this.resolveOrderOrg(order, currentUser.organizationId);
    }
    if (!organizationId) {
      throw new BadRequestException('Order must be assigned to an organisation before posting as a sale');
    }

    for (const item of order.items) {
      if (!item.itemId) {
        throw new BadRequestException(`Order item "${item.freetextName ?? item.id}" has no linked item. Reconcile before posting.`);
      }
      await this.assertItemVisibleInOrg(item.itemId, organizationId);
    }

    if (dto.stockLocationId) {
      const found = await this.stockLocationRepo.findOne({
        where: { id: dto.stockLocationId, organizationId },
      });
      if (!found) throw new BadRequestException('Stock location does not exist for this organisation');
    }

    const itemIds = order.items.map((i) => i.itemId as string);
    const items = await this.itemRepo.findBy({ id: In(itemIds) });
    const itemMap = new Map(items.map((i) => [i.id, i]));

    const sale = this.saleRepo.create({
      organizationId,
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
    const sale = await this.salesRepository.postExistingSale(
      currentUser.organizationId,
      saleId,
      null,
      currentUser.sub,
    );
    await this.orderRepo.update({ saleId: sale.id }, { orderStatus: 'dispatched' } as any);
    return { id: sale.id, status: sale.status };
  }
}
