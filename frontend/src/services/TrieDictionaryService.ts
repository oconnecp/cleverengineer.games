import { Trie } from "../../shared/Trie";
import { CacheService } from "../../shared/CacheService";
import { apiGet } from "./ApiClient";

const cacheService = new CacheService();

// Retrieve the Trie from the server
// This is not a good implementation.  it's now 40MB instead of 5MB
const getAllWordDictionaryTree = async (): Promise<Trie> => {
  const allWordDictionaryResponse = await apiGet<Trie>("dictionary/all/trie", true);
  return Trie.rehydrate(allWordDictionaryResponse.data);
}

const getPopularWordDictionaryTree = async (): Promise<Trie> => {
  const popularWordDictionaryResponse = await apiGet<Trie>("dictionary/popular/trie", true);
  return Trie.rehydrate(popularWordDictionaryResponse.data);
}

// Export the trie for use in other parts of the application
export { getAllWordDictionaryTree, getPopularWordDictionaryTree };