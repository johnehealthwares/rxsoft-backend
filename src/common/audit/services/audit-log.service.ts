import { Inject, Injectable, Logger } from '@nestjs/common';
import { AUDIT_LOG_REPOSITORY } from '../audit.di-tokens';
import type { AuditLogRepository, CreateAuditLogEntry } from '../repositories/audit-log.repository';

export type AuditLogListItem = {
  id: string;
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
  createdAt: Date;
};

@Injectable()
export class AuditLogService {
  private readonly logger = new Logger(AuditLogService.name);

  constructor(
    @Inject(AUDIT_LOG_REPOSITORY)
    private readonly repository: AuditLogRepository,
  ) {}

  async record(entry: CreateAuditLogEntry): Promise<void> {
    try {
      await this.repository.create(entry);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown audit logging error';
      this.logger.warn(`Failed to persist audit log: ${message}`);
    }
  }

  async list(
    organizationId: string,
    query: { search?: string; offset: number; limit: number },
  ): Promise<{ items: AuditLogListItem[]; total: number }> {
    const result = await this.repository.list({
      organizationId,
      search: query.search,
      offset: query.offset,
      limit: query.limit,
    });

    return {
      items: result.items.map((item): AuditLogListItem => ({
        id: item.id,
        organizationId: item.organizationId,
        actorUserId: item.actorUserId,
        actorUsername: item.actorUsername,
        action: item.action,
        httpMethod: item.httpMethod,
        httpPath: item.httpPath,
        statusCode: item.statusCode,
        durationMs: item.durationMs,
        ipAddress: item.ipAddress,
        userAgent: item.userAgent,
        metadata: item.metadata,
        createdAt: item.createdAt,
      })),
      total: result.total,
    };
  }
}