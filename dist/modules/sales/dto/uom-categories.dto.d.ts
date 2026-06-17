export declare class CreateUomCategoryDto {
    code?: string;
    name: string;
}
declare const UpdateUomCategoryDto_base: import("@nestjs/common").Type<Partial<CreateUomCategoryDto>>;
export declare class UpdateUomCategoryDto extends UpdateUomCategoryDto_base {
}
export declare class ListUomCategoriesDto {
    page: number;
    limit: number;
    search?: string;
    get offset(): number;
}
export {};
