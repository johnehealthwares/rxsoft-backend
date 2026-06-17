import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListGenericProductsDto extends ListQueryDto {
}
export declare class CreateGenericProductDto {
    code: string;
    name: string;
    pharmaceuticsId: string;
    therapeuticClass?: string;
    dosageForm?: string;
    strength?: string;
    generalUse?: string;
    adultDosage?: string;
    pediatricDosage?: string;
    isPrescriptionRequired?: boolean;
    isControlledSubstance?: boolean;
}
export declare class UpdateGenericProductDto {
    code?: string;
    name?: string;
    pharmaceuticsId?: string;
    therapeuticClass?: string;
    dosageForm?: string;
    strength?: string;
    generalUse?: string;
    adultDosage?: string;
    pediatricDosage?: string;
    isPrescriptionRequired?: boolean;
    isControlledSubstance?: boolean;
}
