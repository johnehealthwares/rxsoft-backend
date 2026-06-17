import { Repository } from 'typeorm';
import { ImportTarget } from '../types';
export declare class RepositoryImportTarget implements ImportTarget {
    private readonly repository;
    constructor(repository: Repository<any>);
    findAll(): Promise<any[]>;
    create(): any;
    save(entities: any[]): Promise<any[]>;
    getColumns(): Promise<string[]>;
}
