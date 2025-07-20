import express, { Request, Response } from 'express';
import { getAllWordDictionary, getPopularWordDictionary } from '../services/Dictionary/DictionaryService';
const DictionaryRouter = express.Router();

DictionaryRouter.get(`/popular`, async (req: Request, res: Response) => {
  res.send(getPopularWordDictionary());
});

DictionaryRouter.get(`/all`, async (req: Request, res: Response) => {
  res.send(getAllWordDictionary());
});

export default DictionaryRouter;