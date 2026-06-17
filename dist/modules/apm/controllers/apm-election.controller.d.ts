import { ApmElectionService } from '../services/apm-election.service';
import { ListQueryDto } from '../dto/apm.dto';
import { CreatePollingAgentDto, UpdatePollingAgentDto, CreateResultEntryDto, CreateIncidentReportDto, UpdateIncidentReportDto, CreateGotvRecordDto, UpdateGotvRecordDto } from '../dto/election.dto';
export declare class ApmAgentController {
    private readonly electionService;
    constructor(electionService: ApmElectionService);
    listAgents(query: ListQueryDto): Promise<{
        items: import("../entities").PollingAgentOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getStats(): Promise<{
        total: number;
        trained: number;
        assigned: number;
        agent: number;
        backup: number;
        supervisor: number;
    }>;
    getAgent(id: string): Promise<import("../entities").PollingAgentOrmEntity>;
    createAgent(dto: CreatePollingAgentDto): Promise<{
        assignedAt: Date;
        pollingUnitId: string;
        name: string;
        phone: string;
        role?: string;
    } & import("../entities").PollingAgentOrmEntity>;
    updateAgent(id: string, dto: UpdatePollingAgentDto): Promise<import("../entities").PollingAgentOrmEntity>;
}
export declare class ApmResultController {
    private readonly electionService;
    constructor(electionService: ApmElectionService);
    listResults(query: ListQueryDto): Promise<{
        items: import("../entities").ResultEntryOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getDashboard(): Promise<{
        total: number;
        submitted: number;
        verified: number;
        totalApmVotes: number;
        totalPdpVotes: number;
        totalApcVotes: number;
    }>;
    listByLga(lgaId: string): Promise<import("../entities").ResultEntryOrmEntity[]>;
    getResult(id: string): Promise<import("../entities").ResultEntryOrmEntity>;
    createResult(dto: CreateResultEntryDto): Promise<{
        totalVotes: number;
        pollingUnitId: string;
        lgaId: string;
        wardId: string;
        apmVotes: number;
        pdpVotes: number;
        apcVotes: number;
        otherVotes?: number;
        registeredVoters: number;
        photoUrl?: string;
        enteredBy?: string;
        notes?: string;
    } & import("../entities").ResultEntryOrmEntity>;
    verifyResult(id: string): Promise<import("../entities").ResultEntryOrmEntity>;
}
export declare class ApmIncidentController {
    private readonly electionService;
    constructor(electionService: ApmElectionService);
    listIncidents(query: ListQueryDto): Promise<{
        items: import("../entities").IncidentReportOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getStats(): Promise<{
        total: number;
        open: number;
        critical: number;
        escalated: number;
    }>;
    createIncident(dto: CreateIncidentReportDto): Promise<{
        reportedAt: Date;
        pollingUnitId?: string;
        type: string;
        description: string;
        severity?: string;
        reportedBy?: string;
    } & import("../entities").IncidentReportOrmEntity>;
    updateIncident(id: string, dto: UpdateIncidentReportDto): Promise<import("../entities").IncidentReportOrmEntity>;
}
export declare class ApmGotvController {
    private readonly electionService;
    constructor(electionService: ApmElectionService);
    listGotv(query: ListQueryDto): Promise<{
        items: import("../entities").GotvRecordOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getStats(): Promise<{
        total: number;
        contacted: number;
        turnedOut: number;
        turnoutRate: number;
    }>;
    listByPu(pollingUnitId: string): Promise<import("../entities").GotvRecordOrmEntity[]>;
    createGotv(dto: CreateGotvRecordDto): Promise<{
        contacted: true;
        contactedAt: Date;
        pollingUnitId: string;
        supporterName: string;
        supporterPhone?: string;
        contactedVia?: string;
        notes?: string;
    } & import("../entities").GotvRecordOrmEntity>;
    updateGotv(id: string, dto: UpdateGotvRecordDto): Promise<import("../entities").GotvRecordOrmEntity>;
}
