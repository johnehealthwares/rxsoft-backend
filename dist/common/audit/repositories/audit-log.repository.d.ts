export type CreateAuditLogEntry = {
    organizationId: string | null;
    actorUserId: string | null;
    actorUsername: string | null;
    action: string;
    httpMethod: string;
    httpPath: string;
    statusCode: number;
    durationMs: number;
    ipAddress: string | null;
    userAgent: string | null;
    metadata: Record<string, unknown> | null;
};
export interface AuditLogRepository {
    create(entry: CreateAuditLogEntry): Promise<void>;
}
