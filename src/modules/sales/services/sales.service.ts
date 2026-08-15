import { Inject, Injectable } from '@nestjs/common';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import type { SalesRepository } from '../repositories/sales.repository';
import { SALES_REPOSITORY } from './sales.di-tokens';

@Injectable()
export class SalesService {
  constructor(
    @Inject(SALES_REPOSITORY)
    private readonly salesRepository: SalesRepository,
  ) {}

  async list(organizationId: string, query: ListQueryDto): Promise<{ data: Array<Record<string, unknown>>; total: number }> {
    const result = await this.salesRepository.list({
      organizationId,
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

  async listAll(organizationId: string): Promise<Array<{ saleDate: Date; totalAmount: number }>> {
    const result = await this.salesRepository.list({
      organizationId,
      offset: 0,
      limit: 10000,
    });

    return result.items.map((sale) => ({
      saleDate: sale.saleDate,
      totalAmount: sale.totalAmount,
    }));
  }
}
