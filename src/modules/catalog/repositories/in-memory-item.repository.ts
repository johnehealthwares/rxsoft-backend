import { Injectable } from '@nestjs/common';
import { Item } from '../domains/item.entity';
import { ItemCategory } from '../domains/item-category.entity';
import {
  ItemDependencySearchQuery,
  ItemListQuery,
  ItemMetrics,
  ItemMetricsQuery,
  ItemRepository,
  UomLookup,
} from './item.repository';

@Injectable()
export class InMemoryItemRepository implements ItemRepository {
  private readonly items = new Map<string, Item>();
  private readonly createdAtById = new Map<string, Date>();
  private readonly categories = new Map<string, ItemCategory>();
  private readonly uoms = new Map<string, UomLookup>();
  // orgId -> itemId -> isActive (true=whitelist, false=blacklist)
  private readonly orgItems = new Map<string, Map<string, boolean>>();

  constructor() {
    const category = new ItemCategory(
      'd76d8e07-6368-4f96-8dd1-cd9b610ce208',
      'ANALGESICS',
      'Analgesics',
    );
    const uom: UomLookup = { id: 'u1', code: 'UNIT', name: 'Unit', uomType: 'reference', rounding: 1, factor: 1, isActive: true};
    const product = new Item(
      '7cf2f9c1-e045-46f7-b8e6-d6d218f7dd23',
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
      true,
      true,
      null,
    );

    this.items.set(product.id, product);
    this.categories.set(category.id, category);
    this.uoms.set(uom.id, uom);
    this.createdAtById.set(product.id, new Date('2026-01-01T00:00:00.000Z'));
  }

  async list(query: ItemListQuery): Promise<{ items: Item[]; total: number }> {
    const orgFlags = this.orgItems.get(query.organizationId) ?? new Map();
    let items = [...this.items.values()].filter(
      // Visibility is per-org (organisation_items): showAll bypasses the
      // no-blacklist filter; otherwise hide items blacklisted for the org.
      (product) => query.showAll || orgFlags.get(product.id) !== false,
    );

    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter((product) =>
        product.displayName.toLowerCase().includes(q) ||
        (product.code ? product.code.toLowerCase().includes(q) : false) ||
        (product.barcode ? product.barcode.toLowerCase().includes(q) : false),
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
        left = a.code ?? '';
        right = b.code ?? '';
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
    if (!item) {
      return null;
    }
    return this.withOverlay(item, organizationId);
  }

  async findCategoryById(id: string): Promise<ItemCategory | null> {
    return this.categories.get(id) ?? null;
  }

  async findUomById(id: string): Promise<UomLookup | null> {
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

  async getMetrics(query: ItemMetricsQuery): Promise<ItemMetrics> {
    let items = [...this.items.values()];

    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || (p.code ? p.code.toLowerCase().includes(q) : false),
      );
    }
    if (query.categoryCode) {
      const cc = query.categoryCode.toLowerCase();
      items = items.filter((p) => p.category?.code?.toLowerCase() === cc);
    }

    const orgFlags = query.organizationId ? this.orgItems.get(query.organizationId) ?? new Map() : null;
    // Active/available is per org (organisation_items): not blacklisted = active.
    const isActiveForOrg = (p: Item) =>
      !orgFlags || orgFlags.get(p.id) === undefined || orgFlags.get(p.id) === true;

    return {
      total: items.length,
      active: items.filter(isActiveForOrg).length,
      inactive: items.filter((p) => !isActiveForOrg(p)).length,
      noCategory: items.filter((p) => !p.category?.code || p.category.code.toLowerCase() === 'not found').length,
      noGenericProductCode: items.filter((p) => !p.genericProductCode).length,
    };
  }

  async save(product: Item): Promise<Item> {
    this.items.set(product.id, product);
    this.createdAtById.set(product.id, new Date());
    return product;
  }

  private withOverlay(item: Item, organizationId: string): Item {
    const flag = this.orgItems.get(organizationId)?.get(item.id);
    const visibility = flag === undefined ? 'default' : flag ? 'whitelisted' : 'blacklisted';
    return new Item(
      item.id,
      item.name,
      item.genericProductCode,
      item.categoryId,
      item.category,
      item.baseUomId,
      item.purchaseUomId,
      item.saleUomId,
      item.baseUom,
      item.purchaseUom,
      item.saleUom,
      item.trackLot,
      item.trackExpiry,
      item.shelfLifeDays,
      item.imageUrl,
      item.smallImageUrl,
      item.mediumImageUrl,
      item.largeImageUrl,
      null,
      null,
      null,
      visibility,
    );
  }
}
