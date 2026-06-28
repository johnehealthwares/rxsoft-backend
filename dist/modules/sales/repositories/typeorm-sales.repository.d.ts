import { DataSource, Repository } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { UomConverterService } from '../services/uom-converter.service';
import { Sale } from '../domains/sale.entity';
import { SaleOrmEntity, UomOrmEntity } from '../entities';
import { CreateSaleRefundRepositoryPayload, CreateSaleRefundResult, CreateSaleRepositoryPayload, CreateSaleResult, SalesListQuery, SalesMetrics, SalesMetricsQuery, SalesRepository } from './sales.repository';
export declare class TypeormSalesRepository implements SalesRepository {
    private readonly saleRepository;
    private readonly itemRepository;
    private readonly uomRepository;
    private readonly dataSource;
    private readonly uomConverter;
    findLastCreated(organizationId: string): Promise<Pick<Sale, 'saleNumber'> | null>;
    constructor(saleRepository: Repository<SaleOrmEntity>, itemRepository: Repository<ItemOrmEntity>, uomRepository: Repository<UomOrmEntity>, dataSource: DataSource, uomConverter: UomConverterService);
    list(query: SalesListQuery): Promise<{
        items: Sale[];
        total: number;
    }>;
    getMetrics(query: SalesMetricsQuery): Promise<SalesMetrics>;
    createWithSettlement(payload: CreateSaleRepositoryPayload): Promise<CreateSaleResult>;
    createRefund(payload: CreateSaleRefundRepositoryPayload): Promise<CreateSaleRefundResult>;
}
