import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogOrmEntity } from '../entities/audit-log.orm-entity';
import { AuditLogRepository, CreateAuditLogEntry } from './audit-log.repository';

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
}

