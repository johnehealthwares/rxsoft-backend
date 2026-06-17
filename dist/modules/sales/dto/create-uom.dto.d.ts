export declare class CreateUomDto {
    code?: string;
    name: string;
    categoryId?: string;
    uomType?: 'reference' | 'bigger' | 'smaller';
    factor?: number;
    rounding?: number;
    isActive?: boolean;
}
