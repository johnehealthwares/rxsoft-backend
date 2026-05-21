import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductOrmEntity } from '../../catalog/entities/product.orm-entity';
import { StockLocationOrmEntity } from '../../inventory/entities/stock-location.orm-entity';
import { PriceListOrmEntity } from './price-list.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('price_list_items')
export class PriceListItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => PriceListOrmEntity, (priceList) => priceList.items, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'price_list_id' })
  priceList!: PriceListOrmEntity;

  @ManyToOne(() => ProductOrmEntity, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product!: ProductOrmEntity;

  @Column({ name: 'currency_code', type: 'text', default: 'USD' })
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
