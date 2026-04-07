import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { ProductCategoryOrmEntity } from './entities';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([ProductCategoryOrmEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtAuthGuard, RolesGuard],
  exports: [CategoriesService],
})
export class CategoriesModule {}
