import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { UserData } from './entities/user-data.entity';
import { Hasher } from '../hasher/hash';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserData, Session])],
  controllers: [UsersController],
  providers: [UsersService,Hasher],
})
export class UsersModule {}
