import { config } from 'dotenv';
import { Session } from "./src/sessions/entities/session.entity";
import { User } from "./src/users/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { DataSource } from 'typeorm';

config({ path: `.env` });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_DATABASE'),
  synchronize: configService.getOrThrow<boolean>('PG_SYNCHRONIZE'),
  migrations: ['./migrations/*.ts'],
  entities: [
    User,
    Session
  ],
});