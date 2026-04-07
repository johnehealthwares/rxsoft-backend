import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('dailysales')
export class DailySale {
  @PrimaryGeneratedColumn()
  uuid: string;


  @Column() dayOfYear: number;
  @Column() saleCode: string;
  @Column() itemCode: string;
  @Column() price: number;
  @Column() cost: number;
  @Column() numberSold: number;
  @Column() totalCost: number;
  @Column() staffName: string;
  @Column() date: Date;
}