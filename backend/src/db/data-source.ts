import "reflect-metadata";
import { DataSource } from "typeorm";
import { AuthenticatedUser } from "./entities/AuthenticatedUser";
import { BoggleGame } from "./entities/BoggleGame";
import { BoggleMove } from "./entities/BoggleMove";
import { MultiplayerRoom } from "./entities/MultiplayerRoom";
import { GameOfTheDay } from "./entities/GameOfTheDay";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from "../tools/Constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST, // e.g., "localhost"
  port: parseInt(DB_PORT), // Default PostgreSQL port
  username: DB_USERNAME, // e.g., "postgres"
  password: DB_PASSWORD, // e.g., "password"
  database: DB_NAME, // e.g., "mydatabase"
  synchronize: true, // Set to false in production
  logging: true,
  entities: [AuthenticatedUser, BoggleGame, BoggleMove, MultiplayerRoom, GameOfTheDay],
  migrations: [__dirname + "/migrations/*.ts"], // Dynamically import all migration files
});