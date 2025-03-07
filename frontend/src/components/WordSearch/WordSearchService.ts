import { triePopularWordDictionary } from '../Trie/TrieDictionary';

export const generateBoard = (): string[][] => {
  throw new Error("Not implemented");
};

const pickRandomWords = (numberOfWords: number): string[] => {
  const words: string[] = [];
  for (let i = 0; i < numberOfWords; i++) {
    const randomIndex = Math.floor(Math.random());
    words.push(triePopularWordDictionary.getRandomWord());
  }
  return words;
}