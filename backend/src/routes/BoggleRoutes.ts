import express, { Request, Response } from 'express';
import { AuthenticatedUser } from '../db/entities/AuthenticatedUser';
import { convertBoggleGameToBoggleGameResponse, getUserBoggleStats, createGame, getGameById, submitWord, BoggleGameResponse } from '../services/Boggle/BoggleGameService';
import { getPrettyWord } from '../services/Boggle/BoggleGameEngine';
import { makeMove } from '../db/repositories/BoggleMoveRepository';
import { BoggleError, GameNotFoundError } from '../services/Boggle/BoggleError';
import { convertErrorToErrorResponse } from '../tools/ApiTools';
const BogglerRouter = express.Router();

BogglerRouter.get(`/newgame`, async (req: Request, res: Response<BoggleGameResponse | BoggleError>) => {
  let userId: string | null = null;
  // let ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  let ipAddress = req.ip || 'unknown'; // Use req.ip for the IP address
  if (Array.isArray(ipAddress)) {
    ipAddress = ipAddress[0];
  }

  if (req.isAuthenticated()) {
    const user = req.user as AuthenticatedUser; // Cast to AuthenticatedUser
    userId = user.id || null;
  }

  try {
    const newGame = await createGame(userId, ipAddress);
    //remove sensitive information before sending to client
    const gameResponse = convertBoggleGameToBoggleGameResponse(newGame);
    res.status(201).json(gameResponse);
  } catch (error) {
    console.error('Error creating new game:', error);
    res.status(500).json(convertErrorToErrorResponse(error as Error));
  }
});

BogglerRouter.get(`/game/:id`, async (req: Request, res: Response<BoggleGameResponse | BoggleError>) => {
  const gameId = req.params.id;
  try {
    const game = await getGameById(gameId);
    if (!game) {
      return res.status(404).json(convertErrorToErrorResponse(new GameNotFoundError()));
    }
    const gameResponse = convertBoggleGameToBoggleGameResponse(game);
    res.json(gameResponse);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json(convertErrorToErrorResponse(error as Error));
  }
});

BogglerRouter.post(`/game/:id/make-move`, async (req: Request, res: Response<BoggleGameResponse | BoggleError>) => {
  const { gameId, word, moves } = req.body;
  if (!gameId || !word || !Array.isArray(moves)) {
    const boggleError = new BoggleError('Game ID, word, and moves are required');
    return res.status(400).json(convertErrorToErrorResponse(boggleError));
  }

  try {
    const updatedGame = await submitWord(gameId, word, moves);
    const gameResponse = convertBoggleGameToBoggleGameResponse(updatedGame);
    res.json(gameResponse);
  } catch (error) {
    console.error('Error submitting word:', error);
    // Lets track invalid moves
    // We don't need to await this as it's a fire-and-forget operation
    // If there is an error submitting the word, we still want to log the move
    makeMove(gameId, word, 0, moves).catch((err) => {
      console.error('Error logging invalid move:', err);
    });
    // Convert the error to a BoggleError response
    res.status(500).json(convertErrorToErrorResponse(error as Error));
  }
});

BogglerRouter.get(`/recent-game`, async (req: Request, res: Response<BoggleGameResponse | BoggleError>) => {
  if (!req.isAuthenticated()) {
    const boggleError = new BoggleError('User not authenticated');
    return res.status(401).json(convertErrorToErrorResponse(boggleError));
  }

  const user = req.user as AuthenticatedUser; // Cast to AuthenticatedUser
  try {
    const recentGame = await getGameById(user.id);
    if (!recentGame) {
      return res.status(404).json(new GameNotFoundError());
    }
    const gameResponse = convertBoggleGameToBoggleGameResponse(recentGame);
    res.json(gameResponse);
  } catch (error) {
    console.error('Error fetching recent game:', error);
    res.status(500).json(convertErrorToErrorResponse(error as Error));
  }
});

BogglerRouter.get(`/stats/user`, async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  const user = req.user as AuthenticatedUser; // Cast to AuthenticatedUser
  try {
    const stats = await getUserBoggleStats(user.id);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching user Boggle stats:', error);
    res.status(500).json(convertErrorToErrorResponse(error as Error));
  }
});

export default BogglerRouter;