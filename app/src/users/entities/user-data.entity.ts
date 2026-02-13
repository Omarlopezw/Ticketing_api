import { Entity, PrimaryGeneratedColumn, JoinColumn,Column, Index, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserData {
  @PrimaryColumn()
  id: number;

  @OneToOne(type => User, user => user.userData)
  @JoinColumn()
  user: User;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 64 })
  lastname: string;

  @Column({ length: 64 })
  phone: string;
}