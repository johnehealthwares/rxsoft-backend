import { BadRequestException, Inject, Injectable, Optional } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AppCacheService } from '../../../common/cache/cache.service';
import { InventoryService } from '../../inventory/services/inventory.service';
import { PricingService } from '../../pricing/services/pricing.service';
import { ITEM_REPOSITORY } from './catalog.di-tokens';
import type { ItemRepository } from '../repositories/item.repository';
import { Item } from '../domains/item.entity';
import { CreateItemDto } from '../dto/create-item.dto';
import { validateUoms } from './utils';

@Injectable()
export class UpdateItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
    @Optional()
    private readonly pricingService?: PricingService,
    @Optional()
    private readonly inventoryService?: InventoryService,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) { }

  async execute(productId: string, payload: CreateItemDto, organizationId: string, performedByUserId?: string): Promise<Item> {
     

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



    const product = new Item(
      productId,
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
      baseUom ?? null,
      purchaseUom ?? null,
      saleUom ?? null,
      payload.barcode ?? null,
      payload.trackLot ?? true,
      payload.trackExpiry ?? true,
      payload.shelfLifeDays ?? null,
      payload.isActive ?? true,
    );


    const created = await this.productRepository.save(product);

    for (const item of payload.priceListItems ?? []) {
      if (!item.priceListId) {
        throw new BadRequestException('Price list id is required for each price list item');
      }

      await this.pricingService?.createPriceListItem(
        {
          ...item,
          priceListId:item.priceListId,
          itemId: created.id,
        },
        organizationId,
      );
    }

    for (const item of payload.stockItems ?? []) {
      if (!performedByUserId) {
        throw new BadRequestException('Performed by user id is required when creating stock items');
      }

      await this.inventoryService?.adjustByReference(
        {
          ...item,
          itemId: created.id,
        },
        performedByUserId,
        organizationId,
      );
    }

    await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
    await this.cacheService?.del(`catalog:get:${organizationId}:${productId}`);
    return created;
  }
}
