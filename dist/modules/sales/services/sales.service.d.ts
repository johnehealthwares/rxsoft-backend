import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { SalesRepository } from '../repositories/sales.repository';
export declare class SalesService {
    private readonly salesRepository;
    constructor(salesRepository: SalesRepository);
    list(query: ListQueryDto): Promise<{
        data: Array<Record<string, unknown>>;
        total: number;
    }>;
    listAll(): Promise<Array<{
        saleDate: Date;
        totalAmount: number;
    }>>;
}
