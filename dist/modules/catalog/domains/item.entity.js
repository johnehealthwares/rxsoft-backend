"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    id;
    organizationId;
    code;
    name;
    genericProductCode;
    categoryId;
    category;
    baseUomId;
    purchaseUomId;
    saleUomId;
    baseUom;
    purchaseUom;
    saleUom;
    barcode;
    trackLot;
    trackExpiry;
    shelfLifeDays;
    isActive;
    imageUrl;
    smallImageUrl;
    mediumImageUrl;
    largeImageUrl;
    constructor(id, organizationId, code, name, genericProductCode, categoryId, category, baseUomId, purchaseUomId, saleUomId, baseUom, purchaseUom, saleUom, barcode, trackLot, trackExpiry, shelfLifeDays, isActive, imageUrl = null, smallImageUrl = null, mediumImageUrl = null, largeImageUrl = null) {
        this.id = id;
        this.organizationId = organizationId;
        this.code = code;
        this.name = name;
        this.genericProductCode = genericProductCode;
        this.categoryId = categoryId;
        this.category = category;
        this.baseUomId = baseUomId;
        this.purchaseUomId = purchaseUomId;
        this.saleUomId = saleUomId;
        this.baseUom = baseUom;
        this.purchaseUom = purchaseUom;
        this.saleUom = saleUom;
        this.barcode = barcode;
        this.trackLot = trackLot;
        this.trackExpiry = trackExpiry;
        this.shelfLifeDays = shelfLifeDays;
        this.isActive = isActive;
        this.imageUrl = imageUrl;
        this.smallImageUrl = smallImageUrl;
        this.mediumImageUrl = mediumImageUrl;
        this.largeImageUrl = largeImageUrl;
    }
}
exports.Item = Item;
//# sourceMappingURL=item.entity.js.map