import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLogOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true, name: 'organization_id' })
  organizationId!: string | null;

  @Column({ type: 'uuid', nullable: true, name: 'actor_user_id' })
  actorUserId!: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true, name: 'actor_username' })
  actorUsername!: string | null;

  // @Column({ type: 'varchar', length: 160 })
  @Column({ type: 'text' })
  action!: string;

  @Column({ type: 'varchar', length: 10, name: 'http_method' })
  httpMethod!: string;

  @Column({ type: 'varchar', length: 255, name: 'http_path' })
  httpPath!: string;

  @Column({ type: 'int', name: 'status_code' })
  statusCode!: number;

  @Column({ type: 'int', name: 'duration_ms' })
  durationMs!: number;

  @Column({ type: 'varchar', length: 80, nullable: true, name: 'ip_address' })
  ipAddress!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'user_agent' })
  userAgent!: string | null;

  @Column({ type: 'simple-json', nullable: true })
  metadata!: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
