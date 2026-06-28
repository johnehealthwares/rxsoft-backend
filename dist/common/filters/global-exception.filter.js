"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const PG_ERROR_CODES = {
    '23505': 'Duplicate record already exists',
    '23503': 'Referenced record does not exist',
    '23502': 'Required field is missing',
    '23514': 'Validation constraint failed',
    '22P02': 'Invalid input format',
    '22001': 'Value exceeds maximum length',
    '22003': 'Numeric value out of range',
    '22007': 'Invalid date/time format',
    '42703': 'Column does not exist',
    '42701': 'Duplicate column specified in query',
    '42P01': 'Table does not exist',
    '42601': 'SQL syntax error',
    '40001': 'Transaction serialization failure',
    '40P01': 'Deadlock detected',
};
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        console.log({ exception }, (exception?.response)?.message);
        if (exception instanceof typeorm_1.QueryFailedError) {
            const dbError = exception.driverError || exception;
            const code = dbError?.code;
            const status = code === '23505'
                ? common_1.HttpStatus.CONFLICT
                : common_1.HttpStatus.BAD_REQUEST;
            return void response.status(status).json({
                success: false,
                statusCode: status,
                path: request.url,
                timestamp: new Date().toISOString(),
                error: {
                    message: PG_ERROR_CODES[code] ||
                        dbError?.message ||
                        'Database error',
                    code,
                    detail: dbError?.detail,
                    constraint: dbError?.constraint,
                    table: dbError?.table,
                    column: dbError?.column,
                    schema: dbError?.schema,
                    hint: dbError?.hint,
                    severity: dbError?.severity,
                    routine: dbError?.routine,
                    originalMessage: dbError?.message,
                },
            });
        }
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const error = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : {
                message: 'Internal server error',
            };
        if (status >= 500) {
            this.logger.error(exception);
        }
        response.status(status).json({
            success: false,
            statusCode: status,
            path: request.url,
            timestamp: new Date().toISOString(),
            error,
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map