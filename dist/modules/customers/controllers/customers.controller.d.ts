import type { PartyType } from '../../../shared/domain';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customers.dto';
import { CustomersService } from '../services/customers.service';
type CustomerListResponse = {
    data: PartyType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    list(query: ListQueryDto): Promise<CustomerListResponse>;
    export(query: ListQueryDto): Promise<string>;
    create(payload: CreateCustomerDto): Promise<PartyType>;
    replace(customerId: string, payload: UpdateCustomerDto): Promise<PartyType>;
    patch(customerId: string, payload: UpdateCustomerDto): Promise<PartyType>;
    remove(customerId: string): Promise<{
        ok: true;
    }>;
}
export {};
