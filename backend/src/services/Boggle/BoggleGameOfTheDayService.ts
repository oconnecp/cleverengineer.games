import { insertNewGameOfTheDay, getGameOfTheDayByDate } from "../../db/repositories/GameOfTheDayRepository";
import { createMultiplayerBoggleGame,  } from "./MultiplayerBoggleGameService"
import { GameOfTheDay } from "../../db/entities/GameOfTheDay";
import { MultiplayerRoom } from "../../db/entities/MultiplayerRoom";


export const getGameOfTheDay = async (day: Date): Promise<{ gameOfTheDay: GameOfTheDay, multiplayerRoom: MultiplayerRoom }> => {
  // Get the game of the day for the specified date
  let gameOfTheDay = await getGameOfTheDayByDate(day);
  let multiplayerRoom: MultiplayerRoom | null = null;

  if (gameOfTheDay) {
    multiplayerRoom = await 
   } else {
    // If no game of the day exists, create a new one
    multiplayerRoom = await createMultiplayerBoggleGame();
    gameOfTheDay = await insertNewGameOfTheDay(multiplayerRoom.id, day);

    return { gameOfTheDay: gameOfTheDay, multiplayerRoom: multiplayerRoom };
  }
}

export const addGameIdToMultiplayerRoom = async (roomId: string, gameId: string): Promise<MultiplayerRoom | null> => {
  const multiplayerRoom = await getMultiplayerRoomById(roomId);
  if (!multiplayerRoom) {
    return null;
  }

  // Add the game ID to the room's gameIds array
  multiplayerRoom.gameIds.push(gameId);
  
  // Save the updated room
  return await AppDataSource.getRepository(MultiplayerRoom).save(multiplayerRoom);
}