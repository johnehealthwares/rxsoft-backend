import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListPaymentMethodsDto extends ListQueryDto {
}
export declare class CreatePaymentMethodDto {
    code: string;
    name: string;
    methodType: 'cash' | 'card' | 'transfer' | 'wallet' | 'insurance';
    isActive?: boolean;
    overrideCodeValidation?: boolean;
}
export declare class UpdatePaymentMethodDto {
    code?: string;
    name?: string;
    methodType?: 'cash' | 'card' | 'transfer' | 'wallet' | 'insurance';
    isActive?: boolean;
}
