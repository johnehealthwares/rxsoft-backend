import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ItemOrmEntity } from './item.orm-entity';
import { OrganizationOrmEntity } from '../../organizations/entities/organization.orm-entity';

@Entity('organisation_items')
@Unique('uq_org_item_org_item', ['organizationId', 'itemId'])
@Unique('uq_org_item_org_code', ['organizationId', 'orgItemCode'])
@Unique('uq_org_item_barcode', ['organizationId', 'barcode'])
export class OrganisationItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'text' })
  organizationId!: string;

  @ManyToOne(() => OrganizationOrmEntity, { nullable: false })
  @JoinColumn({ name: 'organization_id' })
  organization!: OrganizationOrmEntity;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId!: string;

  @ManyToOne(() => ItemOrmEntity, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item!: ItemOrmEntity;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  alias!: string | null;

  @Column({ name: 'org_item_code', type: 'text', nullable: true })
  orgItemCode!: string | null;

  @Column({ type: 'text', nullable: true })
  barcode!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
