export declare class AgendaItemOrmEntity {
    id: string;
    title: string;
    summary: string | null;
    description: string | null;
    icon: string | null;
    imageUrl: string | null;
    category: string | null;
    displayOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
