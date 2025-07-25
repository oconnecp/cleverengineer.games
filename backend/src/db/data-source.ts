import "reflect-metadata";
import { DataSource } from "typeorm";
import { AuthenticatedUser } from "./entities/AuthenticatedUser"; // Adjust the path if necessary
import { BoggleGame } from "./entities/BoggleGame"; // Adjust the path if necessary
import { BoggleMove } from "./entities/BoggleMove";
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
  entities: [AuthenticatedUser, BoggleGame, BoggleMove], // Add all your entities here
});