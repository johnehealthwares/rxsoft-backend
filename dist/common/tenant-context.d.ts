import { RequestUser } from './decorators/current-user.decorator';
export interface TenantContext {
    organizationId: string;
    locationId: string | null;
    isGlobalAdmin: boolean;
}
export declare function tenantFromUser(user: RequestUser): TenantContext;
