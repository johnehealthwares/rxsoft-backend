import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, Unique, UpdateDateColumn } from 'typeorm';
import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
import { StockLocationOrmEntity } from '../../inventory/entities/stock-location.orm-entity';
import { PartyOrmEntity } from '../../customers/entities/party.orm-entity';
import { PriceListOrmEntity } from '../../pricing/entities/price-list.orm-entity';

@Entity('user_pos_configs')
@Unique('uq_user_pos_configs_user', ['userId'])
export class UserPosConfigOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserOrmEntity, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: UserOrmEntity;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @ManyToOne(() => StockLocationOrmEntity, { nullable: true })
  @JoinColumn({ name: 'stock_location_id' })
  stockLocation!: StockLocationOrmEntity | null;

  @Column({ name: 'stock_location_id', type: 'uuid', nullable: true })
  stockLocationId!: string | null;

  @Column({ name: 'store_id', type: 'text', nullable: true })
  storeId!: string | null;
 
  @Column({ name: 'allow_a4_print', type: 'boolean', default: false })
  allowA4Print!: boolean;

  @Column({ name: 'allow_pos', type: 'boolean', default: true })
  allowPos!: boolean;

  @Column({ name: 'login_timeout_minutes', type: 'int', nullable: true })
  loginTimeoutMinutes!: number | null;

  @ManyToOne(() => PartyOrmEntity, { nullable: true })
  @JoinColumn({ name: 'default_customer_id' })
  defaultCustomer!: PartyOrmEntity | null;

  @RelationId((entity: UserPosConfigOrmEntity) => entity.defaultCustomer)
  defaultCustomerId!: string | null;

  @ManyToOne(() => PriceListOrmEntity, { nullable: true })
  @JoinColumn({ name: 'default_price_list_id' })
  defaultPriceList!: PriceListOrmEntity | null;

  @RelationId((entity: UserPosConfigOrmEntity) => entity.defaultPriceList)
  defaultPriceListId!: string | null;

  @Column({ name: 'auto_select_location', type: 'boolean', default: true })
  autoSelectLocation!: boolean;

  @Column({ name: 'auto_select_customer', type: 'boolean', default: true })
  autoSelectCustomer!: boolean;

  @Column({ name: 'auto_select_price_list', type: 'boolean', default: true })
  autoSelectPriceList!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
