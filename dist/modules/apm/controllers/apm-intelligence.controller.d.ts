import { ApmIntelligenceService } from '../services/apm-intelligence.service';
import { ListQueryDto } from '../dto/apm.dto';
import { CreateCandidateTourDto, UpdateCandidateTourDto, CreateContentAssetDto, CreateListeningMentionDto, CreateRapidResponseDto } from '../dto/intelligence.dto';
export declare class ApmTourController {
    private readonly intelligenceService;
    constructor(intelligenceService: ApmIntelligenceService);
    listTours(query: ListQueryDto): Promise<{
        items: import("../entities").CandidateTourOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getStats(): Promise<{
        total: number;
        completed: number;
        planned: number;
        cancelled: number;
        totalAttendees: number;
        totalSignups: number;
    }>;
    getTour(id: string): Promise<import("../entities").CandidateTourOrmEntity>;
    createTour(dto: CreateCandidateTourDto): Promise<{
        tourDate: Date | undefined;
        title: string;
        lgaId: string;
        wardId?: string;
        visitType?: string;
        description?: string;
        expectedAttendees?: number;
        notes?: string;
    } & import("../entities").CandidateTourOrmEntity>;
    updateTour(id: string, dto: UpdateCandidateTourDto): Promise<import("../entities").CandidateTourOrmEntity>;
}
export declare class ApmContentController {
    private readonly intelligenceService;
    constructor(intelligenceService: ApmIntelligenceService);
    listContent(query: ListQueryDto): Promise<{
        items: import("../entities").ContentAssetOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    createContent(dto: CreateContentAssetDto): Promise<CreateContentAssetDto & import("../entities").ContentAssetOrmEntity>;
}
export declare class ApmListeningController {
    private readonly intelligenceService;
    constructor(intelligenceService: ApmIntelligenceService);
    listMentions(query: ListQueryDto): Promise<{
        items: import("../entities").ListeningMentionOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getStats(): Promise<{
        total: number;
        urgent: number;
        facebook: number;
        whatsapp: number;
        twitter: number;
        tiktok: number;
        instagram: number;
    }>;
    getMention(id: string): Promise<import("../entities").ListeningMentionOrmEntity>;
    createMention(dto: CreateListeningMentionDto): Promise<{
        mentionedAt: Date;
        isUrgent: boolean;
        platform: string;
        title: string;
        mentionUrl?: string;
        content?: string;
        sentiment?: string;
        reach?: number;
        source?: string;
        category?: string;
    } & import("../entities").ListeningMentionOrmEntity>;
    updateMentionStatus(id: string, status: string): Promise<import("../entities").ListeningMentionOrmEntity>;
}
export declare class ApmTruthDeskController {
    private readonly intelligenceService;
    constructor(intelligenceService: ApmIntelligenceService);
    listResponses(mentionId: string): Promise<import("../entities").RapidResponseOrmEntity[]>;
    createResponse(dto: CreateRapidResponseDto): Promise<{
        publishedAt: Date;
        mentionId: string;
        responseType?: string;
        content: string;
        publishedBy?: string;
        platform?: string;
    } & import("../entities").RapidResponseOrmEntity>;
}
