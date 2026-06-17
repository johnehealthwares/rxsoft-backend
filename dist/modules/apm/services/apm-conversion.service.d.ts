import { Repository } from 'typeorm';
import { LgaOrmEntity, WardOrmEntity, PollingUnitOrmEntity, StakeholderOrmEntity, ConversionScoreOrmEntity, ConversionActivityOrmEntity, WhatsAppGroupOrmEntity } from '../entities';
import { CreateStakeholderDto, UpdateStakeholderDto, CreateConversionActivityDto, UpdateConversionScoreDto, UpdatePollingUnitDto, CreateWhatsAppGroupDto } from '../dto/conversion.dto';
import { ListQueryDto } from '../dto/apm.dto';
export declare class ApmConversionService {
    private readonly lgaRepo;
    private readonly wardRepo;
    private readonly puRepo;
    private readonly stakeholderRepo;
    private readonly scoreRepo;
    private readonly activityRepo;
    private readonly waGroupRepo;
    constructor(lgaRepo: Repository<LgaOrmEntity>, wardRepo: Repository<WardOrmEntity>, puRepo: Repository<PollingUnitOrmEntity>, stakeholderRepo: Repository<StakeholderOrmEntity>, scoreRepo: Repository<ConversionScoreOrmEntity>, activityRepo: Repository<ConversionActivityOrmEntity>, waGroupRepo: Repository<WhatsAppGroupOrmEntity>);
    listLgas(): Promise<LgaOrmEntity[]>;
    getLga(id: string): Promise<LgaOrmEntity>;
    listWards(lgaId: string): Promise<WardOrmEntity[]>;
    getWard(id: string): Promise<WardOrmEntity>;
    listPollingUnits(wardId: string): Promise<PollingUnitOrmEntity[]>;
    getPollingUnit(id: string): Promise<PollingUnitOrmEntity>;
    updatePollingUnit(id: string, dto: UpdatePollingUnitDto): Promise<PollingUnitOrmEntity>;
    searchPollingUnits(query: string): Promise<PollingUnitOrmEntity[]>;
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
        lgas: LgaOrmEntity[];
        scores: ConversionScoreOrmEntity[];
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
    getPollingUnitDashboard(wardId: string): Promise<PollingUnitOrmEntity[]>;
    updateScore(entityType: string, entityId: string, dto: UpdateConversionScoreDto): Promise<ConversionScoreOrmEntity>;
    listStakeholders(query: ListQueryDto): Promise<{
        items: StakeholderOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    listStakeholdersByLga(lgaId: string, query: ListQueryDto): Promise<{
        items: StakeholderOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getStakeholder(id: string): Promise<StakeholderOrmEntity>;
    createStakeholder(dto: CreateStakeholderDto): Promise<CreateStakeholderDto & StakeholderOrmEntity>;
    updateStakeholder(id: string, dto: UpdateStakeholderDto): Promise<StakeholderOrmEntity>;
    createActivity(stakeholderId: string, dto: CreateConversionActivityDto): Promise<{
        conductedAt: Date;
        followUpDate: Date | null;
        type: string;
        notes?: string;
        outcome?: string;
        conductedBy?: string;
        stakeholderId: string;
    } & ConversionActivityOrmEntity>;
    listActivities(stakeholderId: string): Promise<ConversionActivityOrmEntity[]>;
    listWhatsAppGroups(level?: string): Promise<WhatsAppGroupOrmEntity[]>;
    createWhatsAppGroup(dto: CreateWhatsAppGroupDto): Promise<CreateWhatsAppGroupDto & WhatsAppGroupOrmEntity>;
}
