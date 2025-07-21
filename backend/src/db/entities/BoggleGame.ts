import { Entity, PrimaryGeneratedColumn, Index, Column } from "typeorm";
@Entity()
export class BoggleGame {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({nullable: true})
  userId!: string;

  @Column({ type: 'json' })
  board!: string[][];

  @Column({ type: 'json' })
  wordsFound!: string[];

  @Column()
  totalUserScore!: number;

  @Column()
  totalPopularScore!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @Column()
  ipAddress!: string;
}