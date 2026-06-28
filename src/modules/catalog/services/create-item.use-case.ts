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
import { validateSequentialCode } from '../../../shared/utils/code-validation';

@Injectable()
export class CreateItemUseCase {
  constructor(
    @Inject(ITEM_REPOSITORY)
    private readonly productRepository: ItemRepository,
    private readonly cache: GenericDrugCacheService,
    @Optional()
    private readonly pricingService?: PricingService,
    @Optional()
    private readonly inventoryService?: InventoryService,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) { }

  async execute(payload: CreateItemDto, organizationId: string, performedByUserId?: string): Promise<Item> {
    const lastItem = await this.productRepository.findLastCreated(organizationId);
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: lastItem?.code,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }

    const existing = await this.productRepository.findByCode(payload.code, organizationId);
    if (existing) {
      throw new BadRequestException('Item code already exists');
    }

    if (payload.barcode) {
      const barcode = await this.productRepository.findByBarcode(payload.barcode, organizationId);
      if (barcode) {
        throw new BadRequestException('Item barcode already exists');
      }
    }

    const category = await this.productRepository.findCategoryById(payload.categoryId, organizationId);
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
      randomUUID(),
      organizationId,
      payload.code,
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
