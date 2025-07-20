import { AppDataSource } from "../data-source";
import { BoggleGame } from '../entities/BoggleGame';

const boggleGameRepository = AppDataSource.getRepository(BoggleGame);

//Generate and save a new Boggle game board
export const createBoggleGame = async (userId: string | null, board:string[][], totalPopularScore:number): Promise<BoggleGame> => {
  const newGame = {
    userId,
    board,
    wordsFound: [],
    totalUserScore: 0,
    totalPopularScore,
  } as Required<Omit<BoggleGame, 'id' | 'createdAt' | 'updatedAt'>>;

  const savedGame = await boggleGameRepository.save(newGame);
  return savedGame;
}

export const getBoggleGameById = async (id: string): Promise<BoggleGame | null> => {
  const game = await boggleGameRepository.findOneBy({ id });
  if (!game) {
    return null;
  }
  return game;
}

export const getMostRecentBoggleGameByUserId = async (userId: string): Promise<BoggleGame | null> => {
  const games = await boggleGameRepository.find({
    where: { userId },
    order: { createdAt: 'DESC' },
    take: 1,
  });
  return games.length > 0 ? games[0] : null;
}

export const updateBoggleGame = async (game: BoggleGame): Promise<BoggleGame> => {
  game.updatedAt = new Date();
  return await boggleGameRepository.save(game);
}

