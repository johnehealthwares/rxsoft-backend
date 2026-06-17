export declare class ListItemsDto {
    page: number;
    limit: number;
    search?: string;
    name?: string;
    categoryCode?: string;
    includeAll?: boolean;
    sortBy: 'name' | 'code' | 'createdAt';
    sortOrder: 'asc' | 'desc';
    get offset(): number;
}
