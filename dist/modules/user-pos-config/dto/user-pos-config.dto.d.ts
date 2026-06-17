export declare class UserPosConfigType {
    id: string;
    userId: string;
    organizationId: string;
    stockLocationId: string | null;
    storeId: string | null;
    allowA4Print: boolean;
    allowPos: boolean;
    loginTimeoutMinutes: number | null;
    createdAt: string;
    updatedAt: string;
}
export declare class UpdateUserPosConfigDto {
    stockLocationId?: string | null;
    storeId?: string | null;
    allowA4Print?: boolean;
    allowPos?: boolean;
    loginTimeoutMinutes?: number | null;
}
