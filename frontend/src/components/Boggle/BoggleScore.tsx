import React, { useEffect } from "react";
// import { calculateTotalScore, findAllWords } from "./BoggleService";

interface BoggleScoreProps {
  totalPopularScore: number;
  totalUserScore: number;
  style? : React.CSSProperties;
}

export const BoggleScore: React.FC<BoggleScoreProps> = ({ totalPopularScore, totalUserScore, style }) => {

  // const [score, setScore] = React.useState(0);
  // const [totalPossibleScore, setTotalPossibleScore] = React.useState(0);


  // useEffect(() => {
  //   totalUserScore && setScore(calculateTotalScore(totalUserScore));
  // }, [totalUserScore]);

  // useEffect(() => {
  //   if(board && board.length > 0){
  //     findAllWords(board).then(words => {
  //       setTotalPossibleScore(calculateTotalScore(words));
  //     });
  //   };
  // }, [totalPopularScore]);

  return (
    <h2 style={style}>
      <span>Score: </span>
      <span>{totalUserScore}</span>
      <span> / </span>
      <span>{totalPopularScore}</span>
    </h2>
  );
};