import { trie } from './Trie';

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

  console.log(shuffledDice);

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
      board[row][col] = shuffledBoard[(row * 4)  + col];
    }
  }
  return board;
};

// Example function to check if a word is valid
export const isValidWord = (word: string): boolean => {
  let node = trie.root;
  for (const char of word) {
    if (!node.children[char]) {
      return false;
    }
    node = node.children[char];
  }
  return node.isEndOfWord;
};