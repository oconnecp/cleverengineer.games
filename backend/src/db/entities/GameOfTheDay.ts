import { Entity, PrimaryColumn, Index, Column } from "typeorm";
@Entity()
export class GameOfTheDay {
  @PrimaryColumn()
  multiplayerRoomId!: string; // Unique lobby code

  @Column({ type: 'timestamp' })
  day!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}