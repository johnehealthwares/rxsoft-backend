import { SetMetadata } from '@nestjs/common';

export const AUDIT_ACTION_METADATA_KEY = 'audit_action';
export const AuditAction = (action: string) => SetMetadata(AUDIT_ACTION_METADATA_KEY, action);

