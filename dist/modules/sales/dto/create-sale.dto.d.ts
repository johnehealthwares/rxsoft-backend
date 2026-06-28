declare class CreateSaleLineDto {
    itemId: string;
    uomId: string;
    lotId?: string | null;
    quantity: number;
    unitPrice: number;
}
declare class CreateSalePaymentDto {
    paymentMethodId: string;
    amount: number;
    paymentReference?: string | null;
}
export declare class CreateSaleDto {
    saleNumber: string;
    saleChannel: 'pos' | 'invoice' | 'mobile';
    storeId: string;
    customerId?: string | null;
    stockLocationId?: string | null;
    lines: CreateSaleLineDto[];
    payments: CreateSalePaymentDto[];
    hold?: boolean;
    overrideCodeValidation?: boolean;
}
export type CreateSaleLineInput = CreateSaleLineDto;
export type CreateSalePaymentInput = CreateSalePaymentDto;
export {};
