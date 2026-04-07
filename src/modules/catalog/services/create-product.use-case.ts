import { BadRequestException, Inject, Injectable, Optional } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AppCacheService } from '../../../common/cache/cache.service';
import { InventoryService } from '../../inventory/services/inventory.service';
import { PricingService } from '../../pricing/services/pricing.service';
import { PRODUCT_REPOSITORY } from './catalog.di-tokens';
import type { ProductRepository } from '../repositories/product.repository';
import { Product } from '../domains/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { validateUoms } from './utils';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Optional()
    private readonly pricingService?: PricingService,
    @Optional()
    private readonly inventoryService?: InventoryService,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) { }

  async execute(payload: CreateProductDto, organizationId: string, performedByUserId?: string): Promise<Product> {
    const existing = await this.productRepository.findByCode(payload.code, organizationId);
    if (existing) {
      throw new BadRequestException('Product code already exists');
    }

    if (payload.barcode) {
      const barcode = await this.productRepository.findByBarcode(payload.barcode, organizationId);
      if (barcode) {
        throw new BadRequestException('Product barcode already exists');
      }
    }

    const category = await this.productRepository.findCategoryById(payload.categoryId, organizationId);
    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    const genericProduct = await this.productRepository.findGenericProductById(
      payload.genericProductId,
      organizationId,
    );
    if (!genericProduct) {
      throw new BadRequestException('Generic product does not exist');
    }

    if (!payload.baseUomId || !payload.purchaseUomId || !payload.saleUomId) {
      throw new BadRequestException('Base UOM, Purchase UOM and Sale UOM are required');
    }
    let baseUom, purchaseUom, saleUom;
    baseUom = await this.productRepository.findUomById(payload.baseUomId, organizationId);
    if (!baseUom) {
      throw new BadRequestException('Base UOM does not exist');
    }

    purchaseUom = await this.productRepository.findUomById(payload.purchaseUomId, organizationId);
    if (!purchaseUom) {
      throw new BadRequestException('Purchase UOM does not exist');
    }


    saleUom = await this.productRepository.findUomById(payload.saleUomId, organizationId);
    if (!saleUom) {
      throw new BadRequestException('Sale UOM does not exist');
    }


    validateUoms({ baseUom, saleUom, purchaseUom })



    const product = new Product(
      randomUUID(),
      organizationId,
      payload.code,
      payload.name,
      genericProduct.id,
      category.id,
      category,
      genericProduct,
      payload.baseUomId,
      payload.purchaseUomId ?? null,
      payload.saleUomId ?? null,
      payload.barcode ?? null,
      payload.trackLot ?? true,
      payload.trackExpiry ?? true,
      payload.shelfLifeDays ?? null,
      payload.isActive ?? true,
    );


    const created = await this.productRepository.save(product);

    await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
    return created;
  }
}
