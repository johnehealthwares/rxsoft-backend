import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export interface GenericProductLookup {
    id: string;
    code: string;
    name: string;
}
export interface CachedGenericProduct {
    id: string;
    code: string;
    name: string;
    therapeuticClass: string | null;
    dosageForm: string | null;
    strength: string | null;
    generalUse?: string;
    adultDosage?: string;
    pediatricDosage?: string;
    isPrescriptionRequired?: boolean;
    isControlledSubstance?: boolean;
    createdAt?: string;
    updatedAt?: string;
    pharmaceutics?: {
        id: string;
        code: string;
        commonBrandName: string | null;
        commonGenericName: string | null;
        clinicalName: string | null;
        drugClass: string | null;
        pharmaceutics: string | null;
        indications: string | null;
        contraindications: string | null;
        mechanism: string | null;
        createdAt?: string;
        updatedAt?: string;
    } | null;
}
export interface PharmaceuticsData {
    id: string;
    code: string;
    commonBrandName: string | null;
    commonGenericName: string | null;
    clinicalName: string | null;
    drugClass: string | null;
    chemicalConstituents: string | null;
    pharmaceutics: string | null;
    indications: string | null;
    contraindications: string | null;
    mechanism: string | null;
    missedDose: string | null;
    drugInteractions: string | null;
    dosage: string | null;
    createdAt: string;
    updatedAt: string;
}
export declare class HealthcareConceptsService {
    private readonly http;
    private readonly logger;
    private readonly baseUrl;
    constructor(http: HttpService, configService: ConfigService);
    getGenericProductByCode(code: string): Promise<CachedGenericProduct | null>;
    searchGenericProducts(query: string, page?: number, limit?: number): Promise<{
        items: GenericProductLookup[];
        total: number;
    }>;
    listGenericProducts(page?: number, limit?: number): Promise<CachedGenericProduct[]>;
    getPharmaceutics(id: string): Promise<PharmaceuticsData | null>;
    searchPharmaceutics(query: string): Promise<{
        items: GenericProductLookup[];
        total: number;
    }>;
    searchDrugComponents(query: string): Promise<{
        items: GenericProductLookup[];
        total: number;
    }>;
    createGenericProduct(payload: any): Promise<any>;
    updateGenericProduct(id: string, payload: any): Promise<any>;
    deleteGenericProduct(id: string): Promise<void>;
}
