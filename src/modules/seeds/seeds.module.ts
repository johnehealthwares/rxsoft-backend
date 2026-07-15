import { Module } from '@nestjs/common';
import { SeedsController } from './seeds.controller';
import { SeedRunnerService } from './seed-runner.service';

@Module({
  controllers: [SeedsController],
  providers: [SeedRunnerService],
  exports: [SeedRunnerService],
})
export class SeedsModule {}
