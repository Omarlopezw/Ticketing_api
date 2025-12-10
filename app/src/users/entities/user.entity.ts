import { Session } from '../../sessions/entities/session.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 64 })
  lastname: string;

  @Column({ length: 64 })
  email: string;

  @Column({ length: 256 })
  password:  string;

  @OneToMany(type => Session, session => session.user)
  sessions: Session[];

  @Column({ default: true })
  isActive: boolean;
}