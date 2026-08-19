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
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
import { OrganisationItemsService } from './organisation-items.service';

@Injectable()
export class CreateItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
    private readonly cache: GenericDrugCacheService,
    @Optional()
    private readonly organisationItemsService?: OrganisationItemsService,
    @Optional()
    private readonly pricingService?: PricingService,
    @Optional()
    private readonly inventoryService?: InventoryService,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) { }

  async execute(payload: CreateItemDto, organizationId: string, performedByUserId?: string): Promise<Item> {
    const category = await this.productRepository.findCategoryById(payload.categoryId);
    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    if (payload.genericProductCode) {
      const genericProduct = this.cache.getByCode(payload.genericProductCode);
      if (!genericProduct) {
        throw new BadRequestException('Generic product does not exist');
      }
    }

    if (!payload.baseUomId || !payload.purchaseUomId || !payload.saleUomId) {
      throw new BadRequestException('Base UOM, Purchase UOM and Sale UOM are required');
    }
    let baseUom, purchaseUom, saleUom;
    baseUom = await this.productRepository.findUomById(payload.baseUomId);
    if (!baseUom) {
      throw new BadRequestException('Base UOM does not exist');
    }

    purchaseUom = await this.productRepository.findUomById(payload.purchaseUomId);
    if (!purchaseUom) {
      throw new BadRequestException('Purchase UOM does not exist');
    }

    saleUom = await this.productRepository.findUomById(payload.saleUomId);
    if (!saleUom) {
      throw new BadRequestException('Sale UOM does not exist');
    }

    validateUoms({ baseUom, saleUom, purchaseUom })

    const product = new Item(
      randomUUID(),
      payload.name,
      payload.genericProductCode ?? null,
      category.id,
      category,
      payload.baseUomId,
      payload.purchaseUomId ?? null,
      payload.saleUomId ?? null,
      baseUom ?? null,
      purchaseUom ?? null,
      saleUom ?? null,
      payload.trackLot ?? true,
      payload.trackExpiry ?? true,
      payload.shelfLifeDays ?? null,
      payload.isActive ?? true,
      payload.imageUrl ?? null,
      payload.smallImageUrl ?? null,
      payload.mediumImageUrl ?? null,
      payload.largeImageUrl ?? null,
    );

    const created = await this.productRepository.save(product);

    // Every item is org-added for the creating user's org, so it is selectable
    // at point of sale under strict tenant scoping. Carries org identity fields
    // (code/barcode/alias) when supplied.
    await this.organisationItemsService?.upsert(organizationId, created.id, {
      isActive: true,
      alias: payload.alias ?? null,
      code: payload.code ?? null,
      barcode: payload.barcode ?? null,
    });

    const withOverlay = await this.productRepository.findById(created.id, organizationId, true);

    for (const item of payload.priceListItems ?? []) {
      if (!item.priceListId) {
        throw new BadRequestException('Price list id is required for each price list item');
      }

      await this.pricingService?.createPriceListItem(
        {
          ...item,
          priceListId: item.priceListId,
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
    return withOverlay ?? created;
  }
}
