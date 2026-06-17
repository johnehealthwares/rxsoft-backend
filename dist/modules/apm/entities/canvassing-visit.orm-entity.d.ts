import { CanvassingSessionOrmEntity } from './canvassing-session.orm-entity';
export declare class CanvassingVisitOrmEntity {
    id: string;
    sessionId: string;
    session: CanvassingSessionOrmEntity;
    name: string;
    phone: string | null;
    address: string | null;
    supportLevel: string | null;
    issues: string | null;
    outcome: string | null;
    contactedAt: Date | null;
    createdAt: Date;
}
