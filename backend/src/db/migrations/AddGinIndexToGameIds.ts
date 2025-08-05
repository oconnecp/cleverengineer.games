import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGinIndexToGameIds1754351243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_multiplayer_room_game_ids_gin" ON "multiplayer_room" USING GIN ("gameIds")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_multiplayer_room_game_ids_gin"`
    );
  }
}