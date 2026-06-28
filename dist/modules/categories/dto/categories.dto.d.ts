export declare class CreateCategoryDto {
    code: string;
    name: string;
    parentId?: string;
    overrideCodeValidation?: boolean;
}
export declare class UpdateCategoryDto {
    code?: string;
    name?: string;
    parentId?: string;
}
