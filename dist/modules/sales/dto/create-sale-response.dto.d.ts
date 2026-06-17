import { SaleResponseDto } from './sale-response.dto';
export declare class CreateSaleResponseDto extends SaleResponseDto {
    receivableCreated: boolean;
    receivableId: string | null;
    outstandingAmount: number;
}
