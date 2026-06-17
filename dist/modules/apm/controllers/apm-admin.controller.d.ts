import { ApmService } from '../services/apm.service';
import { ListQueryDto } from '../dto/apm.dto';
export declare class ApmAdminController {
    private readonly apmService;
    constructor(apmService: ApmService);
    listVolunteers(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listSupporters(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listContacts(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listEventRegistrations(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listFeedback(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listIssues(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listDonations(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    getStats(): Promise<{
        volunteers: number;
        supporters: number;
        events: number;
        feedback: number;
    }>;
}
