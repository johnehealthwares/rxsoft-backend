import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('currentstock')
export class CurrentStock {
  @PrimaryGeneratedColumn()
  uuid: string;

  product: Product;

  @Column() stockQty: number;
  @Column() store: number;
  @Column() stockLimit: number;
  @Column() howUpdated: string;
  @Column() updatedBy: string;
  @Column() updated: Date;
}