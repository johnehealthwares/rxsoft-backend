import { Product } from '../domains/product.entity';
import { ProductCategory } from '../domains/product-category.entity';
import { GenericProduct } from '../domains/generic-product.entity';

export type ProductListQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  search?: string;
  categoryCode?: string;
  sortBy: 'name' | 'code' | 'createdAt';
  sortOrder: 'asc' | 'desc';
};

export type DependencySearchQuery = {
  organizationId: string;
  offset: number;
  limit: number;
  search?: string;
};

export type ProductCategoryLookup = {
  id: string;
  code: string;
  name: string;
};

export type GenericProductLookup = {
  id: string;
  code: string;
  name: string;
};

export type UomLookup = {
  id: string;
  code: string | null;
  name: string;
  uomType?: 'reference' | 'bigger' | 'smaller';
  rounding: number;
  factor: number;
  isActive: boolean;
};

export interface ProductRepository {
  list(query: ProductListQuery): Promise<{ items: Product[]; total: number }>;
  findById(id: string, organizationId: string): Promise<Product | null>;
  findByCode(code: string, organizationId: string): Promise<Product | null>;
  findByBarcode(barCode: string, organizationId: string): Promise<Product | null>;
  findCategoryById(id: string, organizationId: string): Promise<ProductCategory | null>;
  findGenericProductById(id: string, organizationId: string): Promise<GenericProduct | null>;
  findUomById(id: string, organizationId: string): Promise<UomLookup | null>;
  listCategories(query: DependencySearchQuery): Promise<{ items: ProductCategoryLookup[]; total: number }>;
  listGenericProducts(query: DependencySearchQuery): Promise<{ items: GenericProductLookup[]; total: number }>;
  listUoms(query: DependencySearchQuery): Promise<{ items: UomLookup[]; total: number }>;
  save(product: Product): Promise<Product>;
}
