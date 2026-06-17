import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
import { StockLocationOrmEntity } from '../../inventory/entities/stock-location.orm-entity';
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
    createdAt: Date;
    updatedAt: Date;
}
