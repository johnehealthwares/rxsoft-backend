import { Repository } from 'typeorm';
import { AppCacheService } from '../../../common/cache/cache.service';
import { CreateSaleDto } from '../dto/create-sale.dto';
import type { SalesRepository } from '../repositories/sales.repository';
import { UomOrmEntity } from '../entities';
export declare class CreateSaleUseCase {
    private readonly salesRepository;
    private readonly uomRepository;
    private readonly cacheService?;
    constructor(salesRepository: SalesRepository, uomRepository: Repository<UomOrmEntity>, cacheService?: AppCacheService | undefined);
    execute(payload: CreateSaleDto, organizationId: string, userId: string): Promise<Awaited<ReturnType<SalesRepository['createWithSettlement']>>>;
}
