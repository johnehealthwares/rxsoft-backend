"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogMapper = void 0;
const item_entity_1 = require("../domains/item.entity");
const item_category_entity_1 = require("../domains/item-category.entity");
class CatalogMapper {
    static toDomainItemCategory(orm) {
        return new item_category_entity_1.ItemCategory(orm.id, orm.code, orm.name);
    }
    static toForeignProperty(orm) {
        return {
            id: orm.id,
            code: orm.code,
            name: orm.name,
        };
    }
    static toDomainItem(orm) {
        return new item_entity_1.Item(orm.id, orm.organizationId, orm.code, orm.name, orm.genericProductCode, orm.category?.id, orm.category && this.toDomainItemCategory(orm.category), orm.baseUomId, orm.purchaseUomId, orm.saleUomId, orm.baseUom && this.toForeignProperty(orm.baseUom), orm.purchaseUom && this.toForeignProperty(orm.purchaseUom), orm.saleUom && this.toForeignProperty(orm.saleUom), orm.barcode, orm.trackLot, orm.trackExpiry, orm.shelfLifeDays, orm.isActive, orm.imageUrl ?? null, orm.smallImageUrl ?? null, orm.mediumImageUrl ?? null, orm.largeImageUrl ?? null);
    }
}
exports.CatalogMapper = CatalogMapper;
//# sourceMappingURL=catalog.mapper.js.map