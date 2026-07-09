import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseSeeedService {
  private readonly logger = new Logger(DatabaseSeeedService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  async runSeedsOnStartup() {
    const shouldSeed = this.configService.get<string>('SEED_ON_START', 'false') === 'true';
    if (!shouldSeed) return;

    this.logger.log('No seeds configured for rxsoft-backend (identity data seeded by rxsoft-identity)');
  }
}
