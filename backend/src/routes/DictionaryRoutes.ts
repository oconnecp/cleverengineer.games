import express, { Request, Response } from 'express';
import { getAllWordDictionary, getPopularWordDictionary } from '../services/DictionaryService/DictionaryService';
import { getAllWordDictionaryTree, getPopularWordDictionaryTree } from '../services/DictionaryService/TrieDictionaryServices'
const DictionaryRouter = express.Router();

DictionaryRouter.get(`/popular`, async (_req: Request, res: Response) => {
  res.send(getPopularWordDictionary());
});

DictionaryRouter.get(`/all`, async (_req: Request, res: Response) => {
  res.send(getAllWordDictionary());
});

DictionaryRouter.get(`/popular/trie`, async (_req: Request, res: Response) => {
  const popularWordDictionaryTrie = await getPopularWordDictionaryTree();
  res.send(popularWordDictionaryTrie);
});

DictionaryRouter.get(`/all/trie`, async (_req: Request, res: Response) => {
  const allWordDictionaryTrie = await getPopularWordDictionaryTree();
  res.send(allWordDictionaryTrie);
});

export default DictionaryRouter;