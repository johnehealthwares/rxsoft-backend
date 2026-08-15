import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ServicesModule } from '../../services/services.module';
import { UsersProxyModule } from '../users-proxy/users-proxy.module';
import { OrdersModule } from '../orders/orders.module';
import { PricingModule } from '../pricing/pricing.module';
import { ItemOrmEntity } from '../../modules/catalog/entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../../modules/catalog/entities/item-category.orm-entity';
import { PartyOrmEntity } from '../../modules/customers/entities/party.orm-entity';
import {
  HealthConcernOrmEntity,
  PrescriptionOrmEntity,
  PrescriptionFileOrmEntity,
  ConsultationOrmEntity,
  TestimonialOrmEntity,
  BlogArticleOrmEntity,
  DeliveryAreaOrmEntity,
  BranchOrmEntity,
  ContactSubmissionOrmEntity,
  NewsletterSubscriberOrmEntity,
  ProductReviewOrmEntity,
  RewardTransactionOrmEntity,
  OrderOrmEntity,
  OrderItemOrmEntity,
  DeliveryOrmEntity,
} from './entities';
import { WebsiteController } from './controllers/website.controller';
import { WebsiteAuthController } from './controllers/website-auth.controller';
import { WebsiteAdminController } from './controllers/website-admin.controller';
import { WebsiteService } from './services/website.service';
import { OptionalAuthGuard } from './guards/optional-auth.guard';

@Module({
  imports: [
    OrdersModule,
    PricingModule,
    ServicesModule,
    UsersProxyModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      ItemOrmEntity,
      ItemCategoryOrmEntity,
      PartyOrmEntity,
      HealthConcernOrmEntity,
      PrescriptionOrmEntity,
      PrescriptionFileOrmEntity,
      ConsultationOrmEntity,
      TestimonialOrmEntity,
      BlogArticleOrmEntity,
      DeliveryAreaOrmEntity,
      BranchOrmEntity,
      ContactSubmissionOrmEntity,
      NewsletterSubscriberOrmEntity,
      ProductReviewOrmEntity,
      RewardTransactionOrmEntity,
    ]),
  ],
  controllers: [WebsiteController, WebsiteAuthController, WebsiteAdminController],
  providers: [WebsiteService, JwtAuthGuard, RolesGuard, OptionalAuthGuard],
  exports: [WebsiteService],
})
export class WebsiteModule {}
