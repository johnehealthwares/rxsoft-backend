"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLoggingInterceptor = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
function maskSensitive(headers) {
    const masked = { ...headers };
    for (const key of ['authorization', 'cookie', 'x-api-key', 'token']) {
        if (masked[key])
            masked[key] = '[REDACTED]';
    }
    return masked;
}
function truncate(value, max = 2000) {
    return value.length > max ? value.slice(0, max) + '... (truncated)' : value;
}
function safeJson(value) {
    try {
        return truncate(JSON.stringify(value));
    }
    catch {
        return String(value);
    }
}
let RequestLoggingInterceptor = class RequestLoggingInterceptor {
    logger = new common_1.Logger('HTTP');
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const { method, originalUrl, query, headers, body } = request;
        const requestId = (0, node_crypto_1.randomUUID)();
        const startedAt = Date.now();
        const safeHeaders = maskSensitive({ ...headers });
        const safeBody = body && typeof body === 'object' && Object.keys(body).length
            ? body
            : undefined;
        this.logger.log(`--> ${requestId} ${method} ${originalUrl}` +
            (safeBody ? `\n    body: ${safeJson(safeBody)}` : ''));
        return next.handle().pipe((0, rxjs_1.tap)({
            next: () => {
                const response = context.switchToHttp().getResponse();
                const duration = Date.now() - startedAt;
                this.logger.log(`<-- ${requestId} ${method} ${originalUrl} ${response.statusCode} ${duration}ms`);
            },
            error: (error) => {
                const duration = Date.now() - startedAt;
                const status = error.status ?? 500;
                this.logger.error(`<-- ${requestId} ${method} ${originalUrl} ${status} ${duration}ms - ${error.message}`, error.stack);
            },
        }));
    }
};
exports.RequestLoggingInterceptor = RequestLoggingInterceptor;
exports.RequestLoggingInterceptor = RequestLoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], RequestLoggingInterceptor);
//# sourceMappingURL=request-logging.interceptor.js.map