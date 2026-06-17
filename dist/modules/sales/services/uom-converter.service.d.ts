import { Repository } from 'typeorm';
import { UomOrmEntity } from '../entities/uom.orm-entity';
export declare class UomConverterService {
    private readonly uomRepo;
    constructor(uomRepo: Repository<UomOrmEntity>);
    convert(quantity: number, fromUomId: string, toUomId: string): Promise<number>;
    convertToBaseUom(quantity: number, uomId: string, baseUomId: string): Promise<number>;
    convertFromBaseUom(quantity: number, targetUomId: string, baseUomId: string): Promise<number>;
}
