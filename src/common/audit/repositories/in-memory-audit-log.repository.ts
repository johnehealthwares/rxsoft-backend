import { Injectable } from '@nestjs/common';
import { AuditLogRepository, CreateAuditLogEntry } from './audit-log.repository';

@Injectable()
export class InMemoryAuditLogRepository implements AuditLogRepository {
  private readonly entries: CreateAuditLogEntry[] = [];

  async create(entry: CreateAuditLogEntry): Promise<void> {
    this.entries.push(entry);
    if (this.entries.length > 10_000) {
      this.entries.shift();
    }
  }
}

