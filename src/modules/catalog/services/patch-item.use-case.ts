import { BadRequestException, Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { ITEM_REPOSITORY } from './catalog.di-tokens';
import type { ItemRepository } from '../repositories/item.repository';
import { Item } from '../domains/item.entity';
import type { PatchItemDto } from '../dto/patch-item.dto';
import { AppCacheService } from 'src/common/cache/cache.service';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
import { PricingService } from '../../pricing/services/pricing.service';
import { InventoryService } from '../../inventory/services/inventory.service';
import { OrganisationItemsService } from './organisation-items.service';

@Injectable()
export class PatchItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
    private readonly genericDrugCache: GenericDrugCacheService,
    @Optional()
    private readonly pricingService?: PricingService,
    @Optional()
    private readonly inventoryService?: InventoryService,
    @Optional()
    private readonly organisationItemsService?: OrganisationItemsService,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    itemId: string,
    payload: PatchItemDto,
    organizationId: string,
    performedByUserId?: string,
  ): Promise<Item> {
    const existing = await this.productRepository.findById(itemId, organizationId, true);
    if (!existing) {
      throw new NotFoundException('Item not found');
    }

    if (payload.genericProductCode !== undefined) {
      const genericProduct = this.genericDrugCache.getByCode(payload.genericProductCode);
      if (!genericProduct) {
        throw new BadRequestException('Generic product does not exist');
      }
    }

    let category = existing.category;
    if (payload.categoryId !== undefined) {
      category = await this.productRepository.findCategoryById(payload.categoryId) as any;
      if (!category) {
        throw new BadRequestException('Category does not exist');
      }
    }

    let newBaseUom = undefined as Awaited<ReturnType<ItemRepository['findUomById']>> | undefined;
    if (payload.baseUomId !== undefined) {
      newBaseUom = await this.productRepository.findUomById(payload.baseUomId);
      if (!newBaseUom) throw new BadRequestException('Base UOM does not exist');
    }

    if (payload.baseUomId !== undefined) {
      const baseUom = await this.productRepository.findUomById(payload.baseUomId);
      if (!baseUom) throw new BadRequestException('Base UOM does not exist');
    }
    if (payload.purchaseUomId !== undefined) {
      const purchaseUom = await this.productRepository.findUomById(payload.purchaseUomId);
      if (!purchaseUom) throw new BadRequestException('Purchase UOM does not exist');
    }
    if (payload.saleUomId !== undefined) {
      const saleUom = await this.productRepository.findUomById(payload.saleUomId);
      if (!saleUom) throw new BadRequestException('Sale UOM does not exist');
    }

    const patched = new Item(
      existing.id,
      payload.name ?? existing.name,
      payload.genericProductCode ?? existing.genericProductCode,
      payload.categoryId ?? existing.categoryId,
      category,
      payload.baseUomId ?? existing.baseUomId,
      payload.purchaseUomId ?? existing.purchaseUomId,
      payload.saleUomId ?? existing.saleUomId,
      existing.baseUom,
      existing.purchaseUom,
      existing.saleUom,
      payload.trackLot ?? existing.trackLot,
      payload.trackExpiry ?? existing.trackExpiry,
      payload.shelfLifeDays ?? existing.shelfLifeDays,
      payload.imageUrl ?? existing.imageUrl,
      payload.smallImageUrl ?? existing.smallImageUrl,
      payload.mediumImageUrl ?? existing.mediumImageUrl,
      payload.largeImageUrl ?? existing.largeImageUrl,
    );

    const res = await this.productRepository.save(patched);

    // Base UOM changed → convert existing stock quantities into the new base
    // UOM (recorded as 'base-conversion' stock adjustments).
    if (
      this.inventoryService &&
      newBaseUom &&
      existing.baseUomId &&
      existing.baseUomId !== payload.baseUomId
    ) {
      const oldBase = await this.productRepository.findUomById(existing.baseUomId);
      if (oldBase) {
        await this.inventoryService.rebaseForBaseUomChange({
          itemId: existing.id,
          oldBase,
          newBase: newBaseUom,
          newBaseUomId: payload.baseUomId,
          performedByUserId: performedByUserId ?? null,
        });
      }
    }

    // Persist org-level override fields (code/barcode/alias) onto the org's
    // organisation_items row (idempotent, only when the payload carries them).
    // isActive is routed onto organisation_items too: white/blacklist per org.
    if (
      payload.code !== undefined ||
      payload.barcode !== undefined ||
      payload.alias !== undefined ||
      payload.isActive !== undefined
    ) {
      await this.organisationItemsService?.upsert(organizationId, existing.id, {
        ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
        alias: payload.alias ?? null,
        code: payload.code ?? null,
        barcode: payload.barcode ?? null,
      });
    }

    for (const item of payload.priceListItems ?? []) {
      if (!item.priceListId) {
        throw new BadRequestException('Price list id is required for each price list item');
      }
      await this.pricingService?.createPriceListItem(
        {
          ...item,
          priceListId: item.priceListId,
          itemId: existing.id,
        },
        organizationId,
      );
    }

    for (const item of payload.stockItems ?? []) {
      if (!performedByUserId) {
        throw new BadRequestException(
          'Performed by user id is required when creating stock items',
        );
      }
      await this.inventoryService?.adjustByReference(
        {
          ...item,
          itemId: existing.id,
        },
        performedByUserId,
        organizationId,
      );
    }

    await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
    await this.cacheService?.del(`catalog:get:${organizationId}:${existing.id}`);
    return res;
  }
}
