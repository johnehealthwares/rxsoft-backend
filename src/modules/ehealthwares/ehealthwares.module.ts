import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseFeatureModels } from './schemas';
import { EhealthwaresController } from './controllers/ehealthwares.controller';
import { EhealthwaresService } from './services/ehealthwares.service';
import { EhealthwaresSeedService } from './seed/ehealthwares.seed';

@Module({})
export class EhealthwaresModule {
  static forRoot(): DynamicModule {
    const useMongoDb = process.env.USE_MONGODB === 'true';

    if (useMongoDb) {
      return {
        module: EhealthwaresModule,
        imports: [
          MongooseModule.forFeature(mongooseFeatureModels),
        ],
        controllers: [EhealthwaresController],
        providers: [EhealthwaresService, EhealthwaresSeedService],
      };
    }

    return {
      module: EhealthwaresModule,
      controllers: [],
      providers: [],
    };
  }
}
