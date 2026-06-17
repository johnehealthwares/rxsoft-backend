import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { ApplyReceivableAdjustmentDto } from '../dto/apply-receivable-adjustment.dto';
import { CollectReceivablePaymentDto } from '../dto/collect-receivable-payment.dto';
import { ListReceivableTransactionsDto } from '../dto/list-receivable-transactions.dto';
import { ListReceivablesDto } from '../dto/list-receivables.dto';
import { ReceivableResponseDto } from '../dto/receivable-response.dto';
import { ReceivableTransactionResponseDto } from '../dto/receivable-transaction-response.dto';
import { WriteOffReceivableDto } from '../dto/write-off-receivable.dto';
import { ApplyReceivableAdjustmentUseCase } from '../services/apply-receivable-adjustment.use-case';
import { CollectReceivablePaymentUseCase } from '../services/collect-receivable-payment.use-case';
import { ListReceivableTransactionsUseCase } from '../services/list-receivable-transactions.use-case';
import { ListReceivablesUseCase } from '../services/list-receivables.use-case';
import { WriteOffReceivableUseCase } from '../services/write-off-receivable.use-case';
type ReceivablesListResponse = {
    data: ReceivableResponseDto[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type ReceivableTransactionsListResponse = {
    data: ReceivableTransactionResponseDto[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
type ReceivableMutationResponse = {
    receivable: ReceivableResponseDto;
    transactionId: string;
};
export declare class ReceivablesController {
    private readonly listReceivablesUseCase;
    private readonly collectReceivablePaymentUseCase;
    private readonly applyReceivableAdjustmentUseCase;
    private readonly writeOffReceivableUseCase;
    private readonly listReceivableTransactionsUseCase;
    constructor(listReceivablesUseCase: ListReceivablesUseCase, collectReceivablePaymentUseCase: CollectReceivablePaymentUseCase, applyReceivableAdjustmentUseCase: ApplyReceivableAdjustmentUseCase, writeOffReceivableUseCase: WriteOffReceivableUseCase, listReceivableTransactionsUseCase: ListReceivableTransactionsUseCase);
    list(query: ListReceivablesDto, currentUser: RequestUser): Promise<ReceivablesListResponse>;
    listTransactions(receivableId: string, query: ListReceivableTransactionsDto, currentUser: RequestUser): Promise<ReceivableTransactionsListResponse>;
    collectPayment(receivableId: string, payload: CollectReceivablePaymentDto, currentUser: RequestUser): Promise<ReceivableMutationResponse>;
    applyAdjustment(receivableId: string, payload: ApplyReceivableAdjustmentDto, currentUser: RequestUser): Promise<ReceivableMutationResponse>;
    writeOff(receivableId: string, payload: WriteOffReceivableDto, currentUser: RequestUser): Promise<ReceivableMutationResponse>;
}
export {};
