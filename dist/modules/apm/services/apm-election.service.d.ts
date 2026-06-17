import { Repository } from 'typeorm';
import { PollingAgentOrmEntity, ResultEntryOrmEntity, IncidentReportOrmEntity, GotvRecordOrmEntity } from '../entities';
import { CreatePollingAgentDto, UpdatePollingAgentDto, CreateResultEntryDto, CreateIncidentReportDto, UpdateIncidentReportDto, CreateGotvRecordDto, UpdateGotvRecordDto } from '../dto/election.dto';
import { ListQueryDto } from '../dto/apm.dto';
export declare class ApmElectionService {
    private readonly agentRepo;
    private readonly resultRepo;
    private readonly incidentRepo;
    private readonly gotvRepo;
    constructor(agentRepo: Repository<PollingAgentOrmEntity>, resultRepo: Repository<ResultEntryOrmEntity>, incidentRepo: Repository<IncidentReportOrmEntity>, gotvRepo: Repository<GotvRecordOrmEntity>);
    listAgents(query: ListQueryDto): Promise<{
        items: PollingAgentOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getAgent(id: string): Promise<PollingAgentOrmEntity>;
    createAgent(dto: CreatePollingAgentDto): Promise<{
        assignedAt: Date;
        pollingUnitId: string;
        name: string;
        phone: string;
        role?: string;
    } & PollingAgentOrmEntity>;
    updateAgent(id: string, dto: UpdatePollingAgentDto): Promise<PollingAgentOrmEntity>;
    getAgentStats(): Promise<{
        total: number;
        trained: number;
        assigned: number;
        agent: number;
        backup: number;
        supervisor: number;
    }>;
    listResults(query: ListQueryDto): Promise<{
        items: ResultEntryOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    listResultsByLga(lgaId: string): Promise<ResultEntryOrmEntity[]>;
    getResult(id: string): Promise<ResultEntryOrmEntity>;
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
    } & ResultEntryOrmEntity>;
    verifyResult(id: string): Promise<ResultEntryOrmEntity>;
    getResultDashboard(): Promise<{
        total: number;
        submitted: number;
        verified: number;
        totalApmVotes: number;
        totalPdpVotes: number;
        totalApcVotes: number;
    }>;
    listIncidents(query: ListQueryDto): Promise<{
        items: IncidentReportOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    createIncident(dto: CreateIncidentReportDto): Promise<{
        reportedAt: Date;
        pollingUnitId?: string;
        type: string;
        description: string;
        severity?: string;
        reportedBy?: string;
    } & IncidentReportOrmEntity>;
    updateIncident(id: string, dto: UpdateIncidentReportDto): Promise<IncidentReportOrmEntity>;
    getIncidentStats(): Promise<{
        total: number;
        open: number;
        critical: number;
        escalated: number;
    }>;
    listGotvRecords(query: ListQueryDto): Promise<{
        items: GotvRecordOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    listGotvByPu(pollingUnitId: string): Promise<GotvRecordOrmEntity[]>;
    createGotvRecord(dto: CreateGotvRecordDto): Promise<{
        contacted: true;
        contactedAt: Date;
        pollingUnitId: string;
        supporterName: string;
        supporterPhone?: string;
        contactedVia?: string;
        notes?: string;
    } & GotvRecordOrmEntity>;
    updateGotvRecord(id: string, dto: UpdateGotvRecordDto): Promise<GotvRecordOrmEntity>;
    getGotvStats(): Promise<{
        total: number;
        contacted: number;
        turnedOut: number;
        turnoutRate: number;
    }>;
}
