export type OdooUom = {
    id: string;
    name: string;
    categoryId: string | null;
    factor: number;
    rounding: number;
    active: boolean;
    uomType: 'reference' | 'bigger' | 'smaller';
};
export type OdooCategory = {
    id: string;
    name: string;
    parentId: string | null;
};
export type OdooProductTemplate = {
    id: string;
    name: string;
    categoryId: string | null;
    listPrice: number;
    uomId: string | null;
    purchaseUomId: string | null;
    active: boolean;
    defaultCode: string | null;
    tracking: string | null;
    productType: string | null;
    genericDrugCode: string;
};
export type OdooProductVariant = {
    id: string;
    templateId: string;
    defaultCode: string | null;
    barcode: string | null;
    active: boolean;
};
export type OdooPartner = {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    mobile: string | null;
    street: string | null;
    city: string | null;
    customer: boolean;
    active: boolean;
    isCompany: boolean;
};
export type ParsedBackup = {
    uoms: OdooUom[];
    categories: OdooCategory[];
    templates: OdooProductTemplate[];
    partners: OdooPartner[];
};
export declare function getSeedData(): ParsedBackup;
