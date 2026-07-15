import { Controller, ForbiddenException, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SeedRunnerService } from './seed-runner.service';

@ApiTags('seeds')
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedRunner: SeedRunnerService) {}

  @Post('run')
  @ApiOperation({ summary: 'Run all database seeds (requires key query param)' })
  @ApiQuery({ name: 'key', required: true, type: String })
  async run(@Query('key') key: string) {
    if (!key || !this.seedRunner.validateKey(key)) {
      throw new ForbiddenException('Invalid seed key');
    }

    return this.seedRunner.runAll();
  }
}
