import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseSeeedService {
  async runSeedsOnStartup() {
    // Seeding is only available via POST /api/seeds/run?key=...
  }
}
