import { ApmConversionService } from '../services/apm-conversion.service';
export declare class ApmDataController {
    private readonly conversionService;
    constructor(conversionService: ApmConversionService);
    listLgas(): Promise<import("../entities").LgaOrmEntity[]>;
    getLga(id: string): Promise<import("../entities").LgaOrmEntity>;
    listWards(lgaId: string): Promise<import("../entities").WardOrmEntity[]>;
    getWard(id: string): Promise<import("../entities").WardOrmEntity>;
    listPollingUnits(wardId: string): Promise<import("../entities").PollingUnitOrmEntity[]>;
    getPollingUnit(id: string): Promise<import("../entities").PollingUnitOrmEntity>;
    searchPollingUnits(query: string): Promise<import("../entities").PollingUnitOrmEntity[]>;
}
