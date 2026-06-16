import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
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
} from './entities';
import { ApmController } from './controllers/apm.controller';
import { ApmAdminController } from './controllers/apm-admin.controller';
import { ApmService } from './services/apm.service';
import { ApmSeedService } from './seed/apm.seed';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
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
    ]),
  ],
  controllers: [ApmController, ApmAdminController],
  providers: [ApmService, ApmSeedService, JwtAuthGuard, RolesGuard],
  exports: [ApmService],
})
export class ApmModule implements OnModuleInit {
  constructor(private readonly seedService: ApmSeedService) {}

  async onModuleInit() {
    await this.seedService.seed();
  }
}
