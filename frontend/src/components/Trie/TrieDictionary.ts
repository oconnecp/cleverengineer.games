import { getAllWordDictionary, getPopularWordDictionary} from "../../services/DictionaryService";
import { Trie } from "./Trie";

let PopularDictionaryTree: Trie | null = null;
let AllWordDictionaryTree: Trie | null = null;

// Create a Trie and insert words from the dictionary
const getAllWordDictionaryTree = async (): Promise<Trie>=>{
  if(AllWordDictionaryTree === null){
    const AllWordDictionary = await getAllWordDictionary();

    AllWordDictionaryTree = new Trie();
    AllWordDictionary.forEach(word => AllWordDictionaryTree!.insert(word));
  }
  return AllWordDictionaryTree!;
}

const getPopularWordDictionaryTree = async (): Promise<Trie>=>{
  if(PopularDictionaryTree === null){
    const PopularWordDictionary = await getPopularWordDictionary();

    PopularDictionaryTree = new Trie();
    PopularWordDictionary.forEach(word => {
      if (word.length >= 3) {
        PopularDictionaryTree!.insert(word);
      }
    });  }
  return PopularDictionaryTree!;
}

// Export the trie for use in other parts of the application
export { getAllWordDictionaryTree, getPopularWordDictionaryTree };