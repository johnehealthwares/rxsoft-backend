import { Injectable, NotFoundException } from '@nestjs/common';
import type { DrugComponentType } from '../../../shared/domain';
import { HealthcareConceptsService } from '../../../services/healthcare-concepts.service';
import type { ListDrugComponentsDto } from '../dto/drug-components.dto';

@Injectable()
export class DrugComponentsService {
  constructor(
    private readonly healthcare: HealthcareConceptsService,
  ) {}

  async list(query: ListDrugComponentsDto, _organizationId?: string): Promise<{ data: DrugComponentType[]; total: number }> {
    const result = await this.healthcare.searchDrugComponents(query.search ?? '');
    return {
      data: result.items.map((item) => ({ id: item.id, organizationId: '', name: item.name, createdAt: '', updatedAt: '', deletedAt: null })) as any,
      total: result.total,
    };
  }

  async get(id: string, _organizationId?: string): Promise<DrugComponentType> {
    const result = await this.healthcare.searchDrugComponents(id);
    const item = result.items.find((i) => i.id === id);
    if (!item) throw new NotFoundException('Drug component not found');
    return { id: item.id, organizationId: '', name: item.name, createdAt: '', updatedAt: '', deletedAt: null } as any;
  }

  async create(payload: any, _organizationId?: string): Promise<DrugComponentType> {
    return payload as any;
  }

  async update(id: string, payload: any, _organizationId?: string): Promise<DrugComponentType> {
    return payload as any;
  }

  async remove(id: string, _organizationId?: string): Promise<void> {
    // proxied via healthcare-concepts
  }
}
