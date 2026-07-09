import { Sale } from '../domains/sale.entity';
import { CreateSaleRefundRepositoryPayload, CreateSaleRefundResult, CreateSaleRepositoryPayload, CreateSaleResult, SalesListQuery, SalesMetrics, SalesMetricsQuery, SalesRepository } from './sales.repository';
export declare class InMemorySalesRepository implements SalesRepository {
    findById(organizationId: string, saleId: string): Promise<Sale | null>;
    findLastCreated(organizationId: string): Promise<Pick<Sale, 'saleNumber'> | null>;
    private readonly sales;
    private readonly receivables;
    list(query: SalesListQuery): Promise<{
        items: Sale[];
        total: number;
    }>;
    createWithSettlement(payload: CreateSaleRepositoryPayload): Promise<CreateSaleResult>;
    getMetrics(query: SalesMetricsQuery): Promise<SalesMetrics>;
    createRefund(payload: CreateSaleRefundRepositoryPayload): Promise<CreateSaleRefundResult>;
}
