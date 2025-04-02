import React, { useEffect } from 'react';
import { BoggleBoard } from './BoggleBoard';
import { generateBoard, isValidWord } from './BoggleService';
import { BoggleScore } from './BoggleScore';
import { BoggleWordList } from './BoggleWordList';
import { ToastTypeEnum, triggerToast } from '../Toast/ToastService';
import { AddCircleSVG } from '../../assets/AddCircleSVG'

export default function BoggleGame() {

  const [words, setWords] = React.useState<string[]>([]);
  const [board, setBoard] = React.useState<string[][]>([]);

  useEffect(() => {
    setBoard(generateBoard());
  }, []);

  const handleWordSubmit = async (word: string) => {
    const prettyWord = `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

    if (prettyWord.length < 3) {
      triggerToast({
        message: `${prettyWord} is too short`,
        type: ToastTypeEnum.OVERWRITE,
        duration: 2000
      })
      return;
    }

    const thisWordValid = await isValidWord(prettyWord);
    if (!thisWordValid) {
      triggerToast({
        message: `${prettyWord} not found in dictionary`,
        type: ToastTypeEnum.OVERWRITE,
        duration: 2000
      })
      return;
    }

    if (words.indexOf(prettyWord) > -1) {
      triggerToast({
        message: `${prettyWord} already found`,
        type: ToastTypeEnum.OVERWRITE,
        duration: 2000
      })
      return;
    }

    setWords([...words, prettyWord]);

  }

  const handleNewGame = () => {
    // later we can do this on the backend
    setBoard(generateBoard());
    setWords([]);
  }

  const boggleGameStyle: React.CSSProperties = {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflow: "hidden",
  }

  const boggleHeader: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }

  const boggleControlsStyle: React.CSSProperties = {
    display: "flex",
  }

  const boggleControlChildStyle: React.CSSProperties = {
    margin: "auto",
  }
  const svgButtonStyle: React.CSSProperties = {
    ...boggleControlChildStyle,
    textAlign: "center",
    padding: "4px",
    display: "flex",
  }

  const circleSVGStyle: React.CSSProperties = {
    marginRight: "4px",
  }

  return (
    <div className="boggle-game" style={boggleGameStyle}>
      <div className='boggle-header' style={boggleHeader}>
        <h1>Boggle</h1>
      </div>
      <div style={boggleControlsStyle}>
        <button style={svgButtonStyle} onClick={handleNewGame}>
          <AddCircleSVG style={circleSVGStyle}></AddCircleSVG>
          <span>New Game</span>
        </button>
        <BoggleScore style={boggleControlChildStyle}
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