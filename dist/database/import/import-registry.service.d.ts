import { ImportTarget } from './types';
export declare class ImportRegistryService {
    private readonly targets;
    registerTarget(entity: string, target: ImportTarget): void;
    getTarget(entity: string): ImportTarget;
    hasTarget(entity: string): boolean;
}
