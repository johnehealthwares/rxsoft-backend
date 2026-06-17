import { PrescriptionFileOrmEntity } from './prescription-file.orm-entity';
export type PrescriptionStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Fulfilled';
export declare class PrescriptionOrmEntity {
    id: string;
    userId: string | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    status: PrescriptionStatus;
    pharmacistNotes: string | null;
    adminNotes: string | null;
    files: PrescriptionFileOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
