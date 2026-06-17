export declare class IssueReportOrmEntity {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    lga: string | null;
    ward: string | null;
    category: string | null;
    description: string;
    status: string | null;
    createdAt: Date;
    updatedAt: Date;
}
