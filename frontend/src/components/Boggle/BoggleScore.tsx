import React, { useEffect } from "react";
import { calculateTotalScore, findAllWords } from "./BoggleService";

interface BoggleScoreProps {
  board: string[][];
  words: string[]
}

export const BoggleScore: React.FC<BoggleScoreProps> = ({ board, words }) => {

  const [score, setScore] = React.useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = React.useState(0);
  

  useEffect(() => {
    words && setScore(calculateTotalScore(words));
  }, [words]);

  useEffect(() => {
    board && board.length> 0 && setTotalPossibleScore(calculateTotalScore(findAllWords(board)));
  }, [board]);

  return (
    <div>
      <h2>Score: {score}</h2> 
      <h2>Total Remaining Score: {totalPossibleScore - score}</h2>
    </div>
  );
};