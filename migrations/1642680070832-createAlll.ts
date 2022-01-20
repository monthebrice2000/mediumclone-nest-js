import {MigrationInterface, QueryRunner} from "typeorm";

export class createAlll1642680070832 implements MigrationInterface {
    name = 'createAlll1642680070832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Articles" DROP COLUMN "favorited"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Articles" ADD "favorited" boolean NOT NULL`);
    }

}
