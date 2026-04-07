import { Injectable, Logger, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { seedRoles } from './seeds/1-seed-roles';
import { seedUsers } from './seeds/2-seed-users';
import { runSeeds } from './seeds/run';

@Injectable()
export class DatabaseSeeedService {
  private readonly logger = new Logger(DatabaseSeeedService.name);

  constructor(
    private readonly configService: ConfigService,
    @Optional() private readonly dataSource?: DataSource,
  ) {}

  async runSeedsOnStartup() {
    const useInMemoryRepos = this.configService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
    const shouldSeed = this.configService.get<string>('SEED_ON_START', 'false') === 'true';
    if (!shouldSeed) {
      return;
    }

    if (useInMemoryRepos) {
      this.logger.warn(
        'SEED_ON_START=true but USE_IN_MEMORY_REPOS=true. Seeding requires TypeORM; set USE_IN_MEMORY_REPOS=false.',
      );
      return;
    }

    if (!this.dataSource) {
      this.logger.error(
        'SEED_ON_START=true but DataSource was not injected. Ensure TypeOrmModule.forRoot(...) is enabled.',
      );
      return;
    }

    await this.runSeeds();
  }

  async runSeeds() {
    if (!this.dataSource) {
      this.logger.warn('DataSource not available, skipping seeds');
      return;
    }

    try {
      this.logger.log('Starting database seeds on app startup...');
      await runSeeds(this.dataSource);
      this.logger.log('Database seeds completed successfully!');
    } catch (error) {
      this.logger.error('Error running seeds:', error);
      throw error;
    }
  }
}
