import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { GenericProductType } from '../../../shared/domain';
import { HealthcareConceptsService } from '../../../services/healthcare-concepts.service';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
import type { ListGenericProductsDto } from '../dto/generic-products.dto';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

const toGenericProductType = (cached: any): GenericProductType => ({
  id: cached.id,
  organizationId: '',
  code: cached.code,
  name: cached.name,
  therapeuticClass: cached.therapeuticClass ?? null,
  dosageForm: cached.dosageForm ?? null,
  strength: cached.strength ?? null,
  generalUse: cached.generalUse ?? '',
  adultDosage: cached.adultDosage ?? '',
  pediatricDosage: cached.pediatricDosage ?? '',
  isPrescriptionRequired: cached.isPrescriptionRequired ?? false,
  isControlledSubstance: cached.isControlledSubstance ?? false,
  pharmaceutics: cached.pharmaceutics
    ? {
        id: cached.pharmaceutics.id ?? '',
        organizationId: '',
        code: cached.pharmaceutics.code ?? '',
        commonBrandName: cached.pharmaceutics.commonBrandName ?? null,
        commonGenericName: cached.pharmaceutics.commonGenericName ?? null,
        clinicalName: cached.pharmaceutics.clinicalName ?? null,
        drugClass: cached.pharmaceutics.drugClass ?? null,
        chemicalConstituents: cached.pharmaceutics.chemicalConstituents ?? null,
        pharmaceutics: cached.pharmaceutics.pharmaceutics ?? null,
        indications: cached.pharmaceutics.indications ?? null,
        contraindications: cached.pharmaceutics.contraindications ?? null,
        mechanism: cached.pharmaceutics.mechanism ?? null,
        missedDose: cached.pharmaceutics.missedDose ?? null,
        drugInteractions: cached.pharmaceutics.drugInteractions ?? null,
        dosage: cached.pharmaceutics.dosage ?? null,
        createdAt: cached.pharmaceutics.createdAt ?? new Date().toISOString(),
        updatedAt: cached.pharmaceutics.updatedAt ?? new Date().toISOString(),
        deletedAt: null,
      }
    : null!,
  createdAt: cached.createdAt ?? new Date().toISOString(),
  updatedAt: cached.updatedAt ?? new Date().toISOString(),
  deletedAt: null,
});

@Injectable()
export class GenericProductsService {
  constructor(
    private readonly healthcare: HealthcareConceptsService,
    private readonly cache: GenericDrugCacheService,
  ) {}

  async list(query: ListGenericProductsDto, _organizationId?: string): Promise<{ data: GenericProductType[]; total: number }> {
    const search = query.search ?? '';
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 20;
    const result = this.cache.searchLightweight(search, offset, limit);
    const items = result.items
      .map((item) => this.cache.getByCode(item.code))
      .filter(Boolean);
    return {
      data: items.map(toGenericProductType),
      total: result.total,
    };
  }

  async get(idOrCode: string, _organizationId?: string): Promise<GenericProductType> {
    let cached = this.cache.getByCode(idOrCode);
    if (!cached) {
      cached = this.cache.getAll().find((p) => p.id === idOrCode);
    }
    if (!cached) {
      const fetched = await this.healthcare.getGenericProductByCode(idOrCode);
      if (!fetched) throw new NotFoundException('Generic product not found');
      return toGenericProductType(fetched);
    }
    return toGenericProductType(cached);
  }

  async create(payload: any, _organizationId?: string): Promise<GenericProductType> {
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: undefined,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }
    const result = await this.healthcare.createGenericProduct(payload);
    if (!result) throw new BadRequestException('Failed to create generic product');
    this.cache.invalidate(result.code);
    return toGenericProductType(result);
  }

  async update(id: string, payload: any, _organizationId?: string): Promise<GenericProductType> {
    const result = await this.healthcare.updateGenericProduct(id, payload);
    if (!result) throw new NotFoundException('Generic product not found');
    this.cache.invalidate(result.code);
    return toGenericProductType(result);
  }

  async remove(id: string, _organizationId?: string): Promise<void> {
    const cached = this.cache.getAll().find((p) => p.id === id);
    if (cached) this.cache.invalidate(cached.code);
    await this.healthcare.deleteGenericProduct(id);
  }
}
