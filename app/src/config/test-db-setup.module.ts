// test/infra/test-db-setup.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class TestDbSetup {
  async init() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.getOrThrow<string>('DB_TEST_HOST'),
            port: configService.getOrThrow<number>('DB_TEST_PORT'),
            username: configService.getOrThrow<string>('DB_TEST_USERNAME'),
            password: configService.getOrThrow<string>('DB_TEST_PASSWORD'),
            database: configService.getOrThrow<string>('DB_TEST_DATABASE'),
            autoLoadEntities: true,
            synchronize: true, 
            dropSchema: true,
          }),
        }),
        AppModule,
      ],
    }).compile();

    const app = moduleFixture.createNestApplication();
    
    await app.init();
    
    return { app };
  }
}