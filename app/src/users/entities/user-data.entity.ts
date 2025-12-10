import { Entity, PrimaryGeneratedColumn, Column, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class UserData {
  @PrimaryColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 64 })
  lastname: string;

  @Column({ length: 64 })
  phone: string;
}