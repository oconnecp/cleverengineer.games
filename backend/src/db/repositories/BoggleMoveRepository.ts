import { AppDataSource } from "../data-source";
import { BoggleMove } from '../entities/BoggleMove';

const boggleMoveRepository = AppDataSource.getRepository(BoggleMove);

export const makeMove = async (gameId: string, word: string, score:number, moves: { row: number, col: number }[]): Promise<BoggleMove> => {
  const newMove = {
    gameId,
    word,
    score,
    moves,
  } as Required<Omit<BoggleMove, 'id' | 'createdAt'>>;

  const savedMove = await boggleMoveRepository.save(newMove);
  return savedMove;
}