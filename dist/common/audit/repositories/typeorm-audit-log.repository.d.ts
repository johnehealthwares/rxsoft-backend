import { Repository } from 'typeorm';
import { AuditLogOrmEntity } from '../entities/audit-log.orm-entity';
import { AuditLogRepository, CreateAuditLogEntry } from './audit-log.repository';
export declare class TypeormAuditLogRepository implements AuditLogRepository {
    private readonly repository;
    constructor(repository: Repository<AuditLogOrmEntity>);
    create(entry: CreateAuditLogEntry): Promise<void>;
}
