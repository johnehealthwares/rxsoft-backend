export declare class AccountReceivable {
    readonly id: string;
    readonly organizationId: string;
    readonly customerId: string;
    readonly customerName: string | null;
    readonly saleId: string;
    readonly receivableNumber: string;
    readonly originalAmount: number;
    outstandingAmount: number;
    status: 'open' | 'partially_paid' | 'closed' | 'written_off';
    readonly openedAt: Date;
    closedAt: Date | null;
    constructor(id: string, organizationId: string, customerId: string, customerName: string | null, saleId: string, receivableNumber: string, originalAmount: number, outstandingAmount: number, status: 'open' | 'partially_paid' | 'closed' | 'written_off', openedAt: Date, closedAt: Date | null);
}
