import express, { Request, Response } from 'express';
import { AuthenticatedUser } from '../db/entities/AuthenticatedUser';
import { convertBoggleGameToBoggleGameResponse, getUserBoggleStats, createGame, getGameById, submitWord } from '../services/Boggle/BoggleGameService';
import { GameNotFoundError } from '../services/Boggle/BoggleError';
import { convertErrorToErrorResponse } from '../tools/ApiTools';
const BogglerRouter = express.Router();

BogglerRouter.get(`/newgame`, async (req: Request, res: Response) => {
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
    const { id, board, totalPopularScore, wordsFound, totalUserScore } = newGame;
    const gameResponse = convertBoggleGameToBoggleGameResponse(newGame);
    res.status(201).json(gameResponse);
  } catch (error) {
    console.error('Error creating new game:', error);
    res.status(500).json(convertErrorToErrorResponse(error as Error));
  }
});

BogglerRouter.get(`/game/:id`, async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    const game = await getGameById(gameId);
    if (!game) {
      return res.status(404).json(convertErrorToErrorResponse(new GameNotFoundError()));
    }
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json(convertErrorToErrorResponse(error as Error));
  }
});

BogglerRouter.post(`/game/:id/make-move`, async (req: Request, res: Response) => {
  const { gameId, word, moves } = req.body;
  if (!gameId || !word || !Array.isArray(moves)) {
    return res.status(400).json({ error: 'Game ID, word, and moves are required' });
  }

  try {
    const updatedGame = await submitWord(gameId, word, moves);
    const gameResponse = convertBoggleGameToBoggleGameResponse(updatedGame);
    res.json(gameResponse);
  } catch (error) {
    console.error('Error submitting word:', error);
    res.status(500).json(convertErrorToErrorResponse(error as Error));
  }
});

BogglerRouter.get(`/recent-game`, async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const user = req.user as AuthenticatedUser; // Cast to AuthenticatedUser
  try {
    const recentGame = await getGameById(user.id);
    if (!recentGame) {
      return res.status(404).json(new GameNotFoundError());
    }
    res.json(recentGame);
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