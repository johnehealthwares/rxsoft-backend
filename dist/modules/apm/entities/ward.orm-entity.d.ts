import { LgaOrmEntity } from './lga.orm-entity';
import { PollingUnitOrmEntity } from './polling-unit.orm-entity';
export declare class WardOrmEntity {
    id: string;
    name: string;
    code: string;
    lgaId: string;
    lga: LgaOrmEntity;
    description: string | null;
    displayOrder: number;
    isActive: boolean;
    pollingUnits: PollingUnitOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
