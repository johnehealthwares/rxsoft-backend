import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrdersService } from '../orders.service';

const orderRepo = { find: jest.fn(), findOne: jest.fn(), findAndCount: jest.fn(), create: jest.fn(), save: jest.fn(), update: jest.fn() };
const orderItemRepo = { find: jest.fn(), findOne: jest.fn(), create: jest.fn(), save: jest.fn() };
const deliveryRepo = { create: jest.fn(), save: jest.fn() };
const itemRepo = { findOne: jest.fn(), findBy: jest.fn() };
const partyRepo = { findOne: jest.fn() };
const saleRepo = { create: jest.fn(), save: jest.fn(), findOne: jest.fn(), update: jest.fn() };
const saleLineRepo = { create: jest.fn(), save: jest.fn() };
const stockBalanceRepo = { findOne: jest.fn(), save: jest.fn() };
const stockAdjustmentRepo = { create: jest.fn(), save: jest.fn() };
const storeStockLocationRepo = { findOne: jest.fn() };
const stockLocationRepo = { findOne: jest.fn() };
const pricingService = { getPricesForItems: jest.fn(), getDefaultPriceList: jest.fn() };

const service = new OrdersService(
  orderRepo as any,
  orderItemRepo as any,
  deliveryRepo as any,
  itemRepo as any,
  partyRepo as any,
  saleRepo as any,
  saleLineRepo as any,
  stockBalanceRepo as any,
  stockAdjustmentRepo as any,
  storeStockLocationRepo as any,
  stockLocationRepo as any,
  pricingService as any,
);

function mockOrder(overrides = {}): any {
  return {
    id: 'order1', orderNumber: 'ORD-123', customerId: 'cust1', paymentMethod: 'cash',
    orderStatus: 'pending', notes: null, subtotalAmount: 0, totalAmount: 0, createdBy: 'u1',
    createdAt: new Date(), items: [], delivery: null, sale: null, saleId: null,
    ...overrides,
  };
}

