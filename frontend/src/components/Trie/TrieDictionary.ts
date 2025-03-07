import { Trie } from "./Trie";
import { AllWordDictionary } from "./AllWordDictionary";
import { PopularDictionary } from "./PopularDictionary";


// Create a Trie and insert words from the dictionary
const trieAllWordDictionary = new Trie();
AllWordDictionary.forEach(word => trieAllWordDictionary.insert(word));

const triePopularWordDictionary = new Trie();
PopularDictionary.forEach(word => {
  if (word.length >= 3) {
    triePopularWordDictionary.insert(word);
  }
});

// Export the trie for use in other parts of the application
export { trieAllWordDictionary, triePopularWordDictionary };