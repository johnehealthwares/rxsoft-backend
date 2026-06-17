export declare class ListUomsDto {
    page: number;
    limit: number;
    search?: string;
    uomType?: 'reference' | 'bigger' | 'smaller';
    isActive?: boolean;
    sortBy: 'name' | 'code' | 'createdAt';
    sortOrder: 'asc' | 'desc';
    get offset(): number;
}
