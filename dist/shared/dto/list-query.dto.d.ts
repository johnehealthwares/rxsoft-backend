export declare class ListQueryDto {
    page: number;
    limit: number;
    search?: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    filter?: string;
    organizationId?: string;
    get offset(): number;
}
