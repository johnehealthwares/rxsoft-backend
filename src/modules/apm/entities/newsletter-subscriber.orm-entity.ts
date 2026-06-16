import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('apm_newsletter_subscribers')
@Unique('uq_apm_newsletter_email', ['email'])
export class NewsletterSubscriberOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  email!: string;

  @Column({ type: 'text', nullable: true })
  phone!: string | null;

  @Column({ type: 'boolean', default: true })
  subscribed!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
