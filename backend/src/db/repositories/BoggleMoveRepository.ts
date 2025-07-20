import { AppDataSource } from "../data-source";
import { BoggleMove } from '../entities/BoggleMove';

const boggleGameRepository = AppDataSource.getRepository(BoggleMove);

// export const makeMove = async (gameId: string, word: string, column: number, row: number): Promise<BoggleGame | null> => {
//   const game = await getGameById(gameId);
//   if (!game) {
//     return null;
//   }

//   if (word.length < 3) {
//     throw new Error('Word is too short');
//   }
//   const prettyWord = `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

//   if (await isValidWord(word)) {
//     if (!game.wordsFound.includes(prettyWord)) {
//       game.wordsFound.push(prettyWord);
//       game.totalUserScore += calculateWordScore(prettyWord);
//       await boggleGameRepository.save(game);
//     }
//   } else {
//     throw new Error('Invalid word');
//   }

//   return game;
// }