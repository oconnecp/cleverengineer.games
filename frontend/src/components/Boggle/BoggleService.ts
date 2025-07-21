import e from 'cors';
import { apiGet, apiPost } from '../../services/ApiClient';


//todo: We should work on syncing these with the backend types
export type GameResponseType = {
  id: string,
  board: string[][],
  totalPopularScore: number,
  wordsFound: string[],
  totalUserScore: number,
}

export const newGame = async (): Promise<GameResponseType> => {
  try {
    const newGamePromise = await apiGet<GameResponseType>("boggle/newgame");
    return newGamePromise.data;
  } catch (error: any) {
    console.error("An Error occurred while making a new game:", error);

    let errorMessage = "An error occurred while starting a new game.";
    if(error && error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
    }
    throw new Error(errorMessage);
  };
}

export const makeMove = async (gameId: string, word: string, moves: { row: number, col: number }[]): Promise<GameResponseType> => {
  const endpoint = `boggle/game/${gameId}/make-move`;

  try {
    const requestBody = {
      gameId,
      word,
      moves
    };
    const updatedGame = await apiPost<GameResponseType>(endpoint, requestBody);
    return updatedGame.data;
  } catch (error: any) {
    console.error("Error making move:", error);

    let errorMessage = "An error occurred while making the move.";
    if(error && error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
};

