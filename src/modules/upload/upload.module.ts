import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UploadController } from './controllers/upload.controller';
import { IMAGE_STORAGE } from './services/upload.di-tokens';
import { CloudinaryStorageService } from './services/cloudinary-storage.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UploadController],
  providers: [
    { provide: IMAGE_STORAGE, useClass: CloudinaryStorageService },
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [IMAGE_STORAGE],
})
export class UploadModule {}
