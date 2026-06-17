import { HttpService } from '@nestjs/axios';
import { ImportTarget } from '../types';
export declare class ApiImportTarget implements ImportTarget {
    private readonly http;
    private readonly baseUrl;
    constructor(http: HttpService, baseUrl: string);
    findAll(): Promise<any>;
    create(): {};
    save(entities: any[]): Promise<any>;
    getColumns(): Promise<never[]>;
}
