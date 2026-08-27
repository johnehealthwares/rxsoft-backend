import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  AuditLogListQuery,
  AuditLogRecord,
  AuditLogRepository,
  CreateAuditLogEntry,
} from './audit-log.repository';

@Injectable()
export class InMemoryAuditLogRepository implements AuditLogRepository {
  private readonly entries: AuditLogRecord[] = [];

  async create(entry: CreateAuditLogEntry): Promise<void> {
    this.entries.push({ ...entry, id: randomUUID(), createdAt: new Date() });
    if (this.entries.length > 10_000) {
      this.entries.shift();
    }
  }

  async list(query: AuditLogListQuery): Promise<{ items: AuditLogRecord[]; total: number }> {
    let items = query.organizationId
      ? this.entries.filter((entry) => entry.organizationId === query.organizationId)
      : [...this.entries];

    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter(
        (entry) =>
          entry.action.toLowerCase().includes(q) ||
          (entry.actorUsername ?? '').toLowerCase().includes(q) ||
          entry.httpMethod.toLowerCase().includes(q) ||
          entry.httpPath.toLowerCase().includes(q),
      );
    }

    items = items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const total = items.length;
    return {
      items: items.slice(query.offset, query.offset + query.limit),
      total,
    };
  }
}