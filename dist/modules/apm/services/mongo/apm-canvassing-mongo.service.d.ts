import { Model } from 'mongoose';
import { CanvassingSessionDocument, CanvassingVisitDocument, VolunteerAssignmentDocument, VolunteerDocument, CitizenFeedbackDocument } from '../../schemas';
import { CreateCanvassingSessionDto, UpdateCanvassingSessionDto, CreateCanvassingVisitDto, CreateVolunteerAssignmentDto, UpdateVolunteerAssignmentDto } from '../../dto/canvassing.dto';
import { ListQueryDto } from '../../dto/apm.dto';
export declare class ApmCanvassingMongoService {
    private readonly sessionModel;
    private readonly visitModel;
    private readonly assignmentModel;
    private readonly volunteerModel;
    private readonly feedbackModel;
    constructor(sessionModel: Model<CanvassingSessionDocument>, visitModel: Model<CanvassingVisitDocument>, assignmentModel: Model<VolunteerAssignmentDocument>, volunteerModel: Model<VolunteerDocument>, feedbackModel: Model<CitizenFeedbackDocument>);
    listSessions(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingSessionSchema & {
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
    getSession(id: string): Promise<{
        visits: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        id: string;
        title: string;
        lgaId: string;
        wardId: string | null;
        teamLead: string | null;
        teamSize: number;
        status: string;
        scheduledDate: Date | null;
        completedDate: Date | null;
        notes: string | null;
        __v: number;
    }>;
    createSession(dto: CreateCanvassingSessionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateSession(id: string, dto: UpdateCanvassingSessionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getSessionStats(): Promise<{
        total: number;
        planned: number;
        inProgress: number;
        completed: number;
        totalVisits: number;
    }>;
    addVisit(sessionId: string, dto: CreateCanvassingVisitDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listVisits(sessionId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    private calcVisitStats;
    getVisitStats(sessionId: string): Promise<{
        total: number;
        strong: number;
        leaning: number;
        undecided: number;
        opposed: number;
        supportRate: number;
    }>;
    getAllVisitStats(): Promise<{
        total: number;
        strong: number;
        leaning: number;
        undecided: number;
        opposed: number;
        supportRate: number;
    }>;
    listAssignments(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerAssignmentSchema & {
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
    listAssignmentsByWard(wardId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createAssignment(dto: CreateVolunteerAssignmentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateAssignment(id: string, dto: UpdateVolunteerAssignmentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getVolunteerStats(): Promise<{
        totalVolunteers: number;
        totalAssignments: number;
        activeAssignments: number;
    }>;
    getSentimentDashboard(): Promise<{
        total: number;
        positive: number;
        negative: number;
        neutral: number;
        sentimentScore: number;
        topicBreakdown: {
            topic: string;
            count: number;
        }[];
        byLga: {
            positive: number;
            negative: number;
            neutral: number;
            total: number;
            lga: string;
        }[];
    }>;
}
