export declare class UpdateUomDto {
    code?: string;
    name?: string;
    categoryId?: string | null;
    uomType?: 'reference' | 'bigger' | 'smaller';
    factor?: number;
    rounding?: number;
    isActive?: boolean;
}
