import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { AuditLogOrmEntity } from '../entities';
import { AuditLog } from '../domains/audit.types';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLogOrmEntity)
    private readonly auditLogRepository: Repository<AuditLogOrmEntity>,
  ) {}

  async log(entry: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void> {
    const row = this.auditLogRepository.create({
      organizationId: DEFAULT_ORGANIZATION_ID,
      actorUserId: entry.userId,
      action: entry.action,
      resource: entry.entity,
      resourceId: entry.entityId,
      details: entry.metadata,
      occurredAt: new Date(),
    });

    await this.auditLogRepository.save(row);
  }

  async list(query: ListQueryDto): Promise<{ data: AuditLog[]; total: number }> {
    const qb = this.auditLogRepository
      .createQueryBuilder('audit')
      .where('audit.organization_id = :organizationId', { organizationId: DEFAULT_ORGANIZATION_ID });

    if (query.search) {
      qb.andWhere('(audit.action LIKE :search OR audit.resource LIKE :search)', { search: `%${query.search}%` });
    }

    qb.orderBy('audit.occurred_at', 'DESC').skip(query.offset).take(query.limit);

    const [rows, total] = await qb.getManyAndCount();

    return {
      data: rows.map((row) => ({
        id: row.id,
        userId: row.actorUserId,
        username: null,
        action: row.action,
        entity: row.resource,
        entityId: row.resourceId,
        metadata: row.details,
        createdAt: row.occurredAt,
      })),
      total,
    };
  }
}
