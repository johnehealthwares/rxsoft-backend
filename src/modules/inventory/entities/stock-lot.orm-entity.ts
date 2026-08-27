import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import type { StockBalanceOrmEntity } from './stock-balance.orm-entity';

@Entity('stock_lots')
@Unique('uq_stock_lots_org_code', ['organizationId', 'code'])
export class StockLotOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ type: 'text' })
  code!: string;

  @OneToMany('StockBalanceOrmEntity', 'lot')
  stockBalances!: StockBalanceOrmEntity[];

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
