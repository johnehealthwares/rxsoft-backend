import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('generics')
export class Generic {
    
  @PrimaryColumn()
  uuid: string

  @Column({unique: true})
  code: string;

  @Column() genericName: string;
  @Column() pharmaCode: string;
  @Column() generalUse: string;
  @Column() adultDosageByWeight: string;
  @Column() childrenDosage: string;
  @Column() updatedBy: string;
  @Column() updated: Date;
}