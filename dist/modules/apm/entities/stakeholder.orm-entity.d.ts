import { LgaOrmEntity } from './lga.orm-entity';
import { WardOrmEntity } from './ward.orm-entity';
import { ConversionActivityOrmEntity } from './conversion-activity.orm-entity';
export declare class StakeholderOrmEntity {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    role: string | null;
    lgaId: string;
    lga: LgaOrmEntity;
    wardId: string | null;
    ward: WardOrmEntity | null;
    affiliation: string | null;
    influenceLevel: string;
    conversionStatus: string;
    notes: string | null;
    isActive: boolean;
    activities: ConversionActivityOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
