import React, { useEffect } from 'react';
import { BoggleBoard } from './BoggleBoard';
import { generateBoard, isValidWord, findAllWords } from './BoggleService';
import { BoggleScore } from './BoggleScore';
import { BoggleWordList } from './BoggleWordList';

export default function BoggleGame() {

  const [words, setWords] = React.useState<string[]>([]);
  const [board, setBoard] = React.useState<string[][]>([]);

  useEffect(() => {
    setBoard(generateBoard());
  }
    , []);

  const handleWordSubmit = (word: string) => {
    if (word.length < 3) {
      console.log('Word is too short');
      return;
    }
    console.log('word is long enough')

    if (!isValidWord(word)) {
      console.log(`Invalid word: ${word}`);
      return;
    }
    console.log('Valid word found')

    if (words.indexOf(word) > -1) {
      console.log(`Word already found: ${word}`);
    } else {
      //let's make the words look pretty once they are in the list
      setWords([...words, `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`]);
    }
  }

  const handleNewGame = () => {
    // later we can do this on the backend
    setBoard(generateBoard());
    setWords([]);
  }

  const logAllWords = () => {
    console.log(findAllWords(board));
  }

  const boggleGameStyle = {
    display: "grid",
    gridTemplateRows: ".5fr 1fr .5fr",
    overflow: "hidden",
  }

  const boggleHeader: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <div className="boggle-game" style={boggleGameStyle}>
      <div className='boggle-header' style={boggleHeader}>
        <h1>Boggle</h1>
        <button onClick={handleNewGame}>New Game</button>
        <BoggleScore
          board={board}
          words={words}
        />
      </div>
      <BoggleBoard
        board={board}
        onWordSubmit={(word) => handleWordSubmit(word)}
      />
      <BoggleWordList words={words} />
    </div>
  )
}