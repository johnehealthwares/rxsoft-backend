"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const audit_di_tokens_1 = require("./audit.di-tokens");
const audit_log_orm_entity_1 = require("./entities/audit-log.orm-entity");
const in_memory_audit_log_repository_1 = require("./repositories/in-memory-audit-log.repository");
const typeorm_audit_log_repository_1 = require("./repositories/typeorm-audit-log.repository");
const audit_log_service_1 = require("./services/audit-log.service");
const auditConfigService = new config_1.ConfigService();
const useInMemoryRepos = auditConfigService.get('USE_IN_MEMORY_REPOS', 'false') === 'true';
const auditPersistenceImports = useInMemoryRepos ? [] : [typeorm_1.TypeOrmModule.forFeature([audit_log_orm_entity_1.AuditLogOrmEntity])];
const auditRepositoryProviders = useInMemoryRepos
    ? [
        in_memory_audit_log_repository_1.InMemoryAuditLogRepository,
        {
            provide: audit_di_tokens_1.AUDIT_LOG_REPOSITORY,
            useExisting: in_memory_audit_log_repository_1.InMemoryAuditLogRepository,
        },
    ]
    : [
        typeorm_audit_log_repository_1.TypeormAuditLogRepository,
        {
            provide: audit_di_tokens_1.AUDIT_LOG_REPOSITORY,
            useExisting: typeorm_audit_log_repository_1.TypeormAuditLogRepository,
        },
    ];
let AuditModule = class AuditModule {
};
exports.AuditModule = AuditModule;
exports.AuditModule = AuditModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [...auditPersistenceImports],
        providers: [audit_log_service_1.AuditLogService, ...auditRepositoryProviders],
        exports: [audit_log_service_1.AuditLogService],
    })
], AuditModule);
//# sourceMappingURL=audit.module.js.map