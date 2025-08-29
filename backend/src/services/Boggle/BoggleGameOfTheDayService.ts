import { insertNewGameOfTheDay, getGameOfTheDayByDate } from "../../db/repositories/GameOfTheDayRepository";
import { createMultiplayerBoggleGame, getMultiplayerRoom } from "./MultiplayerBoggleGameService"
import { GameOfTheDay } from "../../db/entities/GameOfTheDay";
import { MultiplayerRoom } from "../../db/entities/MultiplayerRoom";
import { updateMultiplayerRoom } from "../../db/repositories/MultiplayerRoomRepository";


export const getGameOfTheDay = async (day: Date): Promise<{ gameOfTheDay: GameOfTheDay, multiplayerRoom: MultiplayerRoom }> => {
  // Get the game of the day for the specified date
  let gameOfTheDay = await getGameOfTheDayByDate(day);
  let multiplayerRoom: MultiplayerRoom | null = null;

  if (gameOfTheDay) {
    multiplayerRoom = await getMultiplayerRoom(gameOfTheDay.multiplayerRoomId);
    if (!multiplayerRoom) {
      throw new Error(`Multiplayer room not found for ID: ${gameOfTheDay.multiplayerRoomId}`);
    }
    return { gameOfTheDay: gameOfTheDay, multiplayerRoom: multiplayerRoom };
  } else {
    // If no game of the day exists, create a new one
    multiplayerRoom = await createMultiplayerBoggleGame();
    gameOfTheDay = await insertNewGameOfTheDay(multiplayerRoom.id, day);

    return { gameOfTheDay: gameOfTheDay, multiplayerRoom: multiplayerRoom };
  }
}

export const addGameIdToGameOfDay = async (roomId: string, gameId: string): Promise<{ gameOfTheDay: GameOfTheDay, multiplayerRoom: MultiplayerRoom }> => {
  // Get the game of the day by room ID
  const { gameOfTheDay, multiplayerRoom } = await getGameOfTheDay(new Date());

  multiplayerRoom.gameIds.push(gameId);
  updateMultiplayerRoom(multiplayerRoom);
  multiplayerRoom.updatedAt = new Date(); // Update the timestamp for the frontend

  return { gameOfTheDay, multiplayerRoom };
}