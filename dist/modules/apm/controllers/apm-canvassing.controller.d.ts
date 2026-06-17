import { ApmCanvassingService } from '../services/apm-canvassing.service';
import { ListQueryDto } from '../dto/apm.dto';
import { CreateCanvassingSessionDto, UpdateCanvassingSessionDto, CreateCanvassingVisitDto, CreateVolunteerAssignmentDto, UpdateVolunteerAssignmentDto } from '../dto/canvassing.dto';
export declare class ApmCanvassingController {
    private readonly canvassingService;
    constructor(canvassingService: ApmCanvassingService);
    getStats(): Promise<{
        total: number;
        planned: number;
        inProgress: number;
        completed: number;
        totalVisits: number;
    }>;
    listSessions(query: ListQueryDto): Promise<{
        items: import("../entities").CanvassingSessionOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSession(id: string): Promise<import("../entities").CanvassingSessionOrmEntity>;
    createSession(dto: CreateCanvassingSessionDto): Promise<{
        scheduledDate: Date | undefined;
        title: string;
        lgaId: string;
        wardId?: string;
        teamLead?: string;
        teamSize?: number;
        notes?: string;
    } & import("../entities").CanvassingSessionOrmEntity>;
    updateSession(id: string, dto: UpdateCanvassingSessionDto): Promise<import("../entities").CanvassingSessionOrmEntity>;
    listVisits(id: string): Promise<import("../entities").CanvassingVisitOrmEntity[]>;
    getVisitStats(id: string): Promise<{
        total: number;
        strong: number;
        leaning: number;
        undecided: number;
        opposed: number;
        supportRate: number;
    }>;
    addVisit(id: string, dto: CreateCanvassingVisitDto): Promise<{
        contactedAt: Date;
        name: string;
        phone?: string;
        address?: string;
        supportLevel?: string;
        issues?: string;
        outcome?: string;
        sessionId: string;
    } & import("../entities").CanvassingVisitOrmEntity>;
    getAllVisitStats(): Promise<{
        total: number;
        strong: number;
        leaning: number;
        undecided: number;
        opposed: number;
        supportRate: number;
    }>;
}
export declare class ApmVolunteerAssignmentController {
    private readonly canvassingService;
    constructor(canvassingService: ApmCanvassingService);
    listAssignments(query: ListQueryDto): Promise<{
        items: import("../entities").VolunteerAssignmentOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    listByWard(wardId: string): Promise<import("../entities").VolunteerAssignmentOrmEntity[]>;
    createAssignment(dto: CreateVolunteerAssignmentDto): Promise<{
        assignedAt: Date;
        volunteerId: string;
        lgaId: string;
        wardId?: string;
        role?: string;
        notes?: string;
    } & import("../entities").VolunteerAssignmentOrmEntity>;
    updateAssignment(id: string, dto: UpdateVolunteerAssignmentDto): Promise<import("../entities").VolunteerAssignmentOrmEntity>;
    getStats(): Promise<{
        totalVolunteers: number;
        totalAssignments: number;
        activeAssignments: number;
    }>;
}
export declare class ApmSentimentController {
    private readonly canvassingService;
    constructor(canvassingService: ApmCanvassingService);
    getSentiment(): Promise<{
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
