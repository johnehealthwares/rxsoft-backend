export declare class OrganisationConfigType {
    id: string;
    organizationId: string;
    posHeader: string | null;
    defaultLoginTimeoutMinutes: number;
    defaultAllowPos: boolean;
    defaultAllowA4Print: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare class UpdateOrganisationConfigDto {
    posHeader?: string | null;
    defaultLoginTimeoutMinutes?: number;
    defaultAllowPos?: boolean;
    defaultAllowA4Print?: boolean;
}
