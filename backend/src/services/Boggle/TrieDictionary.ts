import { getAllWordDictionary, getPopularWordDictionary } from "../DictionaryService/DictionaryService";
import { Trie } from "./Trie";
import { CacheService } from "../CacheService";

const cacheService = new CacheService();

// Create a Trie and insert words from the dictionary
const getAllWordDictionaryTree = async (): Promise<Trie> => {
  const allWordCacheKey = "allWordDictionaryTree";
  if (!cacheService.checkEntry(allWordCacheKey)) {
    cacheService.initializeEntry<Trie>(allWordCacheKey);
  } else {
    const cachedTrie = await cacheService.get<Trie>(allWordCacheKey);
    return cachedTrie;
  }

  const AllWordDictionary = await getAllWordDictionary();
  const AllWordDictionaryTree = new Trie();

  AllWordDictionary.forEach(word => AllWordDictionaryTree!.insert(word));
  cacheService.set<Trie>(allWordCacheKey, AllWordDictionaryTree);
  return AllWordDictionaryTree;
}

const getPopularWordDictionaryTree = async (): Promise<Trie> => {
  const popularWordCacheKey = "popularWordDictionaryTree";
  if (!cacheService.checkEntry(popularWordCacheKey)) {
    cacheService.initializeEntry<Trie>(popularWordCacheKey);
  } else {
    const cachedTrie = await cacheService.get<Trie>(popularWordCacheKey);
    return cachedTrie;
  }

  const PopularWordDictionary = await getPopularWordDictionary();
  const PopularWordDictionaryTree = new Trie();
  PopularWordDictionary.forEach(word => {
    if (word.length >= 3) {
      PopularWordDictionaryTree.insert(word);
    }
  });
  cacheService.set<Trie>(popularWordCacheKey, PopularWordDictionaryTree);
  return PopularWordDictionaryTree;
}

// Export the trie for use in other parts of the application
export { getAllWordDictionaryTree, getPopularWordDictionaryTree };