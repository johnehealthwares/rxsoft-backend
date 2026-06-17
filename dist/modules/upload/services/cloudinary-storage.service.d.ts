import { ConfigService } from '@nestjs/config';
import type { ImageStoragePort, UploadOptions, UploadResult } from './image-storage.interface';
export declare class CloudinaryStorageService implements ImageStoragePort {
    private config;
    constructor(config: ConfigService);
    upload(file: Express.Multer.File, options?: UploadOptions): Promise<UploadResult>;
    delete(publicId: string): Promise<void>;
}
