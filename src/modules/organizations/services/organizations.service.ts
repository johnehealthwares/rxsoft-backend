import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrganisationsProxyService } from '../../organisations-proxy/organisations-proxy.service';
import { CreateOrganizationDto, ListOrganizationsDto, UpdateOrganizationDto } from '../dto/organizations.dto';

export interface OrganizationType {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

export type OrganizationListResult = {
  data: OrganizationType[];
  total: number;
};

@Injectable()
export class OrganizationsService {
  constructor(private readonly proxy: OrganisationsProxyService) {}

  async list(query: ListOrganizationsDto): Promise<OrganizationListResult> {
    const result = await this.proxy.list({
      page: String(query.page ?? 1),
      limit: String(query.limit ?? 20),
      ...(query.search ? { search: query.search } : {}),
    });
    const data = Array.isArray(result?.data) ? result.data : [];
    const total = result?.meta?.total ?? data.length;
    return { data, total };
  }

  async get(id: string): Promise<OrganizationType> {
    const organization = await this.proxy.findById(id);
    if (!organization) throw new NotFoundException('Organization not found');
    return organization;
  }

  async create(payload: CreateOrganizationDto): Promise<OrganizationType> {
    const organization = await this.proxy.create(payload);
    if (!organization) throw new BadRequestException('Failed to create organization');
    return organization;
  }

  async update(id: string, payload: UpdateOrganizationDto): Promise<OrganizationType> {
    const organization = await this.proxy.update(id, payload);
    if (!organization) throw new NotFoundException('Organization not found');
    return organization;
  }

  async remove(id: string): Promise<void> {
    await this.proxy.remove(id);
  }
}
