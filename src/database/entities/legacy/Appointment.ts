import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  apmtId: number;

  @Column() apmtSubject: string;
  @Column() apmtDescription: string;
  @Column() apmtColor: string;
  @Column() apmtToolTip: string;
  @Column() apmtType: string;
  @Column() startDate: Date;
  @Column() endDate: Date;
  @Column() timeMarker: string;
  @Column() reccurence: string;
  @Column({ default: false }) remindMe: boolean;
  @Column() action: string;
}