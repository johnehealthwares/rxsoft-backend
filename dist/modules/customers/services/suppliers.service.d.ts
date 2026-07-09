import { Repository } from 'typeorm';
import { PartyOrmEntity } from '../entities/party.orm-entity';
import { PartyType } from "../../../shared/domain";
import { ListQueryDto } from "../../../shared/dto/list-query.dto";
export declare class SuppliersService {
    private readonly partyRepository;
    constructor(partyRepository: Repository<PartyOrmEntity>);
    list(query: ListQueryDto): Promise<{
        data: PartyType[];
        total: number;
    }>;
    create(payload: {
        name: string;
        phone?: string;
        email?: string;
        address?: string;
    }): Promise<{
        id: string;
        name: string;
        phone: string | null;
        email: string | null;
    }>;
    private resolveSortColumn;
}
