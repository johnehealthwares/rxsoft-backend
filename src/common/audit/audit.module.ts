import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AUDIT_LOG_REPOSITORY } from './audit.di-tokens';
import { AuditLogOrmEntity } from './entities/audit-log.orm-entity';
import { InMemoryAuditLogRepository } from './repositories/in-memory-audit-log.repository';
import { TypeormAuditLogRepository } from './repositories/typeorm-audit-log.repository';
import { AuditLogService } from './services/audit-log.service';

const auditConfigService = new ConfigService();
const useInMemoryRepos = auditConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const auditPersistenceImports = useInMemoryRepos ? [] : [TypeOrmModule.forFeature([AuditLogOrmEntity])];
const auditRepositoryProviders = useInMemoryRepos
  ? [
      InMemoryAuditLogRepository,
      {
        provide: AUDIT_LOG_REPOSITORY,
        useExisting: InMemoryAuditLogRepository,
      },
    ]
  : [
      TypeormAuditLogRepository,
      {
        provide: AUDIT_LOG_REPOSITORY,
        useExisting: TypeormAuditLogRepository,
      },
    ];

@Global()
@Module({
  imports: [...auditPersistenceImports],
  providers: [AuditLogService, ...auditRepositoryProviders],
  exports: [AuditLogService],
})
export class AuditModule {}
