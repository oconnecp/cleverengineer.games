import { insertNewMultiplayerRoom, getMultiplayerRoomById } from "../../db/repositories/MultiplayerRoomRepository";
import { MultiplayerRoom } from "../../db/entities/MultiplayerRoom";
import { generateBoard, calculateTotalScore, findAllPopularWords } from "./BoggleGameEngine"; // Assume this function generates a random Boggle board

export const createMultiplayerBoggleGame = async (): Promise<MultiplayerRoom> => {
  const board = generateBoard();
  const totalPopularScore = await calculateTotalScore(await findAllPopularWords(board));
  return insertNewMultiplayerRoom(board, totalPopularScore);
}

export const getMultiplayerRoom = async (roomId: string): Promise<MultiplayerRoom | null> => {
  return getMultiplayerRoomById(roomId);
}