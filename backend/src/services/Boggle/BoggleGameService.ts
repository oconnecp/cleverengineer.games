import { BoggleGame } from "../../db/entities/BoggleGame";
import { createBoggleGame, getBoggleGameById, getMostRecentBoggleGameByUserId, updateBoggleGame } from "../../db/repositories/BoggleGameRepository";
import { GameNotFoundError, WordAlreadyFoundError } from "./BoggleError";
import { generateBoard, findAllPopularWords, calculateTotalScore, isValidMove, calculateWordScore } from "./BoggleGameEngine";

export const createGame = async (userId: string | null): Promise<BoggleGame> => {
  const shuffledBoard = generateBoard();

  const totalPopularScore = await calculateTotalScore(await findAllPopularWords(shuffledBoard));

  const savedGame = await createBoggleGame(userId, shuffledBoard, totalPopularScore);
  return savedGame;
}

export const getGameById = async (id: string): Promise<BoggleGame | null> => {
  return await getBoggleGameById(id);
}

export const getRecentGameByUserId = async (userId: string): Promise<BoggleGame | null> => {
  return await getMostRecentBoggleGameByUserId(userId);
}

export const submitWord = async (gameId: string, word: string, moves: { row: number, col: number }[]): Promise<BoggleGame | null> => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new GameNotFoundError();
  }

  const prettyWord = `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

  if (game.wordsFound.includes(prettyWord)) {
    throw new WordAlreadyFoundError();
  }

  // this will throw an error if the word is invalid or the moves are not valid
  isValidMove(word, moves, game.board);

  game.wordsFound.push(prettyWord);
  game.totalUserScore += calculateWordScore(prettyWord);
  await updateBoggleGame(game);


  return game;
}