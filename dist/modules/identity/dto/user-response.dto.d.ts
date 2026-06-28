import { Role } from '../domains/role.entity';
declare class PosConfigResponse {
    stockLocationId?: string | null;
    stockLocation?: {
        id: string;
        name: string;
    } | null;
    storeId?: string | null;
    allowPos?: boolean;
    allowA4Print?: boolean;
    loginTimeoutMinutes?: number | null;
    defaultCustomerId?: string | null;
    defaultCustomer?: {
        id: string;
        name: string;
    } | null;
    defaultPriceListId?: string | null;
    defaultPriceList?: {
        id: string;
        name: string;
    } | null;
    autoSelectLocation?: boolean;
    autoSelectCustomer?: boolean;
    autoSelectPriceList?: boolean;
}
export declare class UserResponseDto {
    id: string;
    username: string;
    phone?: string;
    roles: Role[];
    posConfig?: PosConfigResponse;
}
export {};
