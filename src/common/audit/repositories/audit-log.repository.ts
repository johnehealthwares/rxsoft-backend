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

export type AuditLogRecord = CreateAuditLogEntry & {
  id: string;
  createdAt: Date;
};

export type AuditLogListQuery = {
  organizationId: string;
  search?: string;
  offset: number;
  limit: number;
};

export interface AuditLogRepository {
  create(entry: CreateAuditLogEntry): Promise<void>;
  list(query: AuditLogListQuery): Promise<{ items: AuditLogRecord[]; total: number }>;
}