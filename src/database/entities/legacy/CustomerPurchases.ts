import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('customer_purchases')
export class CustomerPurchase {
  @Column({unique: true}) customerName: string;
  @Column()
  dateSold: Date;

  @Column() noOfItemSold: number;
  @Column() saleCode: string;
  @Column() totalCost: number;
  @Column() totalPaid: number;
  @Column() saleType: string;
  @Column() credit: string;
  @Column() debit: string;
  @Column() purpose: string;
  @Column() complaint: string;
}