import { DataSource } from 'typeorm';
import { ImportTarget } from '../types';
export declare class DatabaseImportTarget implements ImportTarget {
    private readonly dataSource;
    private readonly tableName;
    constructor(dataSource: DataSource, tableName: string);
    findAll(): Promise<any>;
    create(): {};
    save(entities: any[]): Promise<any[]>;
    getColumns(): Promise<any>;
}
