import { Repository } from 'typeorm';
import { CanvassingSessionOrmEntity, CanvassingVisitOrmEntity, VolunteerAssignmentOrmEntity, VolunteerOrmEntity, CitizenFeedbackOrmEntity } from '../entities';
import { CreateCanvassingSessionDto, UpdateCanvassingSessionDto, CreateCanvassingVisitDto, CreateVolunteerAssignmentDto, UpdateVolunteerAssignmentDto } from '../dto/canvassing.dto';
import { ListQueryDto } from '../dto/apm.dto';
export declare class ApmCanvassingService {
    private readonly sessionRepo;
    private readonly visitRepo;
    private readonly assignmentRepo;
    private readonly volunteerRepo;
    private readonly feedbackRepo;
    constructor(sessionRepo: Repository<CanvassingSessionOrmEntity>, visitRepo: Repository<CanvassingVisitOrmEntity>, assignmentRepo: Repository<VolunteerAssignmentOrmEntity>, volunteerRepo: Repository<VolunteerOrmEntity>, feedbackRepo: Repository<CitizenFeedbackOrmEntity>);
    listSessions(query: ListQueryDto): Promise<{
        items: CanvassingSessionOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSession(id: string): Promise<CanvassingSessionOrmEntity>;
    createSession(dto: CreateCanvassingSessionDto): Promise<{
        scheduledDate: Date | undefined;
        title: string;
        lgaId: string;
        wardId?: string;
        teamLead?: string;
        teamSize?: number;
        notes?: string;
    } & CanvassingSessionOrmEntity>;
    updateSession(id: string, dto: UpdateCanvassingSessionDto): Promise<CanvassingSessionOrmEntity>;
    getSessionStats(): Promise<{
        total: number;
        planned: number;
        inProgress: number;
        completed: number;
        totalVisits: number;
    }>;
    addVisit(sessionId: string, dto: CreateCanvassingVisitDto): Promise<{
        contactedAt: Date;
        name: string;
        phone?: string;
        address?: string;
        supportLevel?: string;
        issues?: string;
        outcome?: string;
        sessionId: string;
    } & CanvassingVisitOrmEntity>;
    listVisits(sessionId: string): Promise<CanvassingVisitOrmEntity[]>;
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
        items: VolunteerAssignmentOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    listAssignmentsByWard(wardId: string): Promise<VolunteerAssignmentOrmEntity[]>;
    createAssignment(dto: CreateVolunteerAssignmentDto): Promise<{
        assignedAt: Date;
        volunteerId: string;
        lgaId: string;
        wardId?: string;
        role?: string;
        notes?: string;
    } & VolunteerAssignmentOrmEntity>;
    updateAssignment(id: string, dto: UpdateVolunteerAssignmentDto): Promise<VolunteerAssignmentOrmEntity>;
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
