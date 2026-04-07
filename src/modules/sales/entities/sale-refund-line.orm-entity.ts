import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SaleLineOrmEntity } from './sale-line.orm-entity';
import { SaleRefundOrmEntity } from './sale-refund.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('sale_refund_lines')
// Refunded quantity per original sale line.
export class SaleRefundLineOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => SaleRefundOrmEntity, (refund) => refund.lines, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'refund_id' })
  refund!: SaleRefundOrmEntity;

  @ManyToOne(() => SaleLineOrmEntity, { nullable: false })
  @JoinColumn({ name: 'sale_line_id' })
  saleLine!: SaleLineOrmEntity;

  @Column({ type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  quantity!: number;

  @Column({ name: 'unit_price', type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  unitPrice!: number;

  @Column({ name: 'line_total', type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  lineTotal!: number;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