describe('OrdersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listOrders', () => {
    it('returns all orders without userId', async () => {
      const orders = [mockOrder({ id: 'o1' }), mockOrder({ id: 'o2' })];
      orderRepo.find.mockResolvedValue(orders);

      const result = await service.listOrders();

      expect(result).toHaveLength(2);
      expect(orderRepo.find).toHaveBeenCalledWith({ where: {}, relations: ['items', 'delivery'], order: { createdAt: 'DESC' } });
    });

    it('filters by userId when provided', async () => {
      orderRepo.find.mockResolvedValue([]);

      await service.listOrders('u1');

      expect(orderRepo.find).toHaveBeenCalledWith({ where: { createdBy: 'u1' }, relations: ['items', 'delivery'], order: { createdAt: 'DESC' } });
    });
  });

  describe('getOrder', () => {
    it('returns order when found', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder());

      const result = await service.getOrder('order1');

      expect(result.id).toBe('order1');
    });

    it('throws when not found', async () => {
      orderRepo.findOne.mockResolvedValue(null);

      await expect(service.getOrder('missing')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('trackOrder', () => {
    it('returns order by orderNumber', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder());

      const result = await service.trackOrder('ORD-123');

      expect(result.id).toBe('order1');
      expect(orderRepo.findOne).toHaveBeenCalledWith({ where: { orderNumber: 'ORD-123' }, relations: ['items', 'delivery'] });
    });

    it('throws when not found', async () => {
      orderRepo.findOne.mockResolvedValue(null);

      await expect(service.trackOrder('missing')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('createOrder', () => {
    it('creates order with items and delivery', async () => {
      const savedOrder = { id: 'order1', orderNumber: 'ORD-123', customerId: 'cust1' };
      orderRepo.create.mockReturnValue(savedOrder);
      orderRepo.save.mockResolvedValue(savedOrder);
      orderItemRepo.create.mockReturnValue({});
      orderItemRepo.save.mockResolvedValue([]);
      deliveryRepo.create.mockReturnValue({});
      deliveryRepo.save.mockResolvedValue({});
      const fullOrder = mockOrder({ id: 'order1' });
      orderRepo.findOne.mockResolvedValue(fullOrder);

      const result = await service.createOrder({
        customerId: 'cust1',
        paymentMethod: 'cash',
        items: [{ itemId: 'item1', quantity: 2, unitPrice: 50 }],
        delivery: { address: '123 Main St', city: 'NYC' },
      }, 'u1');

      expect(result.id).toBe('order1');
      expect(orderRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        customerId: 'cust1',
        paymentMethod: 'cash',
        orderStatus: 'pending',
        subtotalAmount: 100,
        totalAmount: 100,
      }));
      expect(deliveryRepo.create).toHaveBeenCalledWith(expect.objectContaining({ address: '123 Main St', city: 'NYC' }));
    });

    it('creates order with freetext items', async () => {
      const savedOrder = { id: 'order1', orderNumber: 'ORD-456' };
      orderRepo.create.mockReturnValue(savedOrder);
      orderRepo.save.mockResolvedValue(savedOrder);
      orderItemRepo.create.mockImplementation((data: any) => data ?? {});
      orderItemRepo.save.mockResolvedValue([]);
      orderRepo.findOne.mockResolvedValue(mockOrder({ id: 'order1' }));

      await service.createOrder({
        paymentMethod: 'credit_card',
        items: [{ freetextName: 'Custom Item', quantity: 1, unitPrice: 25 }],
      });

      expect(orderItemRepo.save).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ itemId: null, freetextName: 'Custom Item', quantity: 1, unitPrice: 25 }),
        ]),
      );
    });

    it('looks up party when customerId not provided but userId is', async () => {
      const savedOrder = { id: 'order1', orderNumber: 'ORD-789' };
      orderRepo.create.mockReturnValue(savedOrder);
      orderRepo.save.mockResolvedValue(savedOrder);
      orderItemRepo.save.mockResolvedValue([]);
      partyRepo.findOne.mockResolvedValue({ id: 'party1' });
      orderRepo.findOne.mockResolvedValue(mockOrder({ id: 'order1' }));

      await service.createOrder({ paymentMethod: 'cash', items: [] }, 'u1');

      expect(orderRepo.create).toHaveBeenCalledWith(expect.objectContaining({ customerId: 'party1' }));
      expect(partyRepo.findOne).toHaveBeenCalledWith({ where: { userId: 'u1' } });
    });

    it('creates order without delivery block when not provided', async () => {
      const savedOrder = { id: 'order1', orderNumber: 'ORD-789' };
      orderRepo.create.mockReturnValue(savedOrder);
      orderRepo.save.mockResolvedValue(savedOrder);
      orderItemRepo.save.mockResolvedValue([]);
      orderRepo.findOne.mockResolvedValue(mockOrder({ id: 'order1' }));

      await service.createOrder({ paymentMethod: 'cash', items: [] });

      expect(deliveryRepo.create).not.toHaveBeenCalled();
    });
  });

  describe('listAllOrders', () => {
    it('returns paginated orders', async () => {
      orderRepo.findAndCount.mockResolvedValue([[mockOrder({ id: 'o1' }), mockOrder({ id: 'o2' })], 2]);

      const result = await service.listAllOrders(undefined, 1, 20);

      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });

    it('filters by status', async () => {
      orderRepo.findAndCount.mockResolvedValue([[], 0]);

      await service.listAllOrders('pending');

      expect(orderRepo.findAndCount).toHaveBeenCalledWith(expect.objectContaining({ where: { orderStatus: 'pending' } }));
    });
  });

  describe('getAdminOrder', () => {
    it('returns order with sale relation', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder());

      const result = await service.getAdminOrder('order1');

      expect(result.id).toBe('order1');
      expect(orderRepo.findOne).toHaveBeenCalledWith({
        where: { id: 'order1' },
        relations: ['items', 'delivery', 'sale'],
      });
    });

    it('throws when not found', async () => {
      orderRepo.findOne.mockResolvedValue(null);

      await expect(service.getAdminOrder('missing')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('updateOrderStatus', () => {
    it.each([
      ['pending', 'confirmed'],
      ['pending', 'cancelled'],
      ['confirmed', 'processing'],
      ['confirmed', 'cancelled'],
      ['processing', 'dispatched'],
      ['processing', 'cancelled'],
      ['dispatched', 'in_transit'],
      ['in_transit', 'delivered'],
    ])('transitions from %s to %s', async (from, to) => {
      orderRepo.findOne.mockResolvedValue(mockOrder({ orderStatus: from }));
      orderRepo.save.mockImplementation(async (o) => o);

      const result = await service.updateOrderStatus('order1', to);

      expect(result.orderStatus).toBe(to);
    });

    it.each([
      ['delivered', 'cancelled'],
      ['cancelled', 'pending'],
      ['pending', 'delivered'],
      ['confirmed', 'pending'],
      ['processing', 'confirmed'],
    ])('rejects transition from %s to %s', async (from, to) => {
      orderRepo.findOne.mockResolvedValue(mockOrder({ orderStatus: from }));

      await expect(service.updateOrderStatus('order1', to)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws when order not found', async () => {
      orderRepo.findOne.mockResolvedValue(null);

      await expect(service.updateOrderStatus('missing', 'confirmed')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('reconcileItem', () => {
    it('links order item to a catalog item', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder());
      itemRepo.findOne.mockResolvedValue({ id: 'item42' });
      const orderItem = { id: 'oi1', itemId: null, freetextName: 'Custom', quantity: 1 };
      orderItemRepo.findOne.mockResolvedValue(orderItem);
      orderItemRepo.save.mockImplementation(async (i) => i);

      const result = await service.reconcileItem('order1', 'oi1', 'item42');

      expect(orderItem.itemId).toBe('item42');
      expect(orderItem.freetextName).toBeNull();
      expect(orderItemRepo.save).toHaveBeenCalledWith(orderItem);
    });

    it('throws when order not found', async () => {
      orderRepo.findOne.mockResolvedValue(null);

      await expect(service.reconcileItem('missing', 'oi1', 'item42')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws when item not found', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder());
      itemRepo.findOne.mockResolvedValue(null);

      await expect(service.reconcileItem('order1', 'oi1', 'missing')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws when order item not found', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder());
      itemRepo.findOne.mockResolvedValue({ id: 'item42' });
      orderItemRepo.findOne.mockResolvedValue(null);

      await expect(service.reconcileItem('order1', 'oi1', 'item42')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('reconcileAllItems', () => {
    it('reconciles all freetext order items', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder({
        id: 'order1',
        items: [
          { id: 'oi1', itemId: null, freetextName: 'A' },
          { id: 'oi2', itemId: 'existing', freetextName: null },
          { id: 'oi3', itemId: null, freetextName: 'B' },
        ],
      }));
      itemRepo.findOne
        .mockResolvedValueOnce({ id: 'cat1' })
        .mockResolvedValueOnce({ id: 'cat3' });
      orderItemRepo.save.mockImplementation(async (i) => i);

      const results = await service.reconcileAllItems('order1', { oi1: 'cat1', oi3: 'cat3' });

      expect(results).toHaveLength(2);
      expect(results[0].itemId).toBe('cat1');
      expect(results[0].freetextName).toBeNull();
      expect(results[1].itemId).toBe('cat3');
    });

    it('skips freetext items without a mapping', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder({
        items: [
          { id: 'oi2', itemId: null, freetextName: 'B' },
        ],
      }));

      const results = await service.reconcileAllItems('order1', {});

      expect(results).toHaveLength(0);
    });

    it('throws when mapped item not found', async () => {
      orderRepo.findOne.mockResolvedValue(mockOrder({
        items: [{ id: 'oi1', itemId: null, freetextName: 'A' }],
      }));
      itemRepo.findOne.mockResolvedValue(null);

      await expect(service.reconcileAllItems('order1', { oi1: 'missing' })).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('postOrderAsSale', () => {
    const currentUser = { organizationId: 'org1', sub: 'u1' };
    const baseDto = { stockLocationId: 'loc1' };
    const confirmedOrder = {
      id: 'order1', orderNumber: 'ORD-123', customerId: 'cust1', paymentMethod: 'cash',
      orderStatus: 'confirmed', notes: null, subtotalAmount: 100, totalAmount: 100,
      createdBy: 'u1', createdAt: new Date(), sale: null, saleId: null,
      delivery: null,
      items: [{ id: 'oi1', itemId: 'item1', quantity: 2, unitPrice: 50 }],
    };

    it('creates sale from confirmed order and updates order', async () => {
      const processedOrder = { ...confirmedOrder, orderStatus: 'processing', saleId: 'sale1' };
      orderRepo.findOne
        .mockResolvedValueOnce(confirmedOrder)
        .mockResolvedValueOnce(processedOrder);
      itemRepo.findBy.mockResolvedValue([{ id: 'item1', baseUomId: 'u1' }]);
      const savedSale = { id: 'sale1' };
      saleRepo.create.mockReturnValue(savedSale);
      saleRepo.save.mockResolvedValue(savedSale);
      saleLineRepo.create.mockReturnValue({});
      saleLineRepo.save.mockResolvedValue({});
      orderRepo.save.mockResolvedValue({});

      const result = await service.postOrderAsSale('order1', baseDto, currentUser);

      expect(result.saleId).toBe('sale1');
      expect(result.orderStatus).toBe('processing');
      expect(saleRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        organizationId: 'org1',
        saleChannel: 'website',
        customerId: 'cust1',
        subtotalAmount: 100,
        totalAmount: 100,
        stockLocationId: 'loc1',
      }));
      expect(saleLineRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        quantity: 2,
        unitPrice: 50,
        lineSubtotal: 100,
        lineTotal: 100,
      }));
    });

    it('throws when order is not confirmed', async () => {
      orderRepo.findOne.mockResolvedValue(null);

      await expect(service.postOrderAsSale('order1', baseDto, currentUser)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws when order has no items', async () => {
      orderRepo.findOne.mockResolvedValue({ ...confirmedOrder, items: [] });

      await expect(service.postOrderAsSale('order1', baseDto, currentUser)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws when order has unreconciled freetext items', async () => {
      orderRepo.findOne.mockResolvedValue({
        ...confirmedOrder,
        items: [{ id: 'oi1', itemId: null, freetextName: 'Custom', quantity: 1, unitPrice: 10 }],
      });

      await expect(service.postOrderAsSale('order1', baseDto, currentUser)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('completeSale', () => {
    const currentUser = { organizationId: 'org1', sub: 'u1' };

    it('posts draft sale and deducts stock', async () => {
      saleRepo.findOne.mockResolvedValue({
        id: 'sale1',
        status: 'draft',
        stockLocationId: 'loc1',
        storeId: 'store1',
        saleNumber: 'SALE-001',
        lines: [{ id: 'sl1', item: { id: 'item1' }, quantity: 5 }],
      });
      const balance = { id: 'b1', quantityOnHand: 100 };
      stockBalanceRepo.findOne.mockResolvedValue(balance);
      stockBalanceRepo.save.mockImplementation(async (b) => b);
      stockAdjustmentRepo.create.mockReturnValue({});
      stockAdjustmentRepo.save.mockResolvedValue({});
      saleRepo.save.mockResolvedValue({});
      orderRepo.update.mockResolvedValue({} as any);

      const result = await service.completeSale('sale1', currentUser);

      expect(result.status).toBe('posted');
      expect(balance.quantityOnHand).toBe(95);
      expect(orderRepo.update).toHaveBeenCalledWith({ saleId: 'sale1' }, { orderStatus: 'dispatched' });
    });

    it('throws when sale not found', async () => {
      saleRepo.findOne.mockResolvedValue(null);

      await expect(service.completeSale('missing', currentUser)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('looks up stock location when missing on sale', async () => {
      saleRepo.findOne.mockResolvedValue({
        id: 'sale1',
        status: 'draft',
        stockLocationId: null,
        storeId: 'store1',
        saleNumber: 'SALE-002',
        lines: [{ id: 'sl1', item: { id: 'item1' }, quantity: 1 }],
      });
      storeStockLocationRepo.findOne.mockResolvedValue({
        stockLocation: { id: 'loc2' },
      });
      const balance = { id: 'b1', quantityOnHand: 10 };
      stockBalanceRepo.findOne.mockResolvedValue(balance);
      stockBalanceRepo.save.mockImplementation(async (b) => b);
      stockAdjustmentRepo.create.mockReturnValue({});
      stockAdjustmentRepo.save.mockResolvedValue({});
      saleRepo.save.mockResolvedValue({});
      orderRepo.update.mockResolvedValue({} as any);

      await service.completeSale('sale1', currentUser);

      expect(storeStockLocationRepo.findOne).toHaveBeenCalledWith(expect.objectContaining({
        where: { organizationId: 'org1', storeId: 'store1', purpose: 'sale_issue', isActive: true },
      }));
    });

    it('throws when no sale_issue location configured', async () => {
      saleRepo.findOne.mockResolvedValue({
        id: 'sale1',
        status: 'draft',
        stockLocationId: null,
        storeId: 'store1',
        saleNumber: 'SALE-003',
        lines: [{ id: 'sl1', item: { id: 'item1' }, quantity: 1 }],
      });
      storeStockLocationRepo.findOne.mockResolvedValue(null);

      await expect(service.completeSale('sale1', currentUser)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws when sale has no lines', async () => {
      saleRepo.findOne.mockResolvedValue({
        id: 'sale1',
        status: 'draft',
        stockLocationId: 'loc1',
        saleNumber: 'SALE-004',
        lines: [],
      });

      await expect(service.completeSale('sale1', currentUser)).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
