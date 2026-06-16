import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
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

@Injectable()
export class HealthcareConceptsService {
  private readonly logger = new Logger(HealthcareConceptsService.name);
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    configService: ConfigService,
  ) {
    this.baseUrl = configService.get<string>('HEALTHCARE_CONCEPTS_API_URL', 'http://localhost:3011/api/v1');
  }

  async getGenericProductByCode(code: string): Promise<CachedGenericProduct | null> {
    try {
      const response = await this.http.axiosRef.get(`${this.baseUrl}/generic-products/code/${encodeURIComponent(code)}`);
      return response.data?.data ?? null;
    } catch (err: any) {
      if (err.response?.status === 404) return null;
      this.logger.error(`Failed to fetch generic product by code ${code}: ${err.message}`);
      return null;
    }
  }

  async searchGenericProducts(query: string, page = 1, limit = 20): Promise<{ items: GenericProductLookup[]; total: number }> {
    try {
      const response = await this.http.axiosRef.get(`${this.baseUrl}/generic-products/search`, {
        params: { search: query, page, limit },
      });
      const data = response.data?.data ?? [];
      return {
        items: data.map((item: any) => ({ id: item.id, code: item.code, name: item.name })),
        total: response.data?.meta?.total ?? data.length,
      };
    } catch (err: any) {
      this.logger.error(`Failed to search generic products: ${err.message}`);
      return { items: [], total: 0 };
    }
  }

  async listGenericProducts(page = 1, limit = 1000): Promise<CachedGenericProduct[]> {
    try {
      const response = await this.http.axiosRef.get(`${this.baseUrl}/generic-products`, {
        params: { page, limit },
      });
      return response.data?.data ?? [];
    } catch (err: any) {
      this.logger.error(`Failed to list all generic products: ${err.message}`);
      return [];
    }
  }

  async getPharmaceutics(id: string): Promise<PharmaceuticsData | null> {
    try {
      const response = await this.http.axiosRef.get(`${this.baseUrl}/pharmaceutics/${id}`);
      return response.data?.data ?? null;
    } catch (err: any) {
      if (err.response?.status === 404) return null;
      this.logger.error(`Failed to fetch pharmaceutics ${id}: ${err.message}`);
      return null;
    }
  }

  async searchPharmaceutics(query: string): Promise<{ items: GenericProductLookup[]; total: number }> {
    try {
      const response = await this.http.axiosRef.get(`${this.baseUrl}/pharmaceutics`, {
        params: { search: query },
      });
      const data = response.data?.data ?? [];
      return {
        items: data.map((item: any) => ({ id: item.id, code: item.code, name: item.commonGenericName ?? item.clinicalName ?? item.code })),
        total: response.data?.meta?.total ?? data.length,
      };
    } catch (err: any) {
      this.logger.error(`Failed to search pharmaceutics: ${err.message}`);
      return { items: [], total: 0 };
    }
  }

  async searchDrugComponents(query: string): Promise<{ items: GenericProductLookup[]; total: number }> {
    try {
      const response = await this.http.axiosRef.get(`${this.baseUrl}/drug-components`, {
        params: { search: query },
      });
      const data = response.data?.data ?? [];
      return {
        items: data.map((item: any) => ({ id: item.id, code: item.name, name: item.name })),
        total: response.data?.meta?.total ?? data.length,
      };
    } catch (err: any) {
      this.logger.error(`Failed to search drug components: ${err.message}`);
      return { items: [], total: 0 };
    }
  }

  async createGenericProduct(payload: any): Promise<any> {
    const response = await this.http.axiosRef.post(`${this.baseUrl}/generic-products`, payload);
    return response.data?.data;
  }

  async updateGenericProduct(id: string, payload: any): Promise<any> {
    const response = await this.http.axiosRef.patch(`${this.baseUrl}/generic-products/${id}`, payload);
    return response.data?.data;
  }

  async deleteGenericProduct(id: string): Promise<void> {
    await this.http.axiosRef.delete(`${this.baseUrl}/generic-products/${id}`);
  }
}
