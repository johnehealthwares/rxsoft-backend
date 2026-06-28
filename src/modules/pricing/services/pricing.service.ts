import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import { toPriceListItemType, toPriceListType } from '../../../shared/domain/mappers';
import type { PriceListItemType, PriceListType } from '../../../shared/domain';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockLocationOrmEntity } from '../../inventory/entities/stock-location.orm-entity';
import {
  AdjustItemPriceDto,
  CreatePriceListDto,
  CreatePriceListItemDto,
  ListPriceListItemsDto,
  ListPriceListsDto,
  UpdatePriceListDto,
  UpdatePriceListItemDto,
} from '../dto/pricing.dto';
import { PriceListItemOrmEntity, PriceListOrmEntity } from '../entities';
import { applyFilters } from '../../../database/list';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(PriceListOrmEntity)
    private readonly priceListRepository: Repository<PriceListOrmEntity>,
    @InjectRepository(PriceListItemOrmEntity)
    private readonly priceListItemRepository: Repository<PriceListItemOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository: Repository<ItemOrmEntity>,
    @InjectRepository(StockLocationOrmEntity)
    private readonly stockLocationRepository: Repository<StockLocationOrmEntity>,
  ) { }

  async listPriceLists(
    query: ListPriceListsDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<{ data: PriceListType[]; total: number }> {


    const qb = this.priceListRepository
      .createQueryBuilder('price_list')
      .where('price_list.organization_id = :organizationId', { organizationId })
      .where('price_list.is_active = :is_active', { is_active: true })

      .orderBy('price_list.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);
    if (query.search) {
      qb.andWhere('(price_list.code ILIKE :search OR price_list.name ILIKE :search)', {
        search: `%${query.search}%`,

      });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toPriceListType), total };
  }

  async getPriceList(id: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<PriceListType> {
    const item = await this.priceListRepository.findOne({ where: { id, organizationId } });
    if (!item) throw new NotFoundException('Price list not found');
    return toPriceListType(item);
  }

  async createPriceList(payload: CreatePriceListDto, organizationId = DEFAULT_ORGANIZATION_ID): Promise<PriceListType> {
    const last = await this.priceListRepository.findOne({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      select: ['code'],
    });
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: last?.code,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }

    const duplicate = await this.priceListRepository.findOne({
      where: { organizationId, code: payload.code },
    });
    if (duplicate) throw new BadRequestException('Price list code already exists');

    if (payload.isDefault) {
      await this.priceListRepository.update({ organizationId }, { isDefault: false });
    }

    const entity = this.priceListRepository.create({
      organizationId,
      code: payload.code,
      name: payload.name,
      isDefault: payload.isDefault ?? false,
      isActive: payload.isActive ?? true,
    });
    const savedEntity = await this.priceListRepository.save(entity);
    return toPriceListType(savedEntity);
  }

  async updatePriceList(
    id: string,
    payload: UpdatePriceListDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<PriceListType> {
    const item = await this.priceListRepository.findOne({ where: { id, organizationId } });
    if (!item) throw new NotFoundException('Price list not found');
    if (payload.code && payload.code !== item.code) {
      const duplicate = await this.priceListRepository.findOne({
        where: { organizationId, code: payload.code },
      });
      if (duplicate) throw new BadRequestException('Price list code already exists');
      item.code = payload.code;
    }
    if (payload.name !== undefined) item.name = payload.name;
    if (payload.isActive !== undefined) item.isActive = payload.isActive;
    if (payload.isDefault !== undefined) {
      if (payload.isDefault) {
        await this.priceListRepository.update({ organizationId }, { isDefault: false });
      }
      item.isDefault = payload.isDefault;
    }
    const savedItem = await this.priceListRepository.save(item);
    return toPriceListType(savedItem);
  }

  async listPriceListItems(
    priceListId: string | null,
    query: ListPriceListItemsDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<{ data: PriceListItemType[]; total: number }> {
    if (priceListId) await this.getPriceList(priceListId, organizationId);
    const qb = this.priceListItemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.item', 'itemRef')
      //.leftJoinAndSelect('item.location', 'location')
      .leftJoinAndSelect('item.priceList', 'priceList')

    if (query.search) {
      try {
        const filters = JSON.parse(query.search);
        await applyFilters(qb, 'price_list', filters)
      } catch {
        qb.andWhere('(itemRef.code ILIKE :search OR itemRef.name ILIKE :search)', { search: `%${query.search}%` });
      }
    }

    if (priceListId) qb.andWhere('priceList.id = :priceListId', { priceListId });

    // .where('priceList.id = :priceListId', { priceListId })
    //.orderBy('item.updated_at', 'DESC')
    qb.skip(query.offset)
      .take(query.limit);

    if (query.itemId) qb.andWhere('itemRef.id = :itemId', { itemId: query.itemId });
    if (query.locationId) qb.andWhere('location.id = :locationId', { locationId: query.locationId });

    console.log(qb.getSql())
    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toPriceListItemType), total };
  }

  async createPriceListItem(
    payload: CreatePriceListItemDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<PriceListItemType> {
    const priceList = await this.priceListRepository.findOne({ where: { id: payload.priceListId, organizationId } });
    if (!priceList) throw new NotFoundException('Price list not found');
    const item = await this.itemRepository.findOne({ where: { id: payload.itemId, organizationId, isActive: true } });
    if (!item) throw new BadRequestException('Item not found');

    const location = payload.locationId
      ? await this.stockLocationRepository.findOne({ where: { id: payload.locationId, organizationId } })
      : null;
    if (payload.locationId && !location) throw new BadRequestException('Stock location not found');

    const startsAt = payload.startsAt
      ? new Date(payload.startsAt)
      : null;

    const endsAt = payload.endsAt
      ? new Date(payload.endsAt)
      : null;
    if (startsAt && endsAt && startsAt > endsAt) {
      throw new BadRequestException(
        'startsAt cannot be greater than endsAt',
      );
    }
    const overlapQuery = this.priceListItemRepository
      .createQueryBuilder('item')
      .where('price_list_id = :priceListId', { priceListId: payload.priceListId })
      .andWhere('item_id = :itemId', {
        itemId: payload.itemId,
      });

    // if (payload.locationId) {
    //   overlapQuery.andWhere('item.locationId = :locationId', {
    //     locationId: payload.locationId,
    //   });
    // } else {
    //   overlapQuery.andWhere('item.locationId IS NULL');
    // }

    overlapQuery.andWhere(`
    (
      (item.startsAt IS NULL OR item.startsAt <= :newEndsAt)
      AND
      (item.endsAt IS NULL OR item.endsAt >= :newStartsAt)
    )
  `, {
      newStartsAt: startsAt ?? new Date('1970-01-01'),
      newEndsAt: endsAt ?? new Date('9999-12-31'),
    });
    const overlappingItem = await overlapQuery.getOne();

    if (overlappingItem) {
      throw new BadRequestException(
        'A price list item already exists for this product and date range',
      );
    }

    const entity = this.priceListItemRepository.create({
      priceList,
      item,
      location,
      currencyCode: payload.currencyCode ?? 'NGN',
      unitPrice: payload.unitPrice,
      startsAt: payload.startsAt ? new Date(payload.startsAt) : undefined,
      endsAt: payload.endsAt ? new Date(payload.endsAt) : undefined,
    } as DeepPartial<PriceListItemOrmEntity>);
    const savedEntity = await this.priceListItemRepository.save(entity);
    const fullEntity = await this.priceListItemRepository.findOneOrFail({
      where: { id: savedEntity.id },
      relations: { priceList: true, item: true },
    });
    return toPriceListItemType(fullEntity);
  }

  async updatePriceListItem(
    priceListId: string,
    priceListItemId: string,
    payload: UpdatePriceListItemDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<PriceListItemType> {
    await this.getPriceList(priceListId, organizationId);
    const item = await this.priceListItemRepository.findOne({
      where: { id: priceListItemId, priceList: { id: priceListId } },
      relations: { priceList: true, item: true },
    });
    console.log({item, payload, priceListId, priceListItemId})
    if (!item || item.priceList.organizationId !== organizationId) {
      throw new NotFoundException('Price list item not found');
    }

    if (payload.itemId) {
      const itemRef = await this.itemRepository.findOne({ where: { id: payload.itemId, organizationId, isActive: true } });
      if (!itemRef) throw new BadRequestException('Item not found');
      item.item = itemRef;
    }

    if (payload.locationId !== undefined) {
      const location = payload.locationId
        ? await this.stockLocationRepository.findOne({ where: { id: payload.locationId, organizationId } })
        : null;
      if (payload.locationId && !location) throw new BadRequestException('Stock location not found');
    }

    if (payload.currencyCode !== undefined) item.currencyCode = payload.currencyCode;
    if (payload.unitPrice !== undefined) item.unitPrice = payload.unitPrice;
    if (payload.startsAt !== undefined) item.startsAt = payload.startsAt ? new Date(payload.startsAt) : undefined;
    if (payload.endsAt !== undefined) item.endsAt = payload.endsAt ? new Date(payload.endsAt) : undefined;

    const savedItem = await this.priceListItemRepository.save(item);
    const fullEntity = await this.priceListItemRepository.findOneOrFail({
      where: { id: savedItem.id },
      relations: { priceList: true, item: true },
    });
    return toPriceListItemType(fullEntity);
  }

  async adjustItemPrice(
    payload: AdjustItemPriceDto,
    organizationId = DEFAULT_ORGANIZATION_ID,
  ): Promise<PriceListItemType> {
    const priceList = await this.priceListRepository.findOne({
      where: { id: payload.priceListId, organizationId },
    });
    if (!priceList) throw new NotFoundException('Price list not found');
    const itemRef = await this.itemRepository.findOne({ where: { id: payload.itemId, organizationId, isActive: true } });
    if (!itemRef) throw new BadRequestException('Item not found');

    const location = payload.locationId
      ? await this.stockLocationRepository.findOne({ where: { id: payload.locationId, organizationId } })
      : null;
    if (payload.locationId && !location) throw new BadRequestException('Stock location not found');

    let item = await this.priceListItemRepository.findOne({
      where: {
        priceList: { id: priceList.id },
        item: { id: itemRef.id },
        currencyCode: payload.currencyCode ?? 'NGN',
      },
      relations: { priceList: true, item: true },
      order: { updatedAt: 'DESC' },
    });

    if (!item) {
      item = this.priceListItemRepository.create({
        priceList,
        item: itemRef,
        location,
        currencyCode: payload.currencyCode ?? 'NGN',
        unitPrice: payload.unitPrice,
        startsAt: payload.startsAt ? new Date(payload.startsAt) : undefined,
        endsAt: payload.endsAt ? new Date(payload.endsAt) : undefined,
      } as DeepPartial<PriceListItemOrmEntity>);
    } else {
      item.currencyCode = payload.currencyCode ?? item.currencyCode;
      item.unitPrice = payload.unitPrice;
      item.startsAt = payload.startsAt ? new Date(payload.startsAt) : item.startsAt;
      item.endsAt = payload.endsAt ? new Date(payload.endsAt) : item.endsAt;
    }

    const savedItem = await this.priceListItemRepository.save(item);
    const fullEntity = await this.priceListItemRepository.findOneOrFail({
      where: { id: savedItem.id },
      relations: { priceList: true, item: true },
    });
    return toPriceListItemType(fullEntity);
  }

  async deletePriceList(id: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<void> {
    const result = await this.priceListRepository.delete({ id, organizationId });
    if (!result.affected) throw new NotFoundException('Price list not found');
  }

  async deletePriceListItem(priceListId: string, itemId: string, organizationId = DEFAULT_ORGANIZATION_ID): Promise<void> {
    await this.getPriceList(priceListId, organizationId);
    const item = await this.priceListItemRepository.findOne({
      where: { id: itemId, priceList: { id: priceListId, organizationId } },
      relations: { priceList: true },
    });
    if (!item) throw new NotFoundException('Price list item not found');
    await this.priceListItemRepository.delete({ id: itemId });
  }
}
