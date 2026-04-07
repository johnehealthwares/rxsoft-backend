import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn()
  uuid: string
  @Column({unique:true})
  code: string;
  @Column() name: string;
  @Column() index: string;
  @Column() location: string;
  @Column() updatedBy: string;
  @Column() upDated: Date;
}