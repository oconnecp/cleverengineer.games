import { apiGet } from "./ApiClient";

let popularWordDictionaryCache: string[] = [];
let allWordDictionaryCache: string[] = [];

export const getPopularWordDictionary = async(): Promise<string[]> => {
  if (popularWordDictionaryCache.length === 0) {
    popularWordDictionaryCache = (await apiGet<string[]>("dictionary/popular")).data;
  }
  return popularWordDictionaryCache;
}

export const getAllWordDictionary = async (): Promise<string[]> => {
  if (allWordDictionaryCache.length === 0) {
    allWordDictionaryCache = (await apiGet<string[]>("dictionary/all")).data;
  }
  return allWordDictionaryCache;
}