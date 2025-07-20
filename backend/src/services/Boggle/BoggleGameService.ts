import { AppDataSource } from "../../db/data-source";
import { generateBoard, isValidWord, calculateTotalScore, calculateWordScore, findAllPopularWords } from './BoggleService';
import { BoggleGame } from '../../db/entities/BoggleGame';

const boggleGameRepository = AppDataSource.getRepository(BoggleGame);

//Generate and save a new Boggle game board
const createGame = async (userId: string): Promise<BoggleGame> => {
  const board = generateBoard();
  const newGame = {
    userId,
    board,
    wordsFound: [],
    totalUserScore: 0,
    totalPopularScore: calculateTotalScore(await findAllPopularWords(board)),
  } as Required<Omit<BoggleGame, 'id' | 'createdAt' | 'updatedAt'>>;

  const savedGame = await boggleGameRepository.save(newGame);
  return savedGame;
}

const getGameById = async (id: string): Promise<BoggleGame | null> => {
  const game = await boggleGameRepository.findOneBy({ id });
  if (!game) {
    return null;
  }
  return game;
}

const getRecentGameByUserId = async (userId: string): Promise<BoggleGame | null> => {
  const games = await boggleGameRepository.find({
    where: { userId },
    order: { createdAt: 'DESC' },
    take: 1,
  });
  return games.length > 0 ? games[0] : null;
}

const makeMove = async (gameId: string, word: string, column: number, row: number): Promise<BoggleGame | null> => {
  const game = await getGameById(gameId);
  if (!game) {
    return null;
  }

  if (word.length < 3) {
    throw new Error('Word is too short');
  }
  const prettyWord = `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

  if (await isValidWord(word)) {
    if (!game.wordsFound.includes(prettyWord)) {
      game.wordsFound.push(prettyWord);
      game.totalUserScore += calculateWordScore(prettyWord);
      await boggleGameRepository.save(game);
    }
  } else {
    throw new Error('Invalid word');
  }

  return game;
}