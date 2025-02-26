import React from 'react';
import {BoggleBoard} from './BoggleBoard';
import { generateBoard, isValidWord } from './BoggleService';

export default function BoggleGame() {

  let board = generateBoard();
  let words = new Set<string>();
  let currentWord = "";
  
  return (
    <div className="boggle-game">
      <h1>Boggle</h1>
      <BoggleBoard board={board} />
    </div>
  )
}