import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CanvassingSessionOrmEntity } from './canvassing-session.orm-entity';

@Entity('apm_canvassing_visits')
export class CanvassingVisitOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'session_id', type: 'text' })
  sessionId!: string;

  @ManyToOne(() => CanvassingSessionOrmEntity, (s) => s.visits)
  @JoinColumn({ name: 'session_id' })
  session!: CanvassingSessionOrmEntity;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  phone!: string | null;

  @Column({ type: 'text', nullable: true })
  address!: string | null;

  @Column({ type: 'text', nullable: true })
  supportLevel!: string | null;

  @Column({ type: 'text', nullable: true })
  issues!: string | null;

  @Column({ type: 'text', nullable: true })
  outcome!: string | null;

  @Column({ name: 'contacted_at', type: 'timestamp', nullable: true })
  contactedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
