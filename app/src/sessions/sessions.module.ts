import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../sessions/entities/session.entity';
import { SessionsController } from './sessions.controller';
import { SessionService } from './sessions.service';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Hasher } from '../hasher/hash';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session]),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [SessionsController],
  providers: [SessionService,Hasher],
})
export class SessionModule { }
