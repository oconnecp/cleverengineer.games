import { AppDataSource } from "../data-source";
import { GameOfTheDay } from '../entities/GameOfTheDay';
import { Between } from "typeorm";

const GameOfTheDayRespository = AppDataSource.getRepository(GameOfTheDay);

export const insertNewGameOfTheDay = async (multiplayerRoomId: string, day: Date,): Promise<GameOfTheDay> => {
  const gameOfTheDay = new GameOfTheDay();
  gameOfTheDay.multiplayerRoomId = multiplayerRoomId;
  gameOfTheDay.day = day;

  return  GameOfTheDayRespository.save(gameOfTheDay);
}

export const getGameOfTheDayByDate = async (day: Date): Promise<GameOfTheDay | null> => {
  // Get start and end of the day in UTC
  const start = new Date(day);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(day);
  end.setUTCHours(23, 59, 59, 999);

  const gameOfTheDay = await GameOfTheDayRespository.findOne({
    where: {
      day: Between(start, end),
    },
  });

   
  return gameOfTheDay;
}