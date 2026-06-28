import { ListQueryDto } from '../../../shared/dto/list-query.dto';
export declare class ListStockLocationsDto extends ListQueryDto {
    warehouseId?: string;
    isActive?: boolean;
}
export declare class CreateStockLocationDto {
    warehouseId?: string;
    parentId?: string;
    code?: string;
    name: string;
    locationType?: 'internal' | 'supplier' | 'customer' | 'inventory' | 'scrap' | 'transit';
    isActive?: boolean;
    overrideCodeValidation?: boolean;
}
export declare class UpdateStockLocationDto {
    warehouseId?: string;
    parentId?: string;
    code?: string;
    name?: string;
    locationType?: 'internal' | 'supplier' | 'customer' | 'inventory' | 'scrap' | 'transit';
    isActive?: boolean;
}
export declare class AdjustStockByReferenceDto {
    itemId: string;
    locationId: string;
    lotId?: string;
    deltaQuantity: number;
    reason: string;
    uomId?: string;
    reorderMinQty?: number;
    reorderMaxQty?: number;
}
