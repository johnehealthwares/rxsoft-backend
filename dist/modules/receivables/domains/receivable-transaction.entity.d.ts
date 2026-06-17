export declare class ReceivableTransaction {
    readonly id: string;
    readonly receivableId: string;
    readonly transactionType: 'charge' | 'payment' | 'adjustment' | 'write_off';
    readonly amount: number;
    readonly transactionDate: Date;
    readonly paymentMethodId: string | null;
    readonly referenceNumber: string | null;
    readonly receivedByUserId: string | null;
    readonly note: string | null;
    constructor(id: string, receivableId: string, transactionType: 'charge' | 'payment' | 'adjustment' | 'write_off', amount: number, transactionDate: Date, paymentMethodId: string | null, referenceNumber: string | null, receivedByUserId: string | null, note: string | null);
}
