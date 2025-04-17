import { getPopularWordDictionaryTree } from '../../services/TrieDictionaryService';

export const generateBoard = (): string[][] => {
  throw new Error("Not implemented");
};

const pickRandomWords = async (numberOfWords: number): Promise<string[]> => {
  const words: string[] = [];
  for (let i = 0; i < numberOfWords; i++) {
    const randomIndex = Math.floor(Math.random());
    const randomWord = await getPopularWordDictionaryTree().then(trie => trie.getRandomWord());
    words.push(randomWord);
  }
  return words;
}