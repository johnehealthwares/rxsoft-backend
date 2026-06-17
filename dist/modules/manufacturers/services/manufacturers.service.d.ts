import { Repository } from 'typeorm';
import type { ManufacturerType } from '../../../shared/domain';
import { CreateManufacturerDto, ListManufacturersDto, UpdateManufacturerDto } from '../dto/manufacturers.dto';
import { ManufacturerOrmEntity } from '../entities/manufacturer.orm-entity';
export declare class ManufacturersService {
    private readonly manufacturerRepository;
    constructor(manufacturerRepository: Repository<ManufacturerOrmEntity>);
    list(query: ListManufacturersDto, organizationId?: string): Promise<{
        data: ManufacturerType[];
        total: number;
    }>;
    getLastCreated(organizationId?: string): Promise<{
        id: string;
        code: string;
        createdAt: string;
    } | null>;
    get(id: string, organizationId?: string): Promise<ManufacturerType>;
    create(payload: CreateManufacturerDto, organizationId?: string): Promise<ManufacturerType>;
    update(id: string, payload: UpdateManufacturerDto, organizationId?: string): Promise<ManufacturerType>;
    remove(id: string, organizationId?: string): Promise<void>;
}
