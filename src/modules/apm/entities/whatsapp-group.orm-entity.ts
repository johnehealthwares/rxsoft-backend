import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('apm_whatsapp_groups')
export class WhatsAppGroupOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  level!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'parent_id', type: 'text', nullable: true })
  parentId!: string | null;

  @ManyToOne(() => WhatsAppGroupOrmEntity, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent!: WhatsAppGroupOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'group_link', type: 'text', nullable: true })
  groupLink!: string | null;

  @Column({ name: 'admin_name', type: 'text', nullable: true })
  adminName!: string | null;

  @Column({ name: 'admin_phone', type: 'text', nullable: true })
  adminPhone!: string | null;

  @Column({ name: 'member_count', type: 'int', default: 0 })
  memberCount!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
