import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductOrmEntity } from '../../catalog/entities/product.orm-entity';
import { StockLotOrmEntity } from '../../inventory/entities/stock-lot.orm-entity';
import { SaleOrmEntity } from './sale.orm-entity';
import { UomOrmEntity } from './uom.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('sale_lines')
// Atomic sold item row tied to one sale header.
export class SaleLineOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => SaleOrmEntity, (sale) => sale.lines, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale!: SaleOrmEntity;

  @Column({ name: 'line_number', type: 'int' })
  lineNumber!: number;

  @ManyToOne(() => ProductOrmEntity, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product!: ProductOrmEntity;

  @ManyToOne(() => StockLotOrmEntity, { nullable: true })
  @JoinColumn({ name: 'lot_id' })
  lot!: StockLotOrmEntity | null;

  @ManyToOne(() => UomOrmEntity, { nullable: false })
  @JoinColumn({ name: 'uom_id' })
  uom!: UomOrmEntity;

  @Column({ type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  quantity!: number;

  @Column({ name: 'unit_price', type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  unitPrice!: number;

  @Column({ name: 'discount_percent', type: 'float', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  discountPercent!: number;

  @Column({ name: 'tax_percent', type: 'float', default: 0, precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  taxPercent!: number;

  @Column({ name: 'line_subtotal', type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  lineSubtotal!: number;

  @Column({ name: 'line_total', type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  lineTotal!: number;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
