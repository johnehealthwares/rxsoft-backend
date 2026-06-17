"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuditLogService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogService = void 0;
const common_1 = require("@nestjs/common");
const audit_di_tokens_1 = require("../audit.di-tokens");
let AuditLogService = AuditLogService_1 = class AuditLogService {
    repository;
    logger = new common_1.Logger(AuditLogService_1.name);
    constructor(repository) {
        this.repository = repository;
    }
    async record(entry) {
        try {
            await this.repository.create(entry);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'unknown audit logging error';
            this.logger.warn(`Failed to persist audit log: ${message}`);
        }
    }
};
exports.AuditLogService = AuditLogService;
exports.AuditLogService = AuditLogService = AuditLogService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(audit_di_tokens_1.AUDIT_LOG_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], AuditLogService);
//# sourceMappingURL=audit-log.service.js.map