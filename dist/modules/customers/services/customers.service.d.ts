import { Repository } from 'typeorm';
import type { PartyType } from '../../../shared/domain';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customers.dto';
import { PartyOrmEntity } from '../entities';
export declare class CustomersService {
    private readonly partyRepository;
    constructor(partyRepository: Repository<PartyOrmEntity>);
    list(query: ListQueryDto): Promise<{
        data: PartyType[];
        total: number;
    }>;
    createCustomer(payload: CreateCustomerDto): Promise<PartyType>;
    updateCustomer(id: string, payload: UpdateCustomerDto): Promise<PartyType>;
    archive(id: string): Promise<void>;
    private resolveSortColumn;
}
