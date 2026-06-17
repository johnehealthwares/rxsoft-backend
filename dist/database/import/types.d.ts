export interface ValidationError {
    rowNumber: number;
    column?: string;
    code: string;
    message: string;
}
export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}
export interface ImportReport {
    sheet: string;
    processed: number;
    success: number;
    failed: number;
    errors: string[];
}
export interface RowSyncResult {
    rowNumber: number;
    uuid?: string;
    code?: string;
    status: 'SUCCESS' | 'ERROR';
    message?: string;
}
export interface ImportTarget {
    findAll(): Promise<any[]>;
    create(): any;
    save(entities: any[]): Promise<any[]>;
    getColumns(): Promise<string[]>;
}
export interface ImportEntityConfig {
    eav?: string[];
    ignoreColumns?: string[];
    strictColumns?: string[];
    mode: SyncMode;
    softDeleteField: string;
}
export interface ImportEntityMetadata {
    entity: string;
    repository: any;
    config: ImportEntityConfig;
}
export interface EntityCache<T = any> {
    byUuid: Map<string, T>;
    byCode: Map<string, T>;
}
export declare enum SyncMode {
    INSERT_ONLY = 0,
    UPDATE_ONLY = 1,
    UPSERT = 2,
    FULL_SYNC = 3
}
export declare class ImportContext {
    caches: Map<string, EntityCache<any>>;
    results: RowSyncResult[];
}
export interface RowSyncResult {
    rowNumber: number;
    uuid?: string;
    code?: string;
    sheet: string;
    status: 'SUCCESS' | 'ERROR';
    message?: string;
}
export interface ImportReport {
    sheet: string;
    processed: number;
    success: number;
    failed: number;
    errors: string[];
}
