import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ItemOrmEntity } from './item.orm-entity';

@Entity('organisation_items')
@Unique('uq_org_item_org_item', ['organizationId', 'itemId'])
@Index('uq_org_item_org_barcode', ['organizationId', 'barcode'], {
  unique: true,
  where: 'barcode IS NOT NULL',
})
export class OrganisationItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId!: string;

  @ManyToOne(() => ItemOrmEntity, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item!: ItemOrmEntity;

  // true = explicit whitelist, false = explicit blacklist. Absence of a row = not decided (default).
  @Column({ name: 'is_active', type: 'boolean' })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  alias!: string | null;

  @Column({ type: 'text', nullable: true })
  code!: string | null;

  @Column({ type: 'text', nullable: true })
  barcode!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
