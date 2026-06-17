import { ApmConversionService } from '../services/apm-conversion.service';
import { ListQueryDto } from '../dto/apm.dto';
import { CreateStakeholderDto, UpdateStakeholderDto, CreateConversionActivityDto, UpdateConversionScoreDto, UpdatePollingUnitDto, CreateWhatsAppGroupDto } from '../dto/conversion.dto';
export declare class ApmConversionController {
    private readonly conversionService;
    constructor(conversionService: ApmConversionService);
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
        lgas: import("../entities").LgaOrmEntity[];
        scores: import("../entities").ConversionScoreOrmEntity[];
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
    getPollingUnitDashboard(wardId: string): Promise<import("../entities").PollingUnitOrmEntity[]>;
    updateScore(entityType: string, entityId: string, dto: UpdateConversionScoreDto): Promise<import("../entities").ConversionScoreOrmEntity>;
    updatePollingUnit(id: string, dto: UpdatePollingUnitDto): Promise<import("../entities").PollingUnitOrmEntity>;
}
export declare class ApmStakeholderController {
    private readonly conversionService;
    constructor(conversionService: ApmConversionService);
    listStakeholders(query: ListQueryDto): Promise<{
        items: import("../entities").StakeholderOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    listStakeholdersByLga(lgaId: string, query: ListQueryDto): Promise<{
        items: import("../entities").StakeholderOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getStakeholder(id: string): Promise<import("../entities").StakeholderOrmEntity>;
    createStakeholder(dto: CreateStakeholderDto): Promise<CreateStakeholderDto & import("../entities").StakeholderOrmEntity>;
    updateStakeholder(id: string, dto: UpdateStakeholderDto): Promise<import("../entities").StakeholderOrmEntity>;
    createActivity(id: string, dto: CreateConversionActivityDto): Promise<{
        conductedAt: Date;
        followUpDate: Date | null;
        type: string;
        notes?: string;
        outcome?: string;
        conductedBy?: string;
        stakeholderId: string;
    } & import("../entities").ConversionActivityOrmEntity>;
    listActivities(id: string): Promise<import("../entities").ConversionActivityOrmEntity[]>;
}
export declare class ApmWhatsAppController {
    private readonly conversionService;
    constructor(conversionService: ApmConversionService);
    listGroups(level?: string): Promise<import("../entities").WhatsAppGroupOrmEntity[]>;
    createGroup(dto: CreateWhatsAppGroupDto): Promise<CreateWhatsAppGroupDto & import("../entities").WhatsAppGroupOrmEntity>;
}
