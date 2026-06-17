import { WardOrmEntity } from './ward.orm-entity';
import { LgaOrmEntity } from './lga.orm-entity';
export declare class PollingUnitOrmEntity {
    id: string;
    code: string;
    name: string;
    wardId: string;
    ward: WardOrmEntity;
    lgaId: string;
    lga: LgaOrmEntity;
    registeredVoters: number;
    pastResultApm: number;
    pastResultPdp: number;
    pastResultApc: number;
    pastResultOther: number;
    latitude: string | null;
    longitude: string | null;
    riskLevel: string;
    conversionStatus: string;
    assignedAgentName: string | null;
    assignedAgentPhone: string | null;
    notes: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
