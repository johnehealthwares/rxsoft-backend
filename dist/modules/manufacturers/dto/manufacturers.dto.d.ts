import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListManufacturersDto extends ListQueryDto {
}
export declare class CreateManufacturerDto {
    code?: string;
    name: string;
}
export declare class UpdateManufacturerDto {
    code?: string | null;
    name?: string;
}
