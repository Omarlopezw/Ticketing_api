import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  accessToken: string;

  @Column({ length: 256 })
  refreshToken: string;

  @ManyToOne(type => User, user => user.sessions)
  user: User;
}