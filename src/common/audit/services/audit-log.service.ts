import { Inject, Injectable, Logger } from '@nestjs/common';
import { AUDIT_LOG_REPOSITORY } from '../audit.di-tokens';
import type { AuditLogRepository, CreateAuditLogEntry } from '../repositories/audit-log.repository';

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
}
