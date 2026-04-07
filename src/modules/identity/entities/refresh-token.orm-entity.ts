import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('refresh_tokens')
export class RefreshTokenOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserOrmEntity, (user) => user.refreshTokens, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: UserOrmEntity;

  @Column({ name: 'token_hash', type: 'text', unique: true })
  tokenHash!: string;

  @CreateDateColumn({ name: 'expires_at'/* timestamptzz */ })
  expiresAt!: Date;

  @CreateDateColumn({ name: 'revoked_at'/* timestamptzz */, nullable: true })
  revokedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;
}
