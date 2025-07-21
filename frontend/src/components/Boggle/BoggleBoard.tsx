import React, { useEffect, useState } from 'react';
import styles from './BoggleBoard.module.scss';
import { BoggleCurrentWord } from './BoggleCurrentWord';

interface BoggleBoardProps {
  board: string[][];
  onWordSubmit: (word: string, moves: { row: number, col: number }[]) => void;
}

export const BoggleBoard: React.FC<BoggleBoardProps> = ({ board, onWordSubmit }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<{ row: number, col: number }[]>([]);

  //Using a global variable to store the previous touch target
  //This way we can track if the user is moving their finger to a new cell
  //useState does not work for this because the state is not updated in time
  let prevTouchTarget: HTMLElement | null = null;
  const setPrevTouchTarget = (target: HTMLElement) => {
    prevTouchTarget = target;
  }

  useEffect(() => {
    const handleMouseUpOutside = () => {
      if (isSelecting) {
        handleMouseUp();
      }
    };

    const handleTouchEndOutside = () => {
      if (isSelecting) {
        handleMouseUp();
      }
    };

    const handleTouchMoveOutside = (evt: TouchEvent) => {
      if (isSelecting) {
        evt.preventDefault();

        const touch = evt.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);

        if (!prevTouchTarget) {
          setPrevTouchTarget(target as HTMLElement);
          return;
        }

        if (target && target instanceof HTMLElement && (target.id !== prevTouchTarget!.id)) {
          setPrevTouchTarget(target as HTMLElement);

          const targetId = target.id || "";
          if (targetId.startsWith('cell')) {
            const row = parseInt(target.getAttribute('data-row')!);
            const col = parseInt(target.getAttribute('data-col')!);
            handleMouseEnter(row, col);
          }
        }
      }
    };


    document.addEventListener('mouseup', handleMouseUpOutside);
    document.addEventListener('touchend', handleTouchEndOutside);

    document.addEventListener('touchmove', handleTouchMoveOutside, { passive: false });
    document.addEventListener('touchend', handleMouseUp, { passive: false });

    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside);
      document.removeEventListener('touchend', handleTouchEndOutside);

      document.removeEventListener('touchmove', handleTouchMoveOutside);
      document.removeEventListener('touchend', handleMouseUp);
    };

  }, [isSelecting, selectedLetters]);

  const handleMouseDown = (row: number, col: number, evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsSelecting(true);
    setSelectedLetters([{ row, col }]);
  };

  const handleMouseUp = () => {
    if (!isSelecting) {
      return;
    }
    
    prevTouchTarget = null;
    setIsSelecting(false);
    // Handle the selected letters (e.g., check if they form a valid word)

    let word = "";
    for (const { row, col } of selectedLetters) {
      word += board[row][col];
    }

    onWordSubmit(word, selectedLetters);
    setSelectedLetters([]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) {
      return;
    }
    const lastSelected = selectedLetters[selectedLetters.length - 1];
    const lastRow = lastSelected.row;
    const lastCol = lastSelected.col;
    const isAdjacent = Math.abs(row - lastRow) <= 1 && Math.abs(col - lastCol) <= 1;

    if (!isAdjacent) {
      return;
    }

    const isAlreadySelected = selectedLetters.some(sel => sel.row === row && sel.col === col);
    if (isSelecting) {
      if (isAlreadySelected && selectedLetters.length > 1) {
        setSelectedLetters(prev => prev.slice(0, -1));
        return;
      }
      if (!isAlreadySelected) {
        setSelectedLetters(prev => [...prev, { row, col }]);
      }
    }
  };

  const handleTouchStart = (row: number, col: number, evt: React.TouchEvent) => {
    evt.stopPropagation();
    const touch = evt.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    setPrevTouchTarget(target as HTMLElement);
    setIsSelecting(true);
    setSelectedLetters([{ row, col }]);
  };


  return (
    <div className={styles.boggleBoard}>
      <BoggleCurrentWord selectedLetters={selectedLetters} board={board} />
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <React.Fragment key={`row-${rowIndex}`} >
              <tr className={styles.boggleRow}>
                {row.map((letter, columnIndex) => (
                  <React.Fragment key={`cell-${columnIndex}-${rowIndex}`} >
                    <td
                      id={`cell-${rowIndex}-${columnIndex}`}
                      className={`${styles.boggleCell} ${selectedLetters.some(sel => sel.row === rowIndex && sel.col === columnIndex) ? styles.selected : ''} ${selectedLetters[selectedLetters.length - 1]?.row === rowIndex && selectedLetters[selectedLetters.length - 1]?.col === columnIndex ? styles.lastSelected : ''}`}
                      data-row={rowIndex}
                      data-col={columnIndex}
                      onMouseDown={(evt) => handleMouseDown(rowIndex, columnIndex, evt)}
                      onMouseUp={handleMouseUp}
                      onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}
                      onTouchStart={(evt) => handleTouchStart(rowIndex, columnIndex, evt)}
                    >
                      {letter}
                    </td>
                    {columnIndex !== row.length - 1 && <td className={styles.spacerCell} />}
                  </React.Fragment>
                ))}
              </tr>
              <tr className={styles.spacerRow} />
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};