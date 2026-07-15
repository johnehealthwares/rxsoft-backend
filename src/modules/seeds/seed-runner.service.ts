import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { seedWarehouseAndStockLocation } from '../../database/seeds/5-seed-location_and-warehouse';
import { seedItemsTemplates } from '../../database/seeds/4-seed-item-template';
import { seedPriceTemplates } from '../../database/seeds/5-seed-price-template';
import { seedAccounting } from '../../database/seeds/7-seed-accounting';

@Injectable()
export class SeedRunnerService {
  private readonly logger = new Logger(SeedRunnerService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  private getApiKey(): string {
    return this.configService.get<string>('SEED_API_KEY', 'rxsoft-seed-key');
  }

  validateKey(key: string): boolean {
    return key === this.getApiKey();
  }

  async runAll(): Promise<{ success: boolean; results: string[] }> {
    const results: string[] = [];

    try {
      await seedWarehouseAndStockLocation(this.dataSource);
      results.push('Warehouse & stock location: OK');
      this.logger.log('Warehouse & stock location seeded');
    } catch (err) {
      const msg = `Warehouse & stock location: FAILED - ${err.message}`;
      results.push(msg);
      this.logger.error(msg);
    }

    try {
      await seedAccounting(this.dataSource);
      results.push('Accounting (GL accounts & journals): OK');
      this.logger.log('Accounting seeded');
    } catch (err) {
      const msg = `Accounting: FAILED - ${err.message}`;
      results.push(msg);
      this.logger.error(msg);
    }

    try {
      await seedItemsTemplates(this.dataSource);
      results.push('Items templates (Google Sheets): OK');
      this.logger.log('Items templates seeded');
    } catch (err) {
      const msg = `Items templates: FAILED - ${err.message}`;
      results.push(msg);
      this.logger.error(msg);
    }

    try {
      await seedPriceTemplates(this.dataSource);
      results.push('Price templates (Google Sheets): OK');
      this.logger.log('Price templates seeded');
    } catch (err) {
      const msg = `Price templates: FAILED - ${err.message}`;
      results.push(msg);
      this.logger.error(msg);
    }

    return { success: results.every((r) => r.includes('OK')), results };
  }
}
