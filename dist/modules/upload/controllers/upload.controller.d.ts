import type { ImageStoragePort } from '../services/image-storage.interface';
import { UploadImageResponseDto } from '../dto/upload.dto';
export declare class UploadController {
    private readonly storage;
    constructor(storage: ImageStoragePort);
    uploadImage(file: Express.Multer.File): Promise<UploadImageResponseDto>;
    deleteImage(publicId: string): Promise<void>;
}
