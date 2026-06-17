import { Model } from 'mongoose';
import { PollingAgentDocument, ResultEntryDocument, IncidentReportDocument, GotvRecordDocument } from '../../schemas';
import { CreatePollingAgentDto, UpdatePollingAgentDto, CreateResultEntryDto, CreateIncidentReportDto, UpdateIncidentReportDto, CreateGotvRecordDto, UpdateGotvRecordDto } from '../../dto/election.dto';
import { ListQueryDto } from '../../dto/apm.dto';
export declare class ApmElectionMongoService {
    private readonly agentModel;
    private readonly resultModel;
    private readonly incidentModel;
    private readonly gotvModel;
    constructor(agentModel: Model<PollingAgentDocument>, resultModel: Model<ResultEntryDocument>, incidentModel: Model<IncidentReportDocument>, gotvModel: Model<GotvRecordDocument>);
    listAgents(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    getAgent(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createAgent(dto: CreatePollingAgentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateAgent(id: string, dto: UpdatePollingAgentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAgentStats(): Promise<{
        total: number;
        trained: number;
        assigned: number;
        agent: number;
        backup: number;
        supervisor: number;
    }>;
    listResults(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    listResultsByLga(lgaId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getResult(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createResult(dto: CreateResultEntryDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    verifyResult(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getResultDashboard(): Promise<{
        total: number;
        submitted: number;
        verified: number;
        totalApmVotes: number;
        totalPdpVotes: number;
        totalApcVotes: number;
    }>;
    listIncidents(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    createIncident(dto: CreateIncidentReportDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateIncident(id: string, dto: UpdateIncidentReportDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getIncidentStats(): Promise<{
        total: number;
        open: number;
        critical: number;
        escalated: number;
    }>;
    listGotvRecords(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    listGotvByPu(pollingUnitId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createGotvRecord(dto: CreateGotvRecordDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateGotvRecord(id: string, dto: UpdateGotvRecordDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getGotvStats(): Promise<{
        total: number;
        contacted: number;
        turnedOut: number;
        turnoutRate: number;
    }>;
}
