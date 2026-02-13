import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1770957406151 implements MigrationInterface {
    name = 'Migration1770957406151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_data" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "user_data" ADD CONSTRAINT "UQ_150d6991d90d298abc3f53d5e09" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_data" ADD CONSTRAINT "FK_150d6991d90d298abc3f53d5e09" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_data" DROP CONSTRAINT "FK_150d6991d90d298abc3f53d5e09"`);
        await queryRunner.query(`ALTER TABLE "user_data" DROP CONSTRAINT "UQ_150d6991d90d298abc3f53d5e09"`);
        await queryRunner.query(`ALTER TABLE "user_data" DROP COLUMN "userId"`);
    }

}
