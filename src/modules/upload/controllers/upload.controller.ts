import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { IMAGE_STORAGE } from '../services/upload.di-tokens';
import type { ImageStoragePort } from '../services/image-storage.interface';
import { UploadImageResponseDto } from '../dto/upload.dto';

@Controller('upload')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UploadController {
  constructor(@Inject(IMAGE_STORAGE) private readonly storage: ImageStoragePort) {}

  @Post('image')
  @Roles('admin', 'super_admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<UploadImageResponseDto> {
    const result = await this.storage.upload(file);
    return { url: result.url };
  }

  @Delete('image')
  @Roles('admin', 'super_admin')
  async deleteImage(@Body('publicId') publicId: string): Promise<void> {
    await this.storage.delete(publicId);
  }
}
