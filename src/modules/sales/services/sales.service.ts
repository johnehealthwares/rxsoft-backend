import { Inject, Injectable } from '@nestjs/common';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { SalesRepository } from '../repositories/sales.repository';
import { SALES_REPOSITORY } from './sales.di-tokens';

@Injectable()
export class SalesService {
  constructor(
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: SalesRepository,
  ) {}

  async list(query: ListQueryDto): Promise<{ data: Array<Record<string, unknown>>; total: number }> {
    const result = await this.salesRepository.list({
      organizationId: DEFAULT_ORGANIZATION_ID,
      offset: query.offset,
      limit: query.limit,
    });

    return {
      data: result.items.map((sale) => ({
        id: sale.id,
        saleNumber: sale.saleNumber,
        saleChannel: sale.saleChannel,
        status: sale.status,
        totalAmount: sale.totalAmount,
        paidAmount: sale.paidAmount,
        changeAmount: sale.changeAmount,
        saleDate: sale.saleDate,
      })),
      total: result.total,
    };
  }

  async listAll(): Promise<Array<{ saleDate: Date; totalAmount: number }>> {
    const result = await this.salesRepository.list({
      organizationId: DEFAULT_ORGANIZATION_ID,
      offset: 0,
      limit: 10000,
    });

    return result.items.map((sale) => ({
      saleDate: sale.saleDate,
      totalAmount: sale.totalAmount,
    }));
  }
}
