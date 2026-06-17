export declare class WhatsAppGroupOrmEntity {
    id: string;
    level: string;
    name: string;
    parentId: string | null;
    parent: WhatsAppGroupOrmEntity | null;
    description: string | null;
    groupLink: string | null;
    adminName: string | null;
    adminPhone: string | null;
    memberCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
