import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
export declare class DatabaseSeeedService {
    private readonly configService;
    private readonly dataSource;
    private readonly logger;
    constructor(configService: ConfigService, dataSource: DataSource);
    runSeedsOnStartup(): Promise<void>;
}
