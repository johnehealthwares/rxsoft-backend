export declare class AttributeSyncService {
    private readonly attributeRepo;
    private readonly valueRepo;
    constructor(attributeRepo: any, valueRepo: any);
    sync(entityType: string, entities: any[], rows: Record<string, any>[], config: any): Promise<void>;
}
