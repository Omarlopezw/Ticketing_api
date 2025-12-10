import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1765325781197 implements MigrationInterface {
    name = 'Migrations1765325781197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying(64) NOT NULL,
                "lastname" character varying(64) NOT NULL,
                "email" character varying(64) NOT NULL,
                "password" character varying(256) NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "session" (
                "id" SERIAL NOT NULL,
                "accessToken" text NOT NULL,
                "refreshToken" character varying(256) NOT NULL,
                "userId" integer,
                CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "session"
            ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"
        `);
        await queryRunner.query(`
            DROP TABLE "session"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
