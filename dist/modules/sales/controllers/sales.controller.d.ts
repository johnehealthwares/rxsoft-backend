import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { CreateSaleRefundDto } from '../dto/create-sale-refund.dto';
import { CreateSaleResponseDto } from '../dto/create-sale-response.dto';
import { CreateSaleRefundResponseDto } from '../dto/create-sale-refund-response.dto';
import { ListSalesDto } from '../dto/list-sales.dto';
import { SaleResponseDto } from '../dto/sale-response.dto';
import { SaleDetailResponseDto } from '../dto/sale-detail-response.dto';
import { CreateSaleRefundUseCase } from '../services/create-sale-refund.use-case';
import { CreateSaleUseCase } from '../services/create-sale.use-case';
import { ListSalesUseCase } from '../services/list-sales.use-case';
import type { SalesRepository } from '../repositories/sales.repository';
import { SaleOrmEntity } from '../entities/sale.orm-entity';
import { Repository } from 'typeorm';
type SalesListResponse = {
    data: SaleResponseDto[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class SalesController {
    private readonly listSalesUseCase;
    private readonly createSaleUseCase;
    private readonly createSaleRefundUseCase;
    private readonly salesRepository;
    private readonly saleOrmRepository;
    constructor(listSalesUseCase: ListSalesUseCase, createSaleUseCase: CreateSaleUseCase, createSaleRefundUseCase: CreateSaleRefundUseCase, salesRepository: SalesRepository, saleOrmRepository: Repository<SaleOrmEntity>);
    getSale(saleId: string, currentUser: RequestUser): Promise<SaleDetailResponseDto>;
    listSales(query: ListSalesDto, currentUser: RequestUser): Promise<SalesListResponse>;
    metrics(query: ListSalesDto, currentUser: RequestUser): Promise<import("../repositories/sales.repository").SalesMetrics>;
    createSale(payload: CreateSaleDto, currentUser: RequestUser): Promise<CreateSaleResponseDto>;
    createRefund(saleId: string, payload: CreateSaleRefundDto, currentUser: RequestUser): Promise<CreateSaleRefundResponseDto>;
}
export {};
