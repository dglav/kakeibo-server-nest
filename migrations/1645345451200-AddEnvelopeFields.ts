import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnvelopeFields1645345451200 implements MigrationInterface {
  name = 'AddEnvelopeFields1645345451200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "envelope" ADD "description" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "envelope" ADD "amount" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "envelope" ADD "currency" character varying NOT NULL DEFAULT 'JPY'`,
    );
    await queryRunner.query(
      `ALTER TABLE "envelope" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "envelope" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "envelope" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "envelope" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "envelope" DROP COLUMN "currency"`);
    await queryRunner.query(`ALTER TABLE "envelope" DROP COLUMN "amount"`);
    await queryRunner.query(`ALTER TABLE "envelope" DROP COLUMN "description"`);
  }
}
