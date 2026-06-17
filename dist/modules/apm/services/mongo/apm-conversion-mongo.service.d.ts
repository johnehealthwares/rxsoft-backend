import { Model } from 'mongoose';
import { LgaDocument, WardDocument, PollingUnitDocument, StakeholderDocument, ConversionScoreDocument, ConversionActivityDocument, WhatsAppGroupDocument } from '../../schemas';
import { CreateStakeholderDto, UpdateStakeholderDto, CreateConversionActivityDto, UpdateConversionScoreDto, UpdatePollingUnitDto, CreateWhatsAppGroupDto } from '../../dto/conversion.dto';
import { ListQueryDto } from '../../dto/apm.dto';
export declare class ApmConversionMongoService {
    private readonly lgaModel;
    private readonly wardModel;
    private readonly puModel;
    private readonly stakeholderModel;
    private readonly scoreModel;
    private readonly activityModel;
    private readonly waGroupModel;
    constructor(lgaModel: Model<LgaDocument>, wardModel: Model<WardDocument>, puModel: Model<PollingUnitDocument>, stakeholderModel: Model<StakeholderDocument>, scoreModel: Model<ConversionScoreDocument>, activityModel: Model<ConversionActivityDocument>, waGroupModel: Model<WhatsAppGroupDocument>);
    listLgas(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getLga(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listWards(lgaId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").WardSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").WardSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getWard(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").WardSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").WardSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listPollingUnits(wardId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getPollingUnit(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updatePollingUnit(id: string, dto: UpdatePollingUnitDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    searchPollingUnits(query: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getDashboard(): Promise<{
        summary: {
            totalLgas: number;
            totalWards: number;
            totalPollingUnits: number;
            totalStakeholders: number;
        };
        conversion: {
            apmFriendlyPollingUnits: number;
            contestedPollingUnits: number;
            untouchedPollingUnits: number;
            greenLgas: number;
            redLgas: number;
            greenWards: number;
            redWards: number;
        };
        lgas: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        scores: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getLgaConversionDashboard(): Promise<{
        id: string;
        name: string;
        code: string;
        score: number;
        status: string;
        wardCount: number;
        pollingUnitCount: number;
        wonPollingUnits: number;
        lastAssessed: Date | null;
    }[]>;
    getWardConversionDashboard(lgaId: string): Promise<{
        id: string;
        name: string;
        code: string;
        score: number;
        status: string;
        pollingUnitCount: number;
        wonPollingUnits: number;
        lastAssessed: Date | null;
    }[]>;
    getPollingUnitDashboard(wardId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    updateScore(entityType: string, entityId: string, dto: UpdateConversionScoreDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listStakeholders(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").StakeholderSchema & {
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
    listStakeholdersByLga(lgaId: string, query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").StakeholderSchema & {
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
    getStakeholder(id: string): Promise<{
        activities: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionActivitySchema & {
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
        name: string;
        phone: string | null;
        email: string | null;
        role: string | null;
        lgaId: string;
        wardId: string | null;
        affiliation: string | null;
        influenceLevel: string;
        conversionStatus: string;
        notes: string | null;
        isActive: boolean;
        __v: number;
    }>;
    createStakeholder(dto: CreateStakeholderDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateStakeholder(id: string, dto: UpdateStakeholderDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createActivity(stakeholderId: string, dto: CreateConversionActivityDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listActivities(stakeholderId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    listWhatsAppGroups(level?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createWhatsAppGroup(dto: CreateWhatsAppGroupDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
