import type { AuditLogRepository, CreateAuditLogEntry } from '../repositories/audit-log.repository';
export declare class AuditLogService {
    private readonly repository;
    private readonly logger;
    constructor(repository: AuditLogRepository);
    record(entry: CreateAuditLogEntry): Promise<void>;
}
