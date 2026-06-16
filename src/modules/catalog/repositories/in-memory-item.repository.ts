import { Injectable } from '@nestjs/common';
import { Item } from '../domains/item.entity';
import { ItemCategory } from '../domains/item-category.entity';
import {
  ItemDependencySearchQuery,
  ItemListQuery,
  ItemRepository,
  UomLookup,
} from './item.repository';

@Injectable()
export class InMemoryItemRepository implements ItemRepository {
  private readonly items = new Map<string, Item>();
  private readonly createdAtById = new Map<string, Date>();
  private readonly categories = new Map<string, ItemCategory>();
  private readonly uoms = new Map<string, UomLookup>();

  constructor() {
    const category = new ItemCategory(
      'd76d8e07-6368-4f96-8dd1-cd9b610ce208',
      'ANALGESICS',
      'Analgesics',
    );
    const uom: UomLookup = { id: 'u1', code: 'UNIT', name: 'Unit', uomType: 'reference', rounding: 1, factor: 1, isActive: true};
    const product = new Item(
      '7cf2f9c1-e045-46f7-b8e6-d6d218f7dd23',
      'org1',
      'PCM500',
      'Paracetamol 500mg Tablet',
      'GEN001',
      category.id,
      category,
      uom.id,
      null,
      uom.id,
      uom,
      null,
      uom,
      '1234567890123',
      true,
      true,
      null,
      true,
    );

    this.items.set(product.id, product);
    this.categories.set(category.id, category);
    this.uoms.set(uom.id, uom);
    this.createdAtById.set(product.id, new Date('2026-01-01T00:00:00.000Z'));
  }

  async list(query: ItemListQuery): Promise<{ items: Item[]; total: number }> {
    let items = [...this.items.values()].filter(
      (product) => product.organizationId === query.organizationId && product.isActive,
    );

    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter((product) =>
        product.name.toLowerCase().includes(q) || product.code.toLowerCase().includes(q),
      );
    }

    if (query.categoryCode) {
      const categoryCode = query.categoryCode.toLowerCase();
      items = items.filter((product) => product.category.code.toLowerCase() === categoryCode);
    }

    items.sort((a, b) => {
      let left: string | Date;
      let right: string | Date;

      if (query.sortBy === 'createdAt') {
        left = this.createdAtById.get(a.id) ?? new Date(0);
        right = this.createdAtById.get(b.id) ?? new Date(0);
      } else if (query.sortBy === 'code') {
        left = a.code;
        right = b.code;
      } else {
        left = a.name;
        right = b.name;
      }

      const direction = query.sortOrder === 'asc' ? 1 : -1;
      if (left < right) return -1 * direction;
      if (left > right) return 1 * direction;
      return 0;
    });

    const total = items.length;

    return {
      items: items.slice(query.offset, query.offset + query.limit),
      total,
    };
  }

  async findById(id: string, organizationId: string): Promise<Item | null> {
    const item = this.items.get(id) ?? null;
    if (!item || item.organizationId !== organizationId || !item.isActive) {
      return null;
    }
    return item;
  }

  async findByCode(code: string, organizationId: string): Promise<Item | null> {
    return (
      [...this.items.values()].find(
        (product) => product.code === code && product.organizationId === organizationId && product.isActive,
      ) ?? null
    );
  }

  async findByBarcode(barcode: string, organizationId: string): Promise<Item | null> {
    return (
      [...this.items.values()].find(
        (product) => product.barcode === barcode && product.organizationId === organizationId && product.isActive,
      ) ?? null
    );
  }


  async findCategoryById(id: string, _organizationId: string): Promise<ItemCategory | null> {
    return this.categories.get(id) ?? null;
  }

  async findUomById(id: string, _organizationId: string): Promise<UomLookup | null> {
    return this.uoms.get(id) ?? null;
  }

  async listCategories(
    query: ItemDependencySearchQuery,
  ): Promise<{ items: Array<{ id: string; code: string; name: string }>; total: number }> {
    let items = [...this.categories.values()].map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
    }));

    if (query.search) {
      const s = query.search.toLowerCase();
      items = items.filter(
        (item) => item.name.toLowerCase().includes(s) || item.code.toLowerCase().includes(s),
      );
    }

    const total = items.length;
    return {
      items: items.slice(query.offset, query.offset + query.limit),
      total,
    };
  }

  async listUoms(query: ItemDependencySearchQuery): Promise<{ items: UomLookup[]; total: number }> {
    let items = [...this.uoms.values()];
    if (query.search) {
      const s = query.search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(s) || (item.code ? item.code.toLowerCase().includes(s) : false),
      );
    }

    const total = items.length;
    return {
      items: items.slice(query.offset, query.offset + query.limit),
      total,
    };
  }

  async save(product: Item): Promise<Item> {
    this.items.set(product.id, product);
    this.createdAtById.set(product.id, new Date());
    return product;
  }
}
