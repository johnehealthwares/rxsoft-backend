import { AuditLogRepository, CreateAuditLogEntry } from './audit-log.repository';
export declare class InMemoryAuditLogRepository implements AuditLogRepository {
    private readonly entries;
    create(entry: CreateAuditLogEntry): Promise<void>;
}
