import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('organisation_configs')
@Unique('uq_organisation_configs_org', ['organizationId'])
export class OrganisationConfigOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'pos_header', type: 'text', nullable: true })
  posHeader!: string | null;

  @Column({ name: 'default_login_timeout_minutes', type: 'int', default: 480 })
  defaultLoginTimeoutMinutes!: number;

  @Column({ name: 'default_allow_pos', type: 'boolean', default: true })
  defaultAllowPos!: boolean;

  @Column({ name: 'default_allow_a4_print', type: 'boolean', default: false })
  defaultAllowA4Print!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}