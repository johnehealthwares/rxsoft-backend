import { Sale } from '../domains/sale.entity';
import { CreateSaleRefundRepositoryPayload, CreateSaleRefundResult, CreateSaleRepositoryPayload, CreateSaleResult, SalesListQuery, SalesRepository } from './sales.repository';
export declare class InMemorySalesRepository implements SalesRepository {
    private readonly sales;
    private readonly receivables;
    list(query: SalesListQuery): Promise<{
        items: Sale[];
        total: number;
    }>;
    createWithSettlement(payload: CreateSaleRepositoryPayload): Promise<CreateSaleResult>;
    createRefund(payload: CreateSaleRefundRepositoryPayload): Promise<CreateSaleRefundResult>;
}
