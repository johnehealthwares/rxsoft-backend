import { ForeignProperty } from '../dto/item-response.dto';
import { ItemCategory } from './item-category.entity';

export type ItemVisibility = 'default' | 'whitelisted' | 'blacklisted';

export class Item {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly genericProductCode: string | null,
    public readonly categoryId: string,
    public readonly category: ItemCategory,
    public readonly baseUomId: string,
    public readonly purchaseUomId: string | null,
    public readonly saleUomId: string | null,
    public readonly baseUom: ForeignProperty | null,
    public readonly purchaseUom: ForeignProperty | null,
    public readonly saleUom: ForeignProperty | null,
    public readonly trackLot: boolean,
    public readonly trackExpiry: boolean,
    public readonly shelfLifeDays: number | null,
    public readonly imageUrl: string | null = null,
    public readonly smallImageUrl: string | null = null,
    public readonly mediumImageUrl: string | null = null,
    public readonly largeImageUrl: string | null = null,
    // Per-org overlay (populated when queried for an organization)
    public readonly code: string | null = null,
    public readonly barcode: string | null = null,
    public readonly alias: string | null = null,
    public readonly visibility: ItemVisibility = 'default',
  ) {}

  get displayName(): string {
    return this.alias ?? this.name;
  }
}
