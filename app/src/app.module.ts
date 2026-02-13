import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/pg.module';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from './sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    SessionModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})

export class AppModule {}
