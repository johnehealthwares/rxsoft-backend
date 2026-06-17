export interface UploadOptions {
    filename?: string;
    folder?: string;
    width?: number;
    height?: number;
    crop?: string;
}
export interface UploadResult {
    url: string;
    publicId: string;
    width?: number;
    height?: number;
    format?: string;
}
export interface ImageStoragePort {
    upload(file: Express.Multer.File, options?: UploadOptions): Promise<UploadResult>;
    delete(publicId: string): Promise<void>;
}
