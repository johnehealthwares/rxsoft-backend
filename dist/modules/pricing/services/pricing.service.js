"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
const mappers_1 = require("../../../shared/domain/mappers");
const item_orm_entity_1 = require("../../catalog/entities/item.orm-entity");
const stock_location_orm_entity_1 = require("../../inventory/entities/stock-location.orm-entity");
const entities_1 = require("../entities");
const list_1 = require("../../../database/list");
const code_validation_1 = require("../../../shared/utils/code-validation");
let PricingService = class PricingService {
    priceListRepository;
    priceListItemRepository;
    itemRepository;
    stockLocationRepository;
    constructor(priceListRepository, priceListItemRepository, itemRepository, stockLocationRepository) {
        this.priceListRepository = priceListRepository;
        this.priceListItemRepository = priceListItemRepository;
        this.itemRepository = itemRepository;
        this.stockLocationRepository = stockLocationRepository;
    }
    async listPriceLists(query, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
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
        return { data: data.map(mappers_1.toPriceListType), total };
    }
    async getPriceList(id, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const item = await this.priceListRepository.findOne({ where: { id, organizationId } });
        if (!item)
            throw new common_1.NotFoundException('Price list not found');
        return (0, mappers_1.toPriceListType)(item);
    }
    async createPriceList(payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const last = await this.priceListRepository.findOne({
            where: { organizationId },
            order: { createdAt: 'DESC' },
            select: ['code'],
        });
        const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
            providedCode: payload.code,
            lastCode: last?.code,
            override: payload.overrideCodeValidation,
        });
        if (!valid) {
            throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
        }
        const duplicate = await this.priceListRepository.findOne({
            where: { organizationId, code: payload.code },
        });
        if (duplicate)
            throw new common_1.BadRequestException('Price list code already exists');
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
        return (0, mappers_1.toPriceListType)(savedEntity);
    }
    async updatePriceList(id, payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const item = await this.priceListRepository.findOne({ where: { id, organizationId } });
        if (!item)
            throw new common_1.NotFoundException('Price list not found');
        if (payload.code && payload.code !== item.code) {
            const duplicate = await this.priceListRepository.findOne({
                where: { organizationId, code: payload.code },
            });
            if (duplicate)
                throw new common_1.BadRequestException('Price list code already exists');
            item.code = payload.code;
        }
        if (payload.name !== undefined)
            item.name = payload.name;
        if (payload.isActive !== undefined)
            item.isActive = payload.isActive;
        if (payload.isDefault !== undefined) {
            if (payload.isDefault) {
                await this.priceListRepository.update({ organizationId }, { isDefault: false });
            }
            item.isDefault = payload.isDefault;
        }
        const savedItem = await this.priceListRepository.save(item);
        return (0, mappers_1.toPriceListType)(savedItem);
    }
    async listPriceListItems(priceListId, query, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        if (priceListId)
            await this.getPriceList(priceListId, organizationId);
        const qb = this.priceListItemRepository
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.item', 'itemRef')
            .leftJoinAndSelect('item.priceList', 'priceList');
        if (query.search) {
            try {
                const filters = JSON.parse(query.search);
                await (0, list_1.applyFilters)(qb, 'price_list', filters);
            }
            catch {
                qb.andWhere('(itemRef.code ILIKE :search OR itemRef.name ILIKE :search)', { search: `%${query.search}%` });
            }
        }
        if (priceListId)
            qb.andWhere('priceList.id = :priceListId', { priceListId });
        qb.skip(query.offset)
            .take(query.limit);
        if (query.itemId)
            qb.andWhere('itemRef.id = :itemId', { itemId: query.itemId });
        if (query.locationId)
            qb.andWhere('location.id = :locationId', { locationId: query.locationId });
        console.log(qb.getSql());
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toPriceListItemType), total };
    }
    async createPriceListItem(payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const priceList = await this.priceListRepository.findOne({ where: { id: payload.priceListId, organizationId } });
        if (!priceList)
            throw new common_1.NotFoundException('Price list not found');
        const item = await this.itemRepository.findOne({ where: { id: payload.itemId, organizationId, isActive: true } });
        if (!item)
            throw new common_1.BadRequestException('Item not found');
        const location = payload.locationId
            ? await this.stockLocationRepository.findOne({ where: { id: payload.locationId, organizationId } })
            : null;
        if (payload.locationId && !location)
            throw new common_1.BadRequestException('Stock location not found');
        const startsAt = payload.startsAt
            ? new Date(payload.startsAt)
            : null;
        const endsAt = payload.endsAt
            ? new Date(payload.endsAt)
            : null;
        if (startsAt && endsAt && startsAt > endsAt) {
            throw new common_1.BadRequestException('startsAt cannot be greater than endsAt');
        }
        const overlapQuery = this.priceListItemRepository
            .createQueryBuilder('item')
            .where('price_list_id = :priceListId', { priceListId: payload.priceListId })
            .andWhere('item_id = :itemId', {
            itemId: payload.itemId,
        });
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
            throw new common_1.BadRequestException('A price list item already exists for this product and date range');
        }
        const entity = this.priceListItemRepository.create({
            priceList,
            item,
            location,
            currencyCode: payload.currencyCode ?? 'NGN',
            unitPrice: payload.unitPrice,
            startsAt: payload.startsAt ? new Date(payload.startsAt) : undefined,
            endsAt: payload.endsAt ? new Date(payload.endsAt) : undefined,
        });
        const savedEntity = await this.priceListItemRepository.save(entity);
        const fullEntity = await this.priceListItemRepository.findOneOrFail({
            where: { id: savedEntity.id },
            relations: { priceList: true, item: true },
        });
        return (0, mappers_1.toPriceListItemType)(fullEntity);
    }
    async updatePriceListItem(priceListId, priceListItemId, payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        await this.getPriceList(priceListId, organizationId);
        const item = await this.priceListItemRepository.findOne({
            where: { id: priceListItemId, priceList: { id: priceListId } },
            relations: { priceList: true, item: true },
        });
        console.log({ item, payload, priceListId, priceListItemId });
        if (!item || item.priceList.organizationId !== organizationId) {
            throw new common_1.NotFoundException('Price list item not found');
        }
        if (payload.itemId) {
            const itemRef = await this.itemRepository.findOne({ where: { id: payload.itemId, organizationId, isActive: true } });
            if (!itemRef)
                throw new common_1.BadRequestException('Item not found');
            item.item = itemRef;
        }
        if (payload.locationId !== undefined) {
            const location = payload.locationId
                ? await this.stockLocationRepository.findOne({ where: { id: payload.locationId, organizationId } })
                : null;
            if (payload.locationId && !location)
                throw new common_1.BadRequestException('Stock location not found');
        }
        if (payload.currencyCode !== undefined)
            item.currencyCode = payload.currencyCode;
        if (payload.unitPrice !== undefined)
            item.unitPrice = payload.unitPrice;
        if (payload.startsAt !== undefined)
            item.startsAt = payload.startsAt ? new Date(payload.startsAt) : undefined;
        if (payload.endsAt !== undefined)
            item.endsAt = payload.endsAt ? new Date(payload.endsAt) : undefined;
        const savedItem = await this.priceListItemRepository.save(item);
        const fullEntity = await this.priceListItemRepository.findOneOrFail({
            where: { id: savedItem.id },
            relations: { priceList: true, item: true },
        });
        return (0, mappers_1.toPriceListItemType)(fullEntity);
    }
    async adjustItemPrice(payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const priceList = await this.priceListRepository.findOne({
            where: { id: payload.priceListId, organizationId },
        });
        if (!priceList)
            throw new common_1.NotFoundException('Price list not found');
        const itemRef = await this.itemRepository.findOne({ where: { id: payload.itemId, organizationId, isActive: true } });
        if (!itemRef)
            throw new common_1.BadRequestException('Item not found');
        const location = payload.locationId
            ? await this.stockLocationRepository.findOne({ where: { id: payload.locationId, organizationId } })
            : null;
        if (payload.locationId && !location)
            throw new common_1.BadRequestException('Stock location not found');
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
            });
        }
        else {
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
        return (0, mappers_1.toPriceListItemType)(fullEntity);
    }
    async deletePriceList(id, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const result = await this.priceListRepository.delete({ id, organizationId });
        if (!result.affected)
            throw new common_1.NotFoundException('Price list not found');
    }
    async deletePriceListItem(priceListId, itemId, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        await this.getPriceList(priceListId, organizationId);
        const item = await this.priceListItemRepository.findOne({
            where: { id: itemId, priceList: { id: priceListId, organizationId } },
            relations: { priceList: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Price list item not found');
        await this.priceListItemRepository.delete({ id: itemId });
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.PriceListOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.PriceListItemOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(item_orm_entity_1.ItemOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(stock_location_orm_entity_1.StockLocationOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PricingService);
//# sourceMappingURL=pricing.service.js.map