"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStockBalanceType = exports.toJournalEntryType = exports.toJournalEntryLineType = exports.toJournalType = exports.toGlAccountType = exports.toOrganizationType = exports.toPaymentMethodType = exports.toPriceListItemType = exports.toPurchaseOrderType = exports.toPriceListType = exports.toStockLocationType = exports.toWarehouseType = exports.toUomType = exports.toUomCategoryType = exports.toPartyType = exports.toItemCategoryType = exports.toItemSummaryType = exports.toManufacturerType = void 0;
const toIsoString = (value) => value ? value.toISOString() : null;
const toManufacturerType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    code: entity.code,
    name: entity.name,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
    deletedAt: toIsoString(entity.deletedAt),
});
exports.toManufacturerType = toManufacturerType;
const toItemSummaryType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    code: entity.code,
    name: entity.name,
    barcode: entity.barcode,
    baseUomId: entity.baseUomId,
    purchaseUomId: entity.purchaseUomId,
    saleUomId: entity.saleUomId,
    trackLot: entity.trackLot,
    trackExpiry: entity.trackExpiry,
    shelfLifeDays: entity.shelfLifeDays,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
    deletedAt: toIsoString(entity.deletedAt),
});
exports.toItemSummaryType = toItemSummaryType;
const toItemCategoryType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    parentId: entity.parent?.id ?? null,
    parent: entity.parent
        ? {
            id: entity.parent.id,
            organizationId: entity.parent.organizationId,
            code: entity.parent.code,
            name: entity.parent.name,
        }
        : null,
    code: entity.code,
    name: entity.name,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
    deletedAt: toIsoString(entity.deletedAt),
});
exports.toItemCategoryType = toItemCategoryType;
const toPartyType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    partyType: entity.partyType,
    code: entity.code,
    name: entity.name,
    phone: entity.phone,
    email: entity.email,
    addressLine1: entity.addressLine1,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
    deletedAt: toIsoString(entity.deletedAt),
});
exports.toPartyType = toPartyType;
const toUomCategoryType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    code: entity.code,
    name: entity.name,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toUomCategoryType = toUomCategoryType;
const toUomType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    categoryId: entity.categoryId,
    category: entity.category,
    code: entity.code,
    name: entity.name,
    uomType: entity.uomType,
    factor: entity.factor,
    rounding: entity.rounding,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toUomType = toUomType;
const toWarehouseType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    storeId: entity.storeId,
    code: entity.code,
    name: entity.name,
    address: entity.address,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toWarehouseType = toWarehouseType;
const toStockLocationType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    warehouseId: entity.warehouseId,
    warehouse: entity.warehouse ? (0, exports.toWarehouseType)(entity.warehouse) : null,
    parentId: entity.parentId,
    parent: entity.parent
        ? {
            id: entity.parent.id,
            organizationId: entity.parent.organizationId,
            warehouseId: entity.parent.warehouseId,
            code: entity.parent.code,
            name: entity.parent.name,
            locationType: entity.parent.locationType,
            isActive: entity.parent.isActive,
            createdAt: entity.parent.createdAt.toISOString(),
            updatedAt: entity.parent.updatedAt.toISOString(),
        }
        : null,
    code: entity.code,
    name: entity.name,
    locationType: entity.locationType,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toStockLocationType = toStockLocationType;
const toPriceListType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    code: entity.code,
    name: entity.name,
    isDefault: entity.isDefault,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toPriceListType = toPriceListType;
const toPurchaseOrderType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    purchaseOrderNumber: entity.purchaseOrderNumber,
    supplierId: entity.supplierId,
    warehouseId: entity.warehouseId,
    currencyCode: entity.currencyCode,
    orderDate: entity.orderDate,
    expectedDate: entity.expectedDate,
    status: entity.status,
    subtotalAmount: Number(entity.subtotalAmount),
    taxAmount: Number(entity.taxAmount),
    totalAmount: Number(entity.totalAmount),
    createdByUserId: entity.createdByUserId,
    approvedByUserId: entity.approvedByUserId,
    approvedAt: toIsoString(entity.approvedAt),
    note: entity.note,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toPurchaseOrderType = toPurchaseOrderType;
const toPriceListItemType = (entity) => ({
    id: entity.id,
    priceListId: entity.priceList.id,
    priceList: (0, exports.toPriceListType)(entity.priceList),
    item: (0, exports.toItemSummaryType)(entity.item),
    currencyCode: entity.currencyCode,
    unitPrice: entity.unitPrice,
    startsAt: toIsoString(entity.startsAt),
    endsAt: toIsoString(entity.endsAt),
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toPriceListItemType = toPriceListItemType;
const toPaymentMethodType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    code: entity.code,
    name: entity.name,
    methodType: entity.methodType,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toPaymentMethodType = toPaymentMethodType;
const toOrganizationType = (entity) => ({
    id: entity.id,
    code: entity.code,
    name: entity.name,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
    deletedAt: toIsoString(entity.deletedAt),
});
exports.toOrganizationType = toOrganizationType;
const toGlAccountType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    accountCode: entity.accountCode,
    accountName: entity.accountName,
    accountType: entity.accountType,
    allowsReconciliation: entity.allowsReconciliation,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toGlAccountType = toGlAccountType;
const toJournalType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    code: entity.code,
    name: entity.name,
    journalType: entity.journalType,
    defaultDebitAccountId: entity.defaultDebitAccountId,
    defaultCreditAccountId: entity.defaultCreditAccountId,
    isActive: entity.isActive,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
});
exports.toJournalType = toJournalType;
const toJournalEntryLineType = (entity) => ({
    id: entity.id,
    journalEntryId: entity.journalEntryId,
    lineNumber: entity.lineNumber,
    glAccountId: entity.glAccountId,
    partyId: entity.partyId,
    itemId: entity.itemId,
    debitAmount: Number(entity.debitAmount),
    creditAmount: Number(entity.creditAmount),
    description: entity.description,
    createdAt: entity.createdAt.toISOString(),
});
exports.toJournalEntryLineType = toJournalEntryLineType;
const toJournalEntryType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    journalId: entity.journalId,
    entryNumber: entity.entryNumber,
    entryDate: entity.entryDate,
    reference: entity.reference,
    sourceType: entity.sourceType,
    sourceId: entity.sourceId,
    status: entity.status,
    createdByUserId: entity.createdByUserId,
    postedAt: toIsoString(entity.postedAt),
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
    lines: entity.lines ? entity.lines.map(exports.toJournalEntryLineType) : [],
});
exports.toJournalEntryType = toJournalEntryType;
const toStockBalanceType = (entity) => ({
    id: entity.id,
    organizationId: entity.organizationId,
    item: {
        id: entity.item.id,
        code: entity.item.code,
        name: entity.item.name,
    },
    location: {
        id: entity.location.id,
        name: entity.location.name,
    },
    lot: entity.lot
        ? {
            id: entity.lot.id,
            code: entity.lot.code,
        }
        : null,
    quantityOnHand: entity.quantityOnHand,
    quantityReserved: entity.quantityReserved,
    averageCost: entity.averageCost,
    reorderMinQty: entity.reorderMinQty,
    reorderMaxQty: entity.reorderMaxQty,
});
exports.toStockBalanceType = toStockBalanceType;
//# sourceMappingURL=mappers.js.map