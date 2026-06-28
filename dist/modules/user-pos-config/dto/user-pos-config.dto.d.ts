export declare class UserPosConfigType {
    id: string;
    userId: string;
    organizationId: string;
    stockLocationId: string | null;
    stockLocation: {
        id: string;
        name: string;
    } | null;
    storeId: string | null;
    allowA4Print: boolean;
    allowPos: boolean;
    loginTimeoutMinutes: number | null;
    defaultCustomerId: string | null;
    defaultCustomer: {
        id: string;
        name: string;
    } | null;
    defaultPriceListId: string | null;
    defaultPriceList: {
        id: string;
        name: string;
    } | null;
    autoSelectLocation: boolean;
    autoSelectCustomer: boolean;
    autoSelectPriceList: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class UpdateUserPosConfigDto {
    stockLocationId?: string | null;
    storeId?: string | null;
    allowA4Print?: boolean;
    allowPos?: boolean;
    loginTimeoutMinutes?: number | null;
    defaultCustomerId?: string | null;
    defaultPriceListId?: string | null;
    autoSelectLocation?: boolean;
    autoSelectCustomer?: boolean;
    autoSelectPriceList?: boolean;
}
