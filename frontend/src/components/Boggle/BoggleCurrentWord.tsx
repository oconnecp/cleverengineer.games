import styles from './BoggleBoard.module.scss';

interface BoggleCurrentWordProps {
  selectedLetters: { row: number, col: number }[];
  board: string[][];
}


export const BoggleCurrentWord: React.FC<BoggleCurrentWordProps> = ({ selectedLetters, board }) => {
  let word = "";
  for (const { row, col } of selectedLetters) {
    //concatenate the letters of the selected letters
    //use toUpperCase to fix Qu bug
    word += board[row][col].toUpperCase();
  }

  return (
    <div className={styles.currentWord}>
      <h2>{word}</h2>
    </div>
  );
}