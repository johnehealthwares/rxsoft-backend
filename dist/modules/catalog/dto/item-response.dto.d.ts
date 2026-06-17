export declare class ForeignProperty {
    id: string;
    code: string | null;
    name: string;
}
declare class ItemCategoryResponse {
    id: string;
    code: string;
    name: string;
}
declare class PharmaceuticsResponse {
    code: string;
    clinicalName: string;
    drugClass: string;
    pharmaceutics: string;
}
declare class GenericProductResponse {
    id: string;
    code: string;
    name: string;
    pharmaceutics: PharmaceuticsResponse;
    isPrescriptionRequired: boolean;
    isControlledSubstance: boolean;
}
export declare class ItemResponseDto {
    id: string;
    code: string;
    name: string;
    categoryId: string;
    genericProductCode: string | null;
    category: ItemCategoryResponse;
    genericProduct: GenericProductResponse | null;
    barcode: string | null;
    baseUomId: string;
    purchaseUomId: string | null;
    saleUomId: string | null;
    saleUom: ForeignProperty | null;
    baseUom: ForeignProperty | null;
    purchaseUom: ForeignProperty | null;
    trackLot: boolean;
    trackExpiry: boolean;
    shelfLifeDays: number | null;
    isActive: boolean;
    imageUrl: string | null;
    smallImageUrl: string | null;
    mediumImageUrl: string | null;
    largeImageUrl: string | null;
}
export {};
