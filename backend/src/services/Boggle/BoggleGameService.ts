import { BoggleGame } from "../../db/entities/BoggleGame";
import { createBoggleGame, getBoggleGameById, getMostRecentBoggleGameByUserId, updateBoggleGame, getAllBoggleGamesByUserId } from "../../db/repositories/BoggleGameRepository";
import { makeMove } from "../../db/repositories/BoggleMoveRepository";
import { GameNotFoundError, WordAlreadyFoundError } from "./BoggleError";
import { generateBoard, findAllPopularWords, calculateTotalScore, isValidMove, calculateWordScore, getPrettyWord } from "./BoggleGameEngine";

export const createGame = async (userId: string | null, ipAddress: string): Promise<BoggleGame> => {
  const shuffledBoard = generateBoard();

  const totalPopularScore = await calculateTotalScore(await findAllPopularWords(shuffledBoard));

  const savedGame = await createBoggleGame(userId, shuffledBoard, totalPopularScore, ipAddress);
  return savedGame;
}

export const getGameById = async (id: string): Promise<BoggleGame | null> => {
  return await getBoggleGameById(id);
}

export const getRecentGameByUserId = async (userId: string): Promise<BoggleGame | null> => {
  return await getMostRecentBoggleGameByUserId(userId);
}

export const submitWord = async (gameId: string, word: string, moves: { row: number, col: number }[]): Promise<BoggleGame> => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new GameNotFoundError();
  }

  const prettyWord = getPrettyWord(word);

  if (game.wordsFound.includes(prettyWord)) {
    throw new WordAlreadyFoundError(prettyWord);
  }
  let thisWordScore = calculateWordScore(prettyWord);

  if (await isValidMove(word, moves, game.board)) {
    game.wordsFound.push(prettyWord);
    game.totalUserScore += thisWordScore
    await updateBoggleGame(game);

    // store BoggleMove in the database
    // we don't need to await as this is a fire-and-forget operation
    makeMove(gameId, prettyWord, thisWordScore, moves);
  }

  return game;
}

//todo: We should work on syncing these with the backend types
export type BoggleGameStatsResponse = {
  totalGames: number;
  totalScore: number;
}

export const getUserBoggleStats = async (userId: string): Promise<{ totalGames: number, totalScore: number }> => {
  const games = await getAllBoggleGamesByUserId(userId);
  const totalGames = games.length;
  const totalScore = games.reduce((acc, game) => acc + game.totalUserScore, 0);
  return {
    totalGames,
    totalScore
  };
}


//todo: We should work on syncing these with the backend types
export type BoggleGameResponse = {
  id: string,
  board: string[][],
  totalPopularScore: number,
  wordsFound: string[],
  totalUserScore: number,
}

//hilarious name must stay
export const convertBoggleGameToBoggleGameResponse = (game: BoggleGame): BoggleGameResponse => {
  return {
    id: game.id,
    board: game.board,
    totalPopularScore: game.totalPopularScore,
    wordsFound: game.wordsFound,
    totalUserScore: game.totalUserScore,
  };
}