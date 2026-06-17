import { DataSource } from 'typeorm';
export declare class SchemaEvolverService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    ensureColumns(table: string, rows: Record<string, any>[], systemColumns?: string[]): Promise<void>;
    private getColumns;
}
