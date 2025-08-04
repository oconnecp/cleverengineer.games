import React, { useEffect } from 'react';
import { BoggleBoard } from './BoggleBoard';
import { newGame, makeMove, GameResponseType } from './BoggleService';
import { BoggleScore } from './BoggleScore';
import { BoggleWordList } from './BoggleWordList';
import { ToastTypeEnum, triggerToast } from '../Toast/ToastService';
import { AddCircleSVG } from '../../assets/AddCircleSVG'
import BoggleTimer from './BoggleTimer';

const standardGameDuration = 180000; // 3 minutes in milliseconds
const bufferTime = 1000; // 1 second buffer for network delay
const totalGameDuration = standardGameDuration + bufferTime; // 3 minutes with 1 second buffer for render delay

export default function BoggleGame() {
  const [words, setWords] = React.useState<string[]>([]);
  const [board, setBoard] = React.useState<string[][]>([]);
  const [gameId, setGameId] = React.useState<string | null>(null);
  const [totalPopularScore, setTotalPopularScore] = React.useState<number>(0);
  const [totalUserScore, setTotalUserScore] = React.useState<number>(0);
  const [endTimeStamp, setEndTimeStamp] = React.useState<number | null>(null);

  useEffect(() => {
    handleNewGame();
  }, []);

  const handleWordSubmit = async (word: string, moves: { row: number, col: number }[]) => {
    makeMove(gameId!, word, moves).then((updatedGame: GameResponseType) => {
      setWords(updatedGame.wordsFound);
      setTotalUserScore(updatedGame.totalUserScore);
    }).catch((error) => {
      console.error("Error submitting word:", error);
      triggerToast({
        message: error.message,
        type: ToastTypeEnum.ERROR,
        duration: 2000
      });
    });
  }

  const handleNewGame = () => {
    newGame().then((newGame) => {
      setBoard(newGame.board);
      setWords([]);
      setGameId(newGame.id);
      setTotalPopularScore(newGame.totalPopularScore);
      setTotalUserScore(newGame.totalUserScore);
      setEndTimeStamp(newGame.createdAt + totalGameDuration); // 3 minutes with 1 seconds buffer for network delay
    }).catch((error) => {
      console.error("Error starting new game:", error);
      triggerToast({
        message: error.message,
        type: ToastTypeEnum.ERROR,
        duration: 2000
      });
    });
  }

  const boggleGameStyle: React.CSSProperties = {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflow: "hidden",
  }

  const boggleHeader: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  }

  const boggleControlsStyle: React.CSSProperties = {
    display: "flex",
  }

  const boggleTimerStyle: React.CSSProperties = {
    marginRight: "auto",
  }
  const svgButtonStyle: React.CSSProperties = {
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
        <button style={svgButtonStyle} onClick={handleNewGame}>
          <AddCircleSVG style={circleSVGStyle}></AddCircleSVG>
          <span>New Game</span>
        </button>
      </div>
      <div style={boggleControlsStyle}>
        <BoggleTimer style={boggleTimerStyle} endTimestamp={endTimeStamp}></BoggleTimer>
        <BoggleScore
          totalPopularScore={totalPopularScore}
          totalUserScore={totalUserScore}
        />
      </div>
      <BoggleBoard
        board={board}
        onWordSubmit={(word, moves) => handleWordSubmit(word, moves)}
      />
      <BoggleWordList words={words} />
    </div>
  )
}