import React, { useEffect } from "react";
import { calculateTotalScore, findAllWords } from "./BoggleService";

interface BoggleScoreProps {
  board: string[][];
  words: string[];
  style? : React.CSSProperties;
}

export const BoggleScore: React.FC<BoggleScoreProps> = ({ board, words, style }) => {

  const [score, setScore] = React.useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = React.useState(0);


  useEffect(() => {
    words && setScore(calculateTotalScore(words));
  }, [words]);

  useEffect(() => {
    if(board && board.length > 0){
      findAllWords(board).then(words => {
        setTotalPossibleScore(calculateTotalScore(words));
      });
    };
  }, [board]);

  return (
    <h2 style={style}>
      <span>Score: </span>
      <span>{score}</span>
      <span> / </span>
      <span>{totalPossibleScore}</span>
    </h2>
  );
};