declare class SaleDetailCustomerDto {
    id: string;
    name: string;
    phone?: string;
    email?: string;
}
declare class SaleDetailCategoryDto {
    id?: string;
    name?: string;
}
declare class SaleDetailUomDto {
    id?: string;
    name?: string;
}
declare class SaleDetailItemDto {
    id: string;
    code?: string;
    name: string;
    category?: SaleDetailCategoryDto | null;
    baseUomId?: string;
    saleUomId?: string;
    saleUom?: SaleDetailUomDto | null;
    baseUom?: SaleDetailUomDto | null;
}
declare class SaleDetailLineDto {
    id: string;
    lineNumber: number;
    item: SaleDetailItemDto;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}
declare class SaleDetailPaymentMethodDto {
    id: string;
    code?: string;
    name: string;
    methodType: string;
    isActive: boolean;
}
declare class SaleDetailPaymentDto {
    id: string;
    paymentMethod: SaleDetailPaymentMethodDto;
    amount: number;
}
export declare class SaleDetailResponseDto {
    id: string;
    saleNumber: string;
    saleChannel: string;
    customer?: SaleDetailCustomerDto | null;
    status: string;
    totalAmount: number;
    paidAmount: number;
    lines: SaleDetailLineDto[];
    payments: SaleDetailPaymentDto[];
    saleDate: string;
    notes?: string | null;
}
export {};
