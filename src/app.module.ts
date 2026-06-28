import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityModule } from './modules/identity/identity.module';
import { HealthController } from './modules/health/controllers/health.controller';
import { CatalogModule } from './modules/catalog/catalog.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ReceivablesModule } from './modules/receivables/receivables.module';
import { SalesModule } from './modules/sales/sales.module';
import { CacheModule } from './common/cache/cache.module';
import { AuditModule } from './common/audit/audit.module';
import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { DatabaseSeeedService } from './database/seeding.service';
import { AuditModule as AdminAuditModule } from './modules/audit/audit.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CustomersModule } from './modules/customers/customers.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ManufacturersModule } from './modules/manufacturers/manufacturers.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { UserPosConfigModule } from './modules/user-pos-config/user-pos-config.module';
import { OrganisationConfigModule } from './modules/organisation-config/organisation-config.module';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { WebsiteModule } from './modules/website/website.module';
import { ApmModule } from './modules/apm/apm.module';
import { UploadModule } from './modules/upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
 
const appConfigService = new ConfigService();

export const databaseConfig = {
  type: appConfigService.get<'postgres' | 'sqlite' | 'sqljs'>('DB_TYPE', 'postgres'),
  host: appConfigService.get<string>('DB_HOST', 'localhost'),
  port: Number(appConfigService.get<string>('DB_PORT', '5432')),
  username: appConfigService.get<string>('DB_USER', 'postgres'),
  password: appConfigService.get<string>('DB_PASSWORD', 'postgres'),
  database: appConfigService.get<string>('DB_NAME', 'rxsoft'),
  synchronize: appConfigService.get<string>('DB_SYNCHRONIZE', 'false') === 'true',
  dropSchema: appConfigService.get<string>('DB_DROP_SCHEMA', 'false') === 'true',
  logging: appConfigService.get<string>('TYPEORM_LOGGING', 'false') === 'true',
};

const useInMemoryRepos = appConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const useMongoDb = appConfigService.get<string>('USE_MONGODB', 'false') === 'true';
const infrastructureImports = useInMemoryRepos
  ? []
  : [
      ...(useMongoDb
        ? [
            MongooseModule.forRootAsync({
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/apm-campaign'),
              }),
            }),
          ]
        : []),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
          const type = configService.get<'postgres' | 'sqlite' | 'sqljs'>('DB_TYPE', 'postgres');
          const database = configService.get<string>('DB_NAME', 'rxsoft');
          const synchronize = configService.get<string>('DB_SYNCHRONIZE', 'false') === 'true';
          const dropSchema = configService.get<string>('DB_DROP_SCHEMA', 'false') === 'true';
          const host = configService.get<string>('DB_HOST', 'localhost');
          const port = Number(configService.get<string>('DB_PORT', '5432'));
          const username = configService.get<string>('DB_USER', 'postgres');
          const password = configService.get<string>('DB_PASSWORD', 'postgres');

          return {
            type,
            host,
            port,
            username,
            password,
            database:
              type === 'sqljs'
                ? undefined
                : type === 'sqlite'
                  ? database
                  : database,
            location: type === 'sqljs' ? 'rxsoft' : undefined,
            autoSave: type === 'sqljs' ? false : undefined,
            autoLoadEntities: true,
            synchronize,
            dropSchema,
            logging: configService.get<string>('TYPEORM_LOGGING') === 'true',
          } as TypeOrmModuleOptions;
        },
      }),
    ];

const applicationModules = useInMemoryRepos
  ? [IdentityModule, CatalogModule, InventoryModule, SalesModule, ReceivablesModule, ReportsModule, UploadModule]
  : [
      IdentityModule,
      CatalogModule,
      CategoriesModule,
      CustomersModule,
      InventoryModule,
      SalesModule,
      ReceivablesModule,
      PurchasesModule,
      PricingModule,
      OrganizationsModule,
      ManufacturersModule,
      AccountingModule,
      ReportsModule,
      AdminAuditModule,
      WebsiteModule,
      ApmModule.forRoot(),
      UploadModule,
      UserPosConfigModule,
      OrganisationConfigModule,
      WarehousesModule,
    ];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available everywhere
    }),
    ...infrastructureImports,
     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // or 'public'
    }),
    CacheModule,
    AuditModule,
    ...applicationModules,
  ],
  controllers: [HealthController],
  providers: [
    DatabaseSeeedService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}
