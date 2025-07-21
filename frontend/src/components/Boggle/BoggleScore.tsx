import React, { useEffect } from "react";
// import { calculateTotalScore, findAllWords } from "./BoggleService";

interface BoggleScoreProps {
  totalPopularScore: number;
  totalUserScore: number;
  style? : React.CSSProperties;
}

export const BoggleScore: React.FC<BoggleScoreProps> = ({ totalPopularScore, totalUserScore, style }) => {
  return (
    <h2 style={style}>
      <span>Score: </span>
      <span>{totalUserScore}</span>
      <span> / </span>
      <span>{totalPopularScore}</span>
    </h2>
  );
};