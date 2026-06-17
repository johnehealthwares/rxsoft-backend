import { StakeholderOrmEntity } from './stakeholder.orm-entity';
export declare class ConversionActivityOrmEntity {
    id: string;
    stakeholderId: string;
    stakeholder: StakeholderOrmEntity;
    type: string;
    notes: string | null;
    outcome: string | null;
    conductedBy: string | null;
    conductedAt: Date | null;
    followUpDate: Date | null;
    createdAt: Date;
}
