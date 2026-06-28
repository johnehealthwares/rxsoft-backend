import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListWarehousesDto extends ListQueryDto {
}
export declare class CreateWarehouseDto {
    code: string;
    name: string;
    address?: string | null;
    isActive?: boolean;
    overrideCodeValidation?: boolean;
}
export declare class UpdateWarehouseDto {
    code?: string;
    name?: string;
    address?: string | null;
    isActive?: boolean;
}
