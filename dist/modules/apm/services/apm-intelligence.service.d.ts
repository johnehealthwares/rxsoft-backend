import { Repository } from 'typeorm';
import { CandidateTourOrmEntity, ContentAssetOrmEntity, ListeningMentionOrmEntity, RapidResponseOrmEntity } from '../entities';
import { CreateCandidateTourDto, UpdateCandidateTourDto, CreateContentAssetDto, CreateListeningMentionDto, CreateRapidResponseDto } from '../dto/intelligence.dto';
import { ListQueryDto } from '../dto/apm.dto';
export declare class ApmIntelligenceService {
    private readonly tourRepo;
    private readonly contentRepo;
    private readonly mentionRepo;
    private readonly responseRepo;
    constructor(tourRepo: Repository<CandidateTourOrmEntity>, contentRepo: Repository<ContentAssetOrmEntity>, mentionRepo: Repository<ListeningMentionOrmEntity>, responseRepo: Repository<RapidResponseOrmEntity>);
    listTours(query: ListQueryDto): Promise<{
        items: CandidateTourOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getTour(id: string): Promise<CandidateTourOrmEntity>;
    createTour(dto: CreateCandidateTourDto): Promise<{
        tourDate: Date | undefined;
        title: string;
        lgaId: string;
        wardId?: string;
        visitType?: string;
        description?: string;
        expectedAttendees?: number;
        notes?: string;
    } & CandidateTourOrmEntity>;
    updateTour(id: string, dto: UpdateCandidateTourDto): Promise<CandidateTourOrmEntity>;
    getTourStats(): Promise<{
        total: number;
        completed: number;
        planned: number;
        cancelled: number;
        totalAttendees: number;
        totalSignups: number;
    }>;
    listContent(query: ListQueryDto): Promise<{
        items: ContentAssetOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    createContent(dto: CreateContentAssetDto): Promise<CreateContentAssetDto & ContentAssetOrmEntity>;
    listMentions(query: ListQueryDto): Promise<{
        items: ListeningMentionOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getMention(id: string): Promise<ListeningMentionOrmEntity>;
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
    } & ListeningMentionOrmEntity>;
    updateMentionStatus(id: string, status: string): Promise<ListeningMentionOrmEntity>;
    getListeningStats(): Promise<{
        total: number;
        urgent: number;
        facebook: number;
        whatsapp: number;
        twitter: number;
        tiktok: number;
        instagram: number;
    }>;
    listResponses(mentionId: string): Promise<RapidResponseOrmEntity[]>;
    createResponse(dto: CreateRapidResponseDto): Promise<{
        publishedAt: Date;
        mentionId: string;
        responseType?: string;
        content: string;
        publishedBy?: string;
        platform?: string;
    } & RapidResponseOrmEntity>;
}
