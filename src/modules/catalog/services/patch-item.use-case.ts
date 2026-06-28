import { BadRequestException, Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { ITEM_REPOSITORY } from './catalog.di-tokens';
import type { ItemRepository } from '../repositories/item.repository';
import { Item } from '../domains/item.entity';
import type { PatchItemDto } from '../dto/patch-item.dto';
import { AppCacheService } from 'src/common/cache/cache.service';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
import { validateUoms } from './utils';

@Injectable()
export class PatchItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
    private readonly genericDrugCache: GenericDrugCacheService,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(itemId: string, payload: PatchItemDto, organizationId: string): Promise<Item> {
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
      category = await this.productRepository.findCategoryById(payload.categoryId, organizationId) as any;
      if (!category) {
        throw new BadRequestException('Category does not exist');
      }
    }

    if (payload.baseUomId !== undefined) {
      const baseUom = await this.productRepository.findUomById(payload.baseUomId, organizationId);
      if (!baseUom) throw new BadRequestException('Base UOM does not exist');
    }
    if (payload.purchaseUomId !== undefined) {
      const purchaseUom = await this.productRepository.findUomById(payload.purchaseUomId, organizationId);
      if (!purchaseUom) throw new BadRequestException('Purchase UOM does not exist');
    }
    if (payload.saleUomId !== undefined) {
      const saleUom = await this.productRepository.findUomById(payload.saleUomId, organizationId);
      if (!saleUom) throw new BadRequestException('Sale UOM does not exist');
    }

    const patched = new Item(
      existing.id,
      existing.organizationId,
      payload.code ?? existing.code,
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
      payload.barcode ?? existing.barcode,
      payload.trackLot ?? existing.trackLot,
      payload.trackExpiry ?? existing.trackExpiry,
      payload.shelfLifeDays ?? existing.shelfLifeDays,
      payload.isActive ?? existing.isActive,
      payload.imageUrl ?? existing.imageUrl,
      payload.smallImageUrl ?? existing.smallImageUrl,
      payload.mediumImageUrl ?? existing.mediumImageUrl,
      payload.largeImageUrl ?? existing.largeImageUrl,
    );

    const res = await this.productRepository.save(patched);

    await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
    await this.cacheService?.del(`catalog:get:${organizationId}:${existing.id}`);
    return res;
  }
}
