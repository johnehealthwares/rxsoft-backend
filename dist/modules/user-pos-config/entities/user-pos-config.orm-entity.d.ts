import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
import { StockLocationOrmEntity } from '../../inventory/entities/stock-location.orm-entity';
import { PartyOrmEntity } from '../../customers/entities/party.orm-entity';
import { PriceListOrmEntity } from '../../pricing/entities/price-list.orm-entity';
export declare class UserPosConfigOrmEntity {
    id: string;
    user: UserOrmEntity;
    userId: string;
    organizationId: string;
    stockLocation: StockLocationOrmEntity | null;
    stockLocationId: string | null;
    storeId: string | null;
    allowA4Print: boolean;
    allowPos: boolean;
    loginTimeoutMinutes: number | null;
    defaultCustomer: PartyOrmEntity | null;
    defaultCustomerId: string | null;
    defaultPriceList: PriceListOrmEntity | null;
    defaultPriceListId: string | null;
    autoSelectLocation: boolean;
    autoSelectCustomer: boolean;
    autoSelectPriceList: boolean;
    createdAt: Date;
    updatedAt: Date;
}
