import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethodOrmEntity } from '../../sales/entities/payment-method.orm-entity';
import { UserOrmEntity } from '../../identity/entities/user.orm-entity';
import { AccountReceivableOrmEntity } from '../../sales/entities/account-receivable.orm-entity';
import { ColumnNumericTransformer } from '../../../shared/utils/column-transformer';

@Entity('receivable_transactions')
// Ledger entries against receivables (payment/charge/adjustment/write-off).
export class ReceivableTransactionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => AccountReceivableOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receivable_id' })
  receivable!: AccountReceivableOrmEntity;

  @Column({ name: 'transaction_type', type: 'text' })
  transactionType!: 'charge' | 'payment' | 'adjustment' | 'write_off';

  @Column({ type: 'float', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  amount!: number;

  @CreateDateColumn({ name: 'transaction_date'/* timestamptzz */ })
  transactionDate!: Date;

  @ManyToOne(() => PaymentMethodOrmEntity, { nullable: true })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod!: PaymentMethodOrmEntity | null;

  @Column({ name: 'reference_number', type: 'text', nullable: true })
  referenceNumber!: string | null;

  @ManyToOne(() => UserOrmEntity, { nullable: true })
  @JoinColumn({ name: 'received_by_user_id' })
  receivedByUser!: UserOrmEntity | null;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @CreateDateColumn({ name: 'created_at'/* timestamptzz */ })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'/* timestamptzz */ })
  updatedAt!: Date;
}
