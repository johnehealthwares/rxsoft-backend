import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column() customerName: string;
  @Column() ageRange: string;
  @Column() gender: string;
  @Column() smsNumber: string;
  @Column() phoneNumber2: string;
  @Column() contactAddress: string;
  @Column() officeAddress: string;
  @Column() updatedBy: string;
  @Column() updated: Date;
}