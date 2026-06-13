import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('audit_logs')
export class AuditLogOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId!: string;

  @Column({ name: 'actor_user_id', type: 'uuid', nullable: true })
  actorUserId!: string | null;

  @Column({ type: 'text' })
  action!: string;

  @Column({ type: 'text' })
  resource!: string;

  @Column({ name: 'resource_id', type: 'uuid', nullable: true })
  resourceId!: string | null;

  @Column({ name: 'details', type: 'simple-json', nullable: true })
  details!: Record<string, unknown> | null;

  @Column({ name: 'occurred_at' })
  occurredAt!: Date;
}
