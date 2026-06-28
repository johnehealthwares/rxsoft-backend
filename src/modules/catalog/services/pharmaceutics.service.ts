import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { PharmaceuticsType } from '../../../shared/domain';
import { HealthcareConceptsService } from '../../../services/healthcare-concepts.service';
import type { ListPharmaceuticsDto } from '../dto/pharmaceutics.dto';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

@Injectable()
export class PharmaceuticsService {
  constructor(
    private readonly healthcare: HealthcareConceptsService,
  ) {}

  async list(query: ListPharmaceuticsDto, _organizationId?: string): Promise<{ data: PharmaceuticsType[]; total: number }> {
    const result = await this.healthcare.searchPharmaceutics(query.search ?? '');
    return {
      data: result.items as any,
      total: result.total,
    };
  }

  async get(id: string, _organizationId?: string): Promise<PharmaceuticsType> {
    const item = await this.healthcare.getPharmaceutics(id);
    if (!item) throw new NotFoundException('Pharmaceutics not found');
    return { id: item.id, organizationId: '', code: item.code, commonBrandName: item.commonBrandName, commonGenericName: item.commonGenericName, clinicalName: item.clinicalName, drugClass: item.drugClass, chemicalConstituents: null, pharmaceutics: item.pharmaceutics, indications: item.indications, contraindications: item.contraindications, mechanism: item.mechanism, missedDose: null, drugInteractions: null, dosage: null, createdAt: '', updatedAt: '', deletedAt: null } as any;
  }

  async create(payload: any, _organizationId?: string): Promise<PharmaceuticsType> {
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: undefined,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }
    return payload as any;
  }

  async update(id: string, payload: any, _organizationId?: string): Promise<PharmaceuticsType> {
    return payload as any;
  }

  async remove(id: string, _organizationId?: string): Promise<void> {
    // proxied via healthcare-concepts
  }
}
