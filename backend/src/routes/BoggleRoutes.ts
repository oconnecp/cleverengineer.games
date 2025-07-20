import express, { Request, Response } from 'express';
import { generateBoard, isValidWord,  } from '../services/Boggle/BoggleService';
const BogglerRouter = express.Router();

BogglerRouter.get(`/newgame`, async (req: Request, res: Response) => {
});

BogglerRouter.get(`/all`, async (req: Request, res: Response) => {
  res.send(getAllWordDictionary());
});

export default BogglerRouter;