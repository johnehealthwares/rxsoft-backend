import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { PriceListOrmEntity } from './price-list.orm-entity';
export declare class PriceListItemOrmEntity {
    id: string;
    priceList: PriceListOrmEntity;
    item: ItemOrmEntity;
    currencyCode: string;
    unitPrice: number;
    startsAt?: Date;
    endsAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
