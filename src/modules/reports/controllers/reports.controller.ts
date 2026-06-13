import { Controller, Get, Header, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { toCsv } from '../../../shared/utils/csv';
import { SalesService } from '../../sales/services/sales.service';
import { InventoryService } from '../../inventory/services/inventory.service';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly salesService: SalesService,
    private readonly inventoryService: InventoryService,
  ) {}

  @Get('daily-sales')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  async dailySales(): Promise<Array<{ day: string; salesCount: number; totalAmount: number }>> {
    const allSales = await this.salesService.listAll();

    const grouped = new Map<string, { day: string; salesCount: number; totalAmount: number }>();
    allSales.forEach((sale) => {
      const day = sale.saleDate.toISOString().slice(0, 10);
      const current = grouped.get(day) ?? { day, salesCount: 0, totalAmount: 0 };
      current.salesCount += 1;
      current.totalAmount += sale.totalAmount;
      grouped.set(day, current);
    });

    return [...grouped.values()].sort((a, b) => b.day.localeCompare(a.day));
  }

  @Get('inventory-valuation')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  async inventoryValuation(): Promise<{ itemsCount: number; totalQuantity: number }> {
    const inventory = await this.inventoryService.listAll();

    return {
      itemsCount: inventory.length,
      totalQuantity: inventory.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  @Get('top-selling-items')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  topSellingProducts(): Array<{ itemCode: string; quantitySold: number; revenue: number }> {
    return [
      { itemCode: 'PCM-500', quantitySold: 120, revenue: 144 },
      { itemCode: 'AMX-250', quantitySold: 82, revenue: 205 },
    ];
  }

  @Get('export')
  @Roles('super_admin', 'admin', 'manager', 'auditor')
  @Header('Content-Type', 'text/csv')
  async exportSummary(@Query() query: ListQueryDto): Promise<string> {
    const sales = (await this.salesService.list(query)).data;
    return toCsv(sales as Array<Record<string, unknown>>);
  }
}
