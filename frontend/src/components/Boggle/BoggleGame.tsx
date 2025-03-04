import React, { useEffect } from 'react';
import { BoggleBoard } from './BoggleBoard';
import { generateBoard, isValidWord, findAllWords } from './BoggleService';
import { set } from 'lodash';
import { BoggleScore } from './BoggleScore';

export default function BoggleGame() {

  const [words, setWords] = React.useState<string[]>([]);
  const [board, setBoard] = React.useState<string[][]>([]);

  useEffect(() => {
    setBoard(generateBoard());
  }
  , []);

  const handleWordSubmit = (word: string) => {
    if(word.length < 3) {
      console.log('Word is too short');
      return;
    }
    console.log('word is long enough')
    
    if (!isValidWord(word)) {
      console.log(`Invalid word: ${word}`);
      return;
    }
    console.log('Valid word found')

    if (words.indexOf(word)> -1) {
      console.log(`Word already found: ${word}`);
    } else {
      setWords([...words, word]);
      console.log(`Word added: ${word}`);
    }
  }

  const handleNewGame = () => {
    // later we can do this on the backend
    setBoard(generateBoard());
    setWords([]);
  }

  const logAllWords = ()=>{
    console.log(findAllWords(board));
  }


  return (
    <div className="boggle-game">
      <h1>Boggle</h1>
      <button onClick={handleNewGame}>New Game</button>
      <BoggleScore
        board={board}
        words={words}
      />
      <BoggleBoard
        board={board} 
        onWordSubmit={(word) => handleWordSubmit(word)}
      />
      {words.length > 0 && (
        <div>
          <h2>Words Found</h2>
          <ul>
            {words.map((word, wordIndex) => (
              <li key={wordIndex}>{word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}