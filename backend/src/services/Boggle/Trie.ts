export class TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    const lowercaseWord = word.toLowerCase();
    let node = this.root;
    for (const char of lowercaseWord) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    const lowercaseWord = word.toLowerCase();
    let node = this.root;
    for (let char of lowercaseWord) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    const lowercasePrefix = prefix.toLowerCase();
    let node = this.root;
    for (let char of lowercasePrefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }

  getRandomWord(fuzzyLength?: number): string {
    if (!fuzzyLength) {
      fuzzyLength = Math.floor(Math.random() * 15) + 3;
    }
  
    let node = this.root;
    let theseKeys = Object.keys(node.children);
  
    // Ensure the trie is not empty
    if (theseKeys.length === 0) {
      return '';
    }
  
    let thisChar = theseKeys[Math.floor(Math.random() * theseKeys.length)];
    let wordLength = 1;
    let returnString = thisChar;
    node = node.children[thisChar];
  
    while (true) {
      theseKeys = Object.keys(node.children);
      if (theseKeys.length === 0) {
        if (node.isEndOfWord) {
          break;
        }else{
          throw new Error('Bad Data in Trie');
        }
      }
      thisChar = theseKeys[Math.floor(Math.random() * theseKeys.length)];
      returnString += thisChar;
      node = node.children[thisChar];
      wordLength++;
      if (node.isEndOfWord && wordLength >= fuzzyLength) {
        break;
      }
    }
  
    return returnString;
  }
}