import { Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { ITEM_REPOSITORY } from './catalog.di-tokens';
import type { ItemRepository } from '../repositories/item.repository';
import { Item } from '../domains/item.entity';
import type { PatchItemDto } from '../dto/patch-item.dto';
import { AppCacheService } from 'src/common/cache/cache.service';

@Injectable()
export class PatchItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
        @Optional()
        private readonly cacheService?: AppCacheService,
  ) {}

  async execute(itemId: string, payload: PatchItemDto, organizationId: string): Promise<Item> {
    const existing = await this.productRepository.findById(itemId, organizationId);
    if (!existing) {
      throw new NotFoundException('Item not found');
    }

    const patched = new Item(
      existing.id,
      existing.organizationId,
      existing.code,
      payload.name ?? existing.name,
      existing.genericProductId,
      existing.categoryId,
      existing.category,
      existing.genericProduct,
      existing.baseUomId,
      existing.purchaseUomId,
      existing.saleUomId,
      existing.baseUom,
      existing.purchaseUom,
      existing.saleUom,
      payload.barcode ?? existing.barcode,
      existing.trackLot,
      existing.trackExpiry,
      existing.shelfLifeDays,
      payload.isActive ?? existing.isActive,
    );

    const res = this.productRepository.save(patched);

    await this.cacheService?.invalidateByPrefix(`catalog:list:${organizationId}:`);
    await this.cacheService?.del(`catalog:get:${organizationId}:${existing.id}`);
    return res
  }
}
