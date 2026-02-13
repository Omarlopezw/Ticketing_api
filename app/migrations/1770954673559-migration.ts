import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1770954673559 implements MigrationInterface {
    name = 'Migration1770954673559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_data" ("id" integer NOT NULL, "name" character varying(64) NOT NULL, "lastname" character varying(64) NOT NULL, "phone" character varying(64) NOT NULL, CONSTRAINT "PK_73a2ae063ee34712f94b8248ced" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_data"`);
    }

}
