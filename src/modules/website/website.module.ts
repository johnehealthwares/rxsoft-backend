import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { IdentityModule } from '../identity/identity.module';
import { ServicesModule } from '../../services/services.module';
import { ItemOrmEntity } from '../../modules/catalog/entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../../modules/catalog/entities/item-category.orm-entity';
import { SaleOrmEntity, SaleLineOrmEntity } from '../../modules/sales/entities';
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
import {
  StockBalanceOrmEntity,
  StockAdjustmentOrmEntity,
  StoreStockLocationOrmEntity,
} from '../inventory/entities';
import { WebsiteController } from './controllers/website.controller';
import { WebsiteAuthController } from './controllers/website-auth.controller';
import { WebsiteAdminController } from './controllers/website-admin.controller';
import { WebsiteService } from './services/website.service';
import { OptionalAuthGuard } from './guards/optional-auth.guard';

@Module({
  imports: [
    IdentityModule,
    ServicesModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      ItemOrmEntity,
      ItemCategoryOrmEntity,
      SaleOrmEntity,
      SaleLineOrmEntity,
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
      OrderOrmEntity,
      OrderItemOrmEntity,
      DeliveryOrmEntity,
      StockBalanceOrmEntity,
      StockAdjustmentOrmEntity,
      StoreStockLocationOrmEntity,
    ]),
  ],
  controllers: [WebsiteController, WebsiteAuthController, WebsiteAdminController],
  providers: [WebsiteService, JwtAuthGuard, RolesGuard, OptionalAuthGuard],
  exports: [WebsiteService],
})
export class WebsiteModule {}
