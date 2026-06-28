import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListPharmaceuticsDto extends ListQueryDto {
}
export declare class CreatePharmaceuticsDto {
    code: string;
    commonBrandName?: string;
    commonGenericName?: string;
    clinicalName?: string;
    drugClass?: string;
    chemicalConstituents?: string;
    pharmaceutics?: string;
    indications?: string;
    contraindications?: string;
    mechanism?: string;
    missedDose?: string;
    drugInteractions?: string;
    dosage?: string;
    drugComponentIds?: string[];
    overrideCodeValidation?: boolean;
}
export declare class UpdatePharmaceuticsDto extends CreatePharmaceuticsDto {
}
