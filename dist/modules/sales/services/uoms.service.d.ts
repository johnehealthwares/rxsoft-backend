import { Repository } from 'typeorm';
import type { UomType } from '../../../shared/domain';
import { CreateUomDto } from '../dto/create-uom.dto';
import { ListUomsDto } from '../dto/list-uoms.dto';
import { UpdateUomDto } from '../dto/update-uom.dto';
import { UomOrmEntity } from '../entities/uom.orm-entity';
export declare class UomsService {
    private readonly uomRepository?;
    private readonly inMemory;
    constructor(uomRepository?: Repository<UomOrmEntity> | undefined);
    list(query: ListUomsDto, organizationId: string): Promise<{
        data: UomType[];
        total: number;
    }>;
    getById(id: string, organizationId: string): Promise<UomType>;
    create(payload: CreateUomDto, organizationId: string): Promise<UomType>;
    update(id: string, payload: UpdateUomDto, organizationId: string): Promise<UomType>;
    private validateReferenceUnit;
}
