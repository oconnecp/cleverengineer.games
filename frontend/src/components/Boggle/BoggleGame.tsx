import React, { useEffect } from 'react';
import { BoggleBoard } from './BoggleBoard';
import { generateBoard, isValidWord } from './BoggleService';
import { set } from 'lodash';

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

  const handleOnWordTooShort = () => {
    console.log('Selected word is too short');
  }

  return (
    <div className="boggle-game">
      <h1>Boggle</h1>
      <BoggleBoard
        board={board} 
        onWordSubmit={(word) => handleWordSubmit(word)}
      />
      {words.length > 0 && (
        <div>
          <h2>Words Found</h2>
          <ul>
            {words.map(word => (
              <li>{word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}