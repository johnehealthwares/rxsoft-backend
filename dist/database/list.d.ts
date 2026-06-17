import { SelectQueryBuilder } from 'typeorm';
export declare function applyFilters(qb: SelectQueryBuilder<any>, alias: string, filters: Record<string, any>): void;
export declare function applyFilter(qb: SelectQueryBuilder<any>, alias: string, field: string, type: string, value?: any, valueTo?: any): void;
