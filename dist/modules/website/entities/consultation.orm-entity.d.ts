export type ConsultationChannel = 'WhatsApp' | 'Phone' | 'Video Call';
export type ConsultationStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
export declare class ConsultationOrmEntity {
    id: string;
    userId: string | null;
    name: string;
    phone: string;
    email: string | null;
    symptoms: string | null;
    questions: string | null;
    channel: ConsultationChannel;
    status: ConsultationStatus;
    pharmacistNotes: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
