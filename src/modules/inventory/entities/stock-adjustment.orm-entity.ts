import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StockBalanceOrmEntity } from './stock-balance.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('stock_adjustments')
export class StockAdjustmentOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => StockBalanceOrmEntity, (stockBalance) => stockBalance.adjustments, {
    nullable: false,
  })
  @JoinColumn({ name: 'stock_balance_id' })
  stockBalance!: StockBalanceOrmEntity;

  @Column({ type: 'text' })
  reason!: string;

  @Column({ name: 'delta_quantity', type: 'decimal', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  deltaQuantity!: number;

  @Column({ name: 'performed_by_user_id', type: 'text' })
  performedByUserId!: string;

  @CreateDateColumn({ name: 'performed_at'/* timestamptzz */ })
  performedAt!: Date;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;
}
