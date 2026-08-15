import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseFeatureModels } from './schemas';
import { EhealthwaresController } from './controllers/ehealthwares.controller';
import { EhealthwaresAdminController } from './controllers/ehealthwares-admin.controller';
import { EhealthwaresService } from './services/ehealthwares.service';
import { EhealthwaresAdminService } from './services/ehealthwares-admin.service';
import { EhealthwaresSeedService } from './seed/ehealthwares.seed';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({})
export class EhealthwaresModule {
  static forRoot(): DynamicModule {
    const useMongoDb = process.env.USE_MONGODB === 'true';

    if (useMongoDb) {
      return {
        module: EhealthwaresModule,
        imports: [
          MongooseModule.forFeature(mongooseFeatureModels),
          JwtModule.register({}),
        ],
        controllers: [EhealthwaresController, EhealthwaresAdminController],
        providers: [
          EhealthwaresService,
          EhealthwaresAdminService,
          EhealthwaresSeedService,
          JwtAuthGuard,
          RolesGuard,
        ],
      };
    }

    return {
      module: EhealthwaresModule,
      controllers: [],
      providers: [],
    };
  }
}
