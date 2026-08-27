import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogOrmEntity } from '../entities/audit-log.orm-entity';
import { AuditLogListQuery, AuditLogRecord, AuditLogRepository, CreateAuditLogEntry } from './audit-log.repository';

@Injectable()
export class TypeormAuditLogRepository implements AuditLogRepository {
  constructor(
    @InjectRepository(AuditLogOrmEntity)
    private readonly repository: Repository<AuditLogOrmEntity>,
  ) {}

  async create(entry: CreateAuditLogEntry): Promise<void> {
    const entity = this.repository.create(entry);
    await this.repository.save(entity);
  }

  async list(query: AuditLogListQuery): Promise<{ items: AuditLogRecord[]; total: number }> {
    const qb = this.repository.createQueryBuilder('auditLog');

    if (query.organizationId) {
      qb.andWhere('auditLog.organization_id = :organizationId', { organizationId: query.organizationId });
    }

    if (query.search) {
      qb.andWhere(
        `(auditLog.action ILIKE :search
          OR auditLog.actor_username ILIKE :search
          OR auditLog.http_method ILIKE :search
          OR auditLog.http_path ILIKE :search)`,
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy('auditLog.createdAt', 'DESC').skip(query.offset).take(query.limit);

    const [rows, total] = await qb.getManyAndCount();

    return {
      items: rows.map((row) => ({
        id: row.id,
        organizationId: row.organizationId,
        actorUserId: row.actorUserId,
        actorUsername: row.actorUsername,
        action: row.action,
        httpMethod: row.httpMethod,
        httpPath: row.httpPath,
        statusCode: row.statusCode,
        durationMs: row.durationMs,
        ipAddress: row.ipAddress,
        userAgent: row.userAgent,
        metadata: row.metadata,
        createdAt: row.createdAt,
      })),
      total,
    };
  }
}