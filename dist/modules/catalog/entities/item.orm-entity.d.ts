import { ItemCategoryOrmEntity } from './item-category.orm-entity';
import { UomOrmEntity } from '../../sales/entities/uom.orm-entity';
export declare class ItemOrmEntity {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    category: ItemCategoryOrmEntity;
    genericProductCode: string | null;
    baseUomId: string;
    baseUom: UomOrmEntity;
    purchaseUomId: string | null;
    purchaseUom: UomOrmEntity | null;
    saleUomId: string | null;
    saleUom: UomOrmEntity | null;
    barcode: string | null;
    trackLot: boolean;
    trackExpiry: boolean;
    shelfLifeDays: number | null;
    isActive: boolean;
    imageUrl: string | null;
    smallImageUrl: string | null;
    mediumImageUrl: string | null;
    largeImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
