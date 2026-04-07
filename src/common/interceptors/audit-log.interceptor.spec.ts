import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { of } from 'rxjs';
import { AuditLogService } from '../audit/services/audit-log.service';
import { AuditLogInterceptor } from './audit-log.interceptor';

function buildExecutionContext(method: string): ExecutionContext {
  const request = {
    method,
    originalUrl: '/sales',
    ip: '127.0.0.1',
    headers: {
      'user-agent': 'jest',
    },
    user: {
      sub: 'u1',
      organizationId: 'org1',
      username: 'admin',
      roles: ['admin'],
      permissions: [],
    },
  };
  const response = {
    statusCode: 201,
  };

  return {
    getType: () => 'http',
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
      getNext: () => undefined,
    }),
    getClass: () => ({}),
    getHandler: () => (() => undefined) as (...args: unknown[]) => unknown,
    getArgs: () => [],
    getArgByIndex: () => undefined,
    switchToRpc: () => ({ getContext: () => undefined, getData: () => undefined }),
    switchToWs: () => ({ getClient: () => undefined, getData: () => undefined, getPattern: () => undefined }),
  } as ExecutionContext;
}

describe('AuditLogInterceptor', () => {
  const auditLogService = {
    record: jest.fn(),
  } as unknown as AuditLogService;
  const reflector = {
    get: jest.fn().mockReturnValue(undefined),
  } as unknown as Reflector;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('records audit entry for mutating requests', (done) => {
    const interceptor = new AuditLogInterceptor(auditLogService, reflector);
    const context = buildExecutionContext('POST');
    const next: CallHandler = { handle: () => of({ ok: true }) };

    interceptor.intercept(context, next).subscribe({
      next: () => {
        expect(auditLogService.record).toHaveBeenCalledTimes(1);
      },
      error: done,
      complete: () => done(),
    });
  });

  it('skips audit record for GET requests', (done) => {
    const interceptor = new AuditLogInterceptor(auditLogService, reflector);
    const context = buildExecutionContext('GET');
    const next: CallHandler = { handle: () => of({ ok: true }) };

    interceptor.intercept(context, next).subscribe({
      next: () => {
        expect(auditLogService.record).not.toHaveBeenCalled();
      },
      error: done,
      complete: () => done(),
    });
  });
});

