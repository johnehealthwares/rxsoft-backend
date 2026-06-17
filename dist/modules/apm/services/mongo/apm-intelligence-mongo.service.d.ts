import { Model } from 'mongoose';
import { CandidateTourDocument, ContentAssetDocument, ListeningMentionDocument, RapidResponseDocument } from '../../schemas';
import { CreateCandidateTourDto, UpdateCandidateTourDto, CreateContentAssetDto, CreateListeningMentionDto, CreateRapidResponseDto } from '../../dto/intelligence.dto';
import { ListQueryDto } from '../../dto/apm.dto';
export declare class ApmIntelligenceMongoService {
    private readonly tourModel;
    private readonly contentModel;
    private readonly mentionModel;
    private readonly responseModel;
    constructor(tourModel: Model<CandidateTourDocument>, contentModel: Model<ContentAssetDocument>, mentionModel: Model<ListeningMentionDocument>, responseModel: Model<RapidResponseDocument>);
    listTours(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CandidateTourSchema & {
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
    getTour(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createTour(dto: CreateCandidateTourDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateTour(id: string, dto: UpdateCandidateTourDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getTourStats(): Promise<{
        total: number;
        completed: number;
        planned: number;
        cancelled: number;
        totalAttendees: number;
        totalSignups: number;
    }>;
    listContent(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ContentAssetSchema & {
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
    createContent(dto: CreateContentAssetDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listMentions(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ListeningMentionSchema & {
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
    getMention(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createMention(dto: CreateListeningMentionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateMentionStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getListeningStats(): Promise<{
        total: number;
        urgent: number;
        facebook: number;
        whatsapp: number;
        twitter: number;
        tiktok: number;
        instagram: number;
    }>;
    listResponses(mentionId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createResponse(dto: CreateRapidResponseDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
