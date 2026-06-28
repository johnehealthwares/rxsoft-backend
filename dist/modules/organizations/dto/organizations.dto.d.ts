import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListOrganizationsDto extends ListQueryDto {
}
export declare class CreateOrganizationDto {
    code: string;
    name: string;
    isActive?: boolean;
    overrideCodeValidation?: boolean;
}
export declare class UpdateOrganizationDto {
    code?: string;
    name?: string;
    isActive?: boolean;
}
