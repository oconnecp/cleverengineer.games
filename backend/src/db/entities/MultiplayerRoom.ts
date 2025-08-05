import { Entity, PrimaryColumn, Index, Column, BeforeInsert } from "typeorm";

/*
Collision Probability
If you generate a few thousand codes, collisions are extremely unlikely.
With tens of thousands, still very rare.
If you generate millions, the probability increases (see Birthday Problem), but for most games, this is safe.
Example:

For 10,000 rooms, the chance of a collision is less than 0.02%.
*/

function generateLobbyCode(length = 6): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

@Entity()
export class MultiplayerRoom {
  @PrimaryColumn()
  id!: string; // Unique lobby code

  @Column("text", { array: true })
  gameIds!: string[];

  @Column({ type: 'json' })
  board!: string[][];

  @Column()
  totalPopularScore!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = generateLobbyCode();
    }
  }
}