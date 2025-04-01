import { trieAllWordDictionary, triePopularWordDictionary } from '../Trie/TrieDictionary';


// Pulled from the game rules this is the definition of the dice
const dice: string[][] = [
  ["R", "I", "F", "O", "B", "X"],
  ["I", "F", "E", "H", "E", "Y"],
  ["D", "E", "N", "O", "W", "S"],
  ["U", "T", "O", "K", "N", "D"],
  ["H", "M", "S", "R", "A", "O"],
  ["L", "U", "P", "E", "T", "S"],
  ["A", "C", "I", "T", "O", "A"],
  ["Y", "L", "G", "K", "U", "E"],
  ["Qu", "B", "M", "J", "O", "A"],
  ["E", "H", "I", "S", "P", "N"],
  ["V", "E", "T", "I", "G", "N"],
  ["B", "A", "L", "I", "Y", "T"],
  ["E", "Z", "A", "V", "N", "D"],
  ["R", "A", "L", "E", "S", "C"],
  ["U", "W", "I", "L", "R", "G"],
  ["P", "A", "C", "E", "M", "D"],
];

export const generateBoard = (): string[][] => {
  //return an array of random letters from each die
  const shuffledDice = dice.map(die => {
    return die[Math.floor(Math.random() * die.length)];
  });

  //math.random returns a number between 0 and 1
  //if we subtract 0.5, we get a number between -0.5 and 0.5
  //this will give us a 50% chance of returning a positive or negative number
  const shuffledBoard = shuffledDice.sort(() => Math.random() - 0.5);

  const board: string[][] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (!board[row]) {
        board[row] = [];
      }
      board[row][col] = shuffledBoard[(row * 4) + col];
    }
  }
  return board;
};

export const isValidWord = (word: string): boolean => {
  return trieAllWordDictionary.search(word);
};

export const calculateWordScore = (word: string): number => {
  switch (word.length) {
    case 0:
    case 1:
    case 2:
      return 0;
    case 3:
    case 4:
      return 1;
    case 5:
      return 2;
    case 6:
      return 3;
    case 7:
      return 5;
    default:
      return 11;
  }
}

export const calculateTotalScore = (words: string[]): number => {
  return words.reduce((score, word) => {
    return score + calculateWordScore(word);
  }, 0);
}

export const findAllWords = (board: string[][]): string[] => {
  const words: string[] = [];
  const visited: boolean[][] = [];
  for (let row = 0; row < 4; row++) {
    visited[row] = [];
    for (let col = 0; col < 4; col++) {
      visited[row][col] = false;
    }
  }

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      dfs(row, col, "", board, visited).forEach(word => {
        //if the word is not already in the list of words, add it
        if (words.indexOf(word) === -1) {
          words.push(word);
        }
      });
    }
  }

  return words;
}

const dfs = (row: number, col: number, prefix: string, board: string[][], visited: boolean[][]): string[] => {
  const words: string[] = [];
  //Check if row and col are within bounds
  if (row < 0 || row >= 4 || col < 0 || col >= 4) {
    return [];
  }

  //Check if we already visited this
  if (visited[row][col]) {
    return [];
  }

  //make a copy of the visited array
  const copiedVisited = visited.map(row => [...row]);
  copiedVisited[row][col] = true;

  const word = prefix + board[row][col];
  //if the word doesn't start with any of the prefixes in the trie, return
  if (!trieAllWordDictionary.startsWith(word)) {
    return [];
  } 
   
  //if this is a word in the trie, add it to the list of words
  if (word.length >= 3 && trieAllWordDictionary.search(word)) {
    words.push(word);
  }

  return [
    dfs(row - 1, col - 1, word, board, copiedVisited),
    dfs(row - 1, col, word, board, copiedVisited),
    dfs(row - 1, col + 1, word, board, copiedVisited),
    dfs(row, col - 1, word, board, copiedVisited),
    dfs(row, col + 1, word, board, copiedVisited),
    dfs(row + 1, col - 1, word, board, copiedVisited),
    dfs(row + 1, col, word, board, copiedVisited),
    dfs(row + 1, col + 1, word, board, copiedVisited),
    ...words
  ].flat()
};