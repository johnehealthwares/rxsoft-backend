import { CanvassingVisitOrmEntity } from './canvassing-visit.orm-entity';
export declare class CanvassingSessionOrmEntity {
    id: string;
    title: string;
    lgaId: string;
    wardId: string | null;
    teamLead: string | null;
    teamSize: number;
    status: string;
    scheduledDate: Date | null;
    completedDate: Date | null;
    notes: string | null;
    visits: CanvassingVisitOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
