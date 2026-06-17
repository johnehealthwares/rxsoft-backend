declare class PosConfigResponse {
    stockLocationId?: string | null;
    storeId?: string | null;
    allowPos?: boolean;
    allowA4Print?: boolean;
    loginTimeoutMinutes?: number | null;
}
export declare class UserResponseDto {
    id: string;
    username: string;
    phone?: string;
    roles: string[];
    posConfig?: PosConfigResponse;
}
export {};
