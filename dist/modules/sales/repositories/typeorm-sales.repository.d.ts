import { DataSource, Repository } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { UomConverterService } from '../services/uom-converter.service';
import { Sale } from '../domains/sale.entity';
import { SaleOrmEntity, UomOrmEntity } from '../entities';
import { CreateSaleRefundRepositoryPayload, CreateSaleRefundResult, CreateSaleRepositoryPayload, CreateSaleResult, SalesListQuery, SalesRepository } from './sales.repository';
export declare class TypeormSalesRepository implements SalesRepository {
    private readonly saleRepository;
    private readonly itemRepository;
    private readonly uomRepository;
    private readonly dataSource;
    private readonly uomConverter;
    constructor(saleRepository: Repository<SaleOrmEntity>, itemRepository: Repository<ItemOrmEntity>, uomRepository: Repository<UomOrmEntity>, dataSource: DataSource, uomConverter: UomConverterService);
    list(query: SalesListQuery): Promise<{
        items: Sale[];
        total: number;
    }>;
    createWithSettlement(payload: CreateSaleRepositoryPayload): Promise<CreateSaleResult>;
    createRefund(payload: CreateSaleRefundRepositoryPayload): Promise<CreateSaleRefundResult>;
}
