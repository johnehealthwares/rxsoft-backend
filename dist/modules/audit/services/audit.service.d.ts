import { Repository } from 'typeorm';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { AuditLogOrmEntity } from '../entities';
import { AuditLog } from '../domains/audit.types';
export declare class AuditService {
    private readonly auditLogRepository;
    constructor(auditLogRepository: Repository<AuditLogOrmEntity>);
    log(entry: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void>;
    list(query: ListQueryDto): Promise<{
        data: AuditLog[];
        total: number;
    }>;
}
