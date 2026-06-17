export declare class CreateSaleRefundLineDto {
    saleLineId: string;
    quantity: number;
}
export declare class CreateSaleRefundDto {
    reason?: string;
    lines: CreateSaleRefundLineDto[];
}
