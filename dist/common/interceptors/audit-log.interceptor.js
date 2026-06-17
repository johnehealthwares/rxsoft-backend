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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const audit_log_service_1 = require("../audit/services/audit-log.service");
const audit_action_decorator_1 = require("../decorators/audit-action.decorator");
let AuditLogInterceptor = class AuditLogInterceptor {
    auditLogService;
    reflector;
    constructor(auditLogService, reflector) {
        this.auditLogService = auditLogService;
        this.reflector = reflector;
    }
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const method = request.method.toUpperCase();
        if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
            return next.handle();
        }
        const response = context.switchToHttp().getResponse();
        const startedAt = Date.now();
        const action = this.reflector.get(audit_action_decorator_1.AUDIT_ACTION_METADATA_KEY, context.getHandler()) ??
            `${method} ${request.route?.path ?? request.path ?? request.originalUrl ?? 'unknown'}`;
        const userAgentHeader = request.headers?.['user-agent'];
        const buildEntry = (statusCode, metadata) => ({
            organizationId: request.user?.organizationId ?? null,
            actorUserId: request.user?.sub ?? null,
            actorUsername: request.user?.username ?? null,
            action,
            httpMethod: method,
            httpPath: request.originalUrl ?? request.path ?? request.route?.path ?? 'unknown',
            statusCode,
            durationMs: Date.now() - startedAt,
            ipAddress: request.ip ?? null,
            userAgent: Array.isArray(userAgentHeader) ? userAgentHeader[0] ?? null : userAgentHeader ?? null,
            metadata,
        });
        return next.handle().pipe((0, operators_1.tap)(() => {
            void this.auditLogService.record(buildEntry(response.statusCode, null));
        }), (0, operators_1.catchError)((error) => {
            const statusCode = typeof error === 'object' && error !== null && 'status' in error && typeof error.status === 'number'
                ? error.status
                : 500;
            const message = typeof error === 'object' && error !== null && 'message' in error
                ? String(error.message)
                : 'unknown error';
            void this.auditLogService.record(buildEntry(statusCode, { errorMessage: message }));
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.AuditLogInterceptor = AuditLogInterceptor;
exports.AuditLogInterceptor = AuditLogInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [audit_log_service_1.AuditLogService,
        core_1.Reflector])
], AuditLogInterceptor);
//# sourceMappingURL=audit-log.interceptor.js.map