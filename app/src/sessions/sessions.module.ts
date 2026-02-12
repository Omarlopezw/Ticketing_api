import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../sessions/entities/session.entity';
import { SessionsController } from './sessions.controller';
import { SessionService } from './sessions.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  controllers: [SessionsController],
  providers: [SessionService],
})
export class SessionModule {}
