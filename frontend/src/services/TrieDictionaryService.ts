import { Trie } from "../../shared/Trie";
import { CacheService } from "../../../shared/src/services/CacheService";
import { apiGet } from "./ApiClient";

const cacheService = new CacheService();

// Retrieve the Trie from the server
const getAllWordDictionaryTree = async (): Promise<Trie> => {
  const allWordDictionaryResponse = await apiGet<Trie>("dictionary/all/trie", true);
  return allWordDictionaryResponse.data;
}

const getPopularWordDictionaryTree = async (): Promise<Trie> => {
  const popularWordDictionaryResponse = await apiGet<Trie>("dictionary/popular/trie", true);
  return popularWordDictionaryResponse.data;
}

// Export the trie for use in other parts of the application
export { getAllWordDictionaryTree, getPopularWordDictionaryTree };