import { Injectable } from '@nestjs/common';
import { GenericProduct } from '../domains/generic-product.entity';
import { Pharmaceutics } from '../domains/pharmaceutics.entity';
import { Product } from '../domains/product.entity';
import { ProductCategory } from '../domains/product-category.entity';
import {
  DependencySearchQuery,
  ProductListQuery,
  ProductRepository,
  UomLookup,
} from './product.repository';

@Injectable()
export class InMemoryProductRepository implements ProductRepository {
  private readonly products = new Map<string, Product>();
  private readonly createdAtById = new Map<string, Date>();
  private readonly categories = new Map<string, ProductCategory>();
  private readonly genericProducts = new Map<string, GenericProduct>();
  private readonly uoms = new Map<string, UomLookup>();

  constructor() {
    const pharm = new Pharmaceutics(
      'c7afe5de-d281-4b81-a271-8e1182cf3260',
      'PHARM001',
      'Paracetamol',
      'Analgesic',
      'Central analgesic action',
      'Fever and pain',
      'Severe liver disease',
      'Blood'
    );
    const generic = new GenericProduct(
      'f8fe2ed1-bb77-4aa7-b689-c44df7c0c3a1',
      'GEN001',
      'Paracetamol',
      'Analgesic and antipyretic',
      '500mg every 6-8h',
      'Weight-based dosing',
      false,
      false,
      pharm,
    );
    const category = new ProductCategory(
      'd76d8e07-6368-4f96-8dd1-cd9b610ce208',
      'ANALGESICS',
      'Analgesics',
    );
    const uom: UomLookup = { id: 'u1', code: 'UNIT', name: 'Unit', uomType: 'reference', rounding: 1, factor: 1, isActive: true};
    const product = new Product(
      '7cf2f9c1-e045-46f7-b8e6-d6d218f7dd23',
      'org1',
      'PCM500',
      'Paracetamol 500mg Tablet',
      generic.id,
      category.id,
      category,
      generic,
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

    this.products.set(product.id, product);
    this.categories.set(category.id, category);
    this.genericProducts.set(generic.id, generic);
    this.uoms.set(uom.id, uom);
    this.createdAtById.set(product.id, new Date('2026-01-01T00:00:00.000Z'));
  }

  async list(query: ProductListQuery): Promise<{ items: Product[]; total: number }> {
    let items = [...this.products.values()].filter(
      (product) => product.organizationId === query.organizationId,
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

  async findById(id: string, organizationId: string): Promise<Product | null> {
    const item = this.products.get(id) ?? null;
    if (!item || item.organizationId !== organizationId) {
      return null;
    }
    return item;
  }

  async findByCode(code: string, organizationId: string): Promise<Product | null> {
    return (
      [...this.products.values()].find(
        (product) => product.code === code && product.organizationId === organizationId,
      ) ?? null
    );
  }

  async findByBarcode(barcode: string, organizationId: string): Promise<Product | null> {
    return (
      [...this.products.values()].find(
        (product) => product.barcode === barcode && product.organizationId === organizationId,
      ) ?? null
    );
  }


  async findCategoryById(id: string, _organizationId: string): Promise<ProductCategory | null> {
    return this.categories.get(id) ?? null;
  }

  async findGenericProductById(id: string, _organizationId: string): Promise<GenericProduct | null> {
    return this.genericProducts.get(id) ?? null;
  }

  async findUomById(id: string, _organizationId: string): Promise<UomLookup | null> {
    return this.uoms.get(id) ?? null;
  }

  async listCategories(
    query: DependencySearchQuery,
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

  async listGenericProducts(
    query: DependencySearchQuery,
  ): Promise<{ items: Array<{ id: string; code: string; name: string }>; total: number }> {
    let items = [...this.genericProducts.values()].map((item) => ({
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

  async listUoms(query: DependencySearchQuery): Promise<{ items: UomLookup[]; total: number }> {
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

  async save(product: Product): Promise<Product> {
    this.products.set(product.id, product);
    this.createdAtById.set(product.id, new Date());
    return product;
  }
}
