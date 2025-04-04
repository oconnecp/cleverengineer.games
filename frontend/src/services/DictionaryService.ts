import { apiGet } from "./ApiClient";

export const getPopularWordDictionary = async (): Promise<string[]> => {
  const popularWordDictionaryResponse = await apiGet<string[]>("dictionary/popular", true);
  return popularWordDictionaryResponse.data;
}

export const getAllWordDictionary = async (): Promise<string[]> => {
  const allWordDictionaryResponse = await apiGet<string[]>("dictionary/all", true);
  return allWordDictionaryResponse.data;
}