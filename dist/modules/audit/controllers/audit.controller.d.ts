import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { AuditService } from '../services/audit.service';
type AuditListResponse = {
    data: Awaited<ReturnType<AuditService['list']>>['data'];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    list(query: ListQueryDto): Promise<AuditListResponse>;
}
export {};
