import type { PriceListItemOrmEntity } from './price-list-item.orm-entity';
export declare class PriceListOrmEntity {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    isDefault: boolean;
    isActive: boolean;
    items: PriceListItemOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
