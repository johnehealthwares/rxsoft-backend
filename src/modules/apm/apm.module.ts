import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  CampaignInfoOrmEntity,
  AgendaItemOrmEntity,
  AchievementOrmEntity,
  NewsArticleOrmEntity,
  EventOrmEntity,
  EventRegistrationOrmEntity,
  VolunteerOrmEntity,
  SupporterOrmEntity,
  TestimonialOrmEntity,
  MediaAssetOrmEntity,
  ContactSubmissionOrmEntity,
  NewsletterSubscriberOrmEntity,
  CitizenFeedbackOrmEntity,
  IssueReportOrmEntity,
  DonationOrmEntity,
  LgaOrmEntity,
  WardOrmEntity,
  PollingUnitOrmEntity,
  StakeholderOrmEntity,
  ConversionScoreOrmEntity,
  ConversionActivityOrmEntity,
  WhatsAppGroupOrmEntity,
  CanvassingSessionOrmEntity,
  CanvassingVisitOrmEntity,
  VolunteerAssignmentOrmEntity,
  CandidateTourOrmEntity,
  ContentAssetOrmEntity,
  ListeningMentionOrmEntity,
  RapidResponseOrmEntity,
  PollingAgentOrmEntity,
  ResultEntryOrmEntity,
  IncidentReportOrmEntity,
  GotvRecordOrmEntity,
} from './entities';
import { ApmController } from './controllers/apm.controller';
import { ApmAdminController } from './controllers/apm-admin.controller';
import {
  ApmConversionController,
  ApmStakeholderController,
  ApmWhatsAppController,
} from './controllers/apm-conversion.controller';
import { ApmDataController } from './controllers/apm-data.controller';
import {
  ApmCanvassingController,
  ApmVolunteerAssignmentController,
  ApmSentimentController,
} from './controllers/apm-canvassing.controller';
import {
  ApmTourController,
  ApmContentController,
  ApmListeningController,
  ApmTruthDeskController,
} from './controllers/apm-intelligence.controller';
import {
  ApmAgentController,
  ApmResultController,
  ApmIncidentController,
  ApmGotvController,
} from './controllers/apm-election.controller';
import { ApmService } from './services/apm.service';
import { ApmConversionService } from './services/apm-conversion.service';
import { ApmCanvassingService } from './services/apm-canvassing.service';
import { ApmIntelligenceService } from './services/apm-intelligence.service';
import { ApmElectionService } from './services/apm-election.service';
import { ApmSeedService } from './seed/apm.seed';
import {
  ApmMongoService,
  ApmConversionMongoService,
  ApmCanvassingMongoService,
  ApmIntelligenceMongoService,
  ApmElectionMongoService,
} from './services/mongo';
import { ApmMongoSeedService } from './seed/apm-mongo.seed';
import { mongooseFeatureModels } from './schemas';

const controllers = [
  ApmController, ApmAdminController,
  ApmConversionController, ApmStakeholderController, ApmWhatsAppController,
  ApmDataController,
  ApmCanvassingController, ApmVolunteerAssignmentController, ApmSentimentController,
  ApmTourController, ApmContentController, ApmListeningController, ApmTruthDeskController,
  ApmAgentController, ApmResultController, ApmIncidentController, ApmGotvController,
];

@Module({})
export class ApmModule {
  static forRoot(): DynamicModule {
    const useMongoDb = process.env.USE_MONGODB === 'true';

    if (useMongoDb) {
      return {
        module: ApmModule,
        imports: [
          JwtModule.register({}),
          MongooseModule.forFeature(mongooseFeatureModels),
        ],
        controllers,
        providers: [
          ApmMongoService,
          ApmConversionMongoService,
          ApmCanvassingMongoService,
          ApmIntelligenceMongoService,
          ApmElectionMongoService,
          ApmMongoSeedService,
          { provide: ApmService, useExisting: ApmMongoService },
          { provide: ApmConversionService, useExisting: ApmConversionMongoService },
          { provide: ApmCanvassingService, useExisting: ApmCanvassingMongoService },
          { provide: ApmIntelligenceService, useExisting: ApmIntelligenceMongoService },
          { provide: ApmElectionService, useExisting: ApmElectionMongoService },
          JwtAuthGuard,
          RolesGuard,
        ],
        exports: [
          ApmService, ApmConversionService, ApmCanvassingService,
        ],
      };
    }

    return {
      module: ApmModule,
      imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([
          CampaignInfoOrmEntity, AgendaItemOrmEntity, AchievementOrmEntity,
          NewsArticleOrmEntity, EventOrmEntity, EventRegistrationOrmEntity,
          VolunteerOrmEntity, SupporterOrmEntity, TestimonialOrmEntity,
          MediaAssetOrmEntity, ContactSubmissionOrmEntity, NewsletterSubscriberOrmEntity,
          CitizenFeedbackOrmEntity, IssueReportOrmEntity, DonationOrmEntity,
          LgaOrmEntity, WardOrmEntity, PollingUnitOrmEntity, StakeholderOrmEntity,
          ConversionScoreOrmEntity, ConversionActivityOrmEntity, WhatsAppGroupOrmEntity,
          CanvassingSessionOrmEntity, CanvassingVisitOrmEntity, VolunteerAssignmentOrmEntity,
          CandidateTourOrmEntity, ContentAssetOrmEntity, ListeningMentionOrmEntity,
          RapidResponseOrmEntity, PollingAgentOrmEntity, ResultEntryOrmEntity,
          IncidentReportOrmEntity, GotvRecordOrmEntity,
        ]),
      ],
      controllers,
      providers: [
        ApmService, ApmConversionService, ApmCanvassingService,
        ApmIntelligenceService, ApmElectionService,
        ApmSeedService,
        JwtAuthGuard, RolesGuard,
      ],
      exports: [
        ApmService, ApmConversionService, ApmCanvassingService,
      ],
    };
  }
}
