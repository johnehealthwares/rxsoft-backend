import type { PrescriptionOrmEntity } from './prescription.orm-entity';
export declare class PrescriptionFileOrmEntity {
    id: string;
    prescription: PrescriptionOrmEntity;
    fileUrl: string;
    mime: string;
    originalName: string;
    size: number | null;
    createdAt: Date;
}
