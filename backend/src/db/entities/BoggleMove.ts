import { Entity, PrimaryGeneratedColumn, Index, Column } from "typeorm";
@Entity()
export class BoggleMove {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column()
  gameId!: string;

  @Column()
  word!: string;

  @Column()
  score!: number;

  @Column()
  locations!: [number, number][];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}