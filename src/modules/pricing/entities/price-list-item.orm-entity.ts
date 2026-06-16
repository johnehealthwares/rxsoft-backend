import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ItemOrmEntity } from '../../catalog/entities/item.orm-entity';
import { StockLocationOrmEntity } from '../../inventory/entities/stock-location.orm-entity';
import { PriceListOrmEntity } from './price-list.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('price_list_items')
@Unique('UQ_PRICE_LIST_ITEM', ['priceList', 'item'])
export class PriceListItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => PriceListOrmEntity, (priceList) => priceList.items, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'price_list_id' })
  priceList!: PriceListOrmEntity;

  @ManyToOne(() => ItemOrmEntity, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item!: ItemOrmEntity;

  @Column({ name: 'currency_code', type: 'text', default: 'NGN' })
  currencyCode!: string;

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  unitPrice!: number;

  @Column({ name: 'starts_at', nullable: true })
  startsAt?: Date;

  @Column({ name: 'ends_at', nullable: true })
  endsAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
