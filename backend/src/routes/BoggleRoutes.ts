import express, { Request, Response } from 'express';
import { AuthenticatedUser } from '../db/entities/AuthenticatedUser';
import { createGame, getGameById, submitWord } from '../services/Boggle/BoggleGameService';
import { GameNotFoundError } from '../services/Boggle/BoggleError';
const BogglerRouter = express.Router();

BogglerRouter.get(`/newgame`, async (req: Request, res: Response) => {
  let userId: string | null = null;
  if(req.isAuthenticated()) {
    const user = req.user as AuthenticatedUser; // Cast to AuthenticatedUser
    userId = user.id || null;
  }

  try {
    const newGame = await createGame(userId);
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error creating new game:', error);
    res.status(500).json(error);
  }
});

BogglerRouter.get(`/game/:id`, async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    const game = await getGameById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json(error);
  }
});

BogglerRouter.post(`/submit-word`, async (req: Request, res: Response) => {
  const { gameId, word, moves} = req.body;
  if (!gameId || !word || !Array.isArray(moves)) {
    return res.status(400).json({ error: 'Game ID, word, and moves are required' });
  }

  try {
    const updatedGame = await submitWord(gameId, word, moves);
    res.json(updatedGame);
  } catch (error) {
    console.error('Error submitting word:', error);
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
});


export default BogglerRouter;