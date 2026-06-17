export declare class AuditLogOrmEntity {
    id: string;
    organizationId: string;
    actorUserId: string | null;
    action: string;
    resource: string;
    resourceId: string | null;
    details: Record<string, unknown> | null;
    occurredAt: Date;
}
