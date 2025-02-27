import React, { useEffect, useState } from 'react';
import styles from './BoggleBoard.module.css';

interface BoggleBoardProps {
  board: string[][];
}

export const BoggleBoard: React.FC<BoggleBoardProps> = ({ board }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<{ row: number, col: number }[]>([]);
  const [currentCell, setCurrentCell] = useState<{ row: number, col: number } | null>(null);


  useEffect(() => {
    const handleMouseUpOutside = () => {
      if (isSelecting) {
        setIsSelecting(false);
        console.log('Selected letters:', selectedLetters);
        setSelectedLetters([]);
      }
    };

    const handleTouchEndOutside = () => {
      if (isSelecting) {
        setIsSelecting(false);
        console.log('Selected letters:', selectedLetters);
        setSelectedLetters([]);
      }
    };

    document.addEventListener('mouseup', handleMouseUpOutside);
    document.addEventListener('touchend', handleTouchEndOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside);
      document.removeEventListener('touchend', handleTouchEndOutside);
    };
  }, [isSelecting, selectedLetters]);

  const handleMouseDown = (row: number, col: number, evt:React.MouseEvent) => {
    evt.preventDefault();
    setIsSelecting(true);
    setSelectedLetters([{ row, col }]);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    // Handle the selected letters (e.g., check if they form a valid word)
    console.log('Selected letters:', selectedLetters);
    setSelectedLetters([]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if(!isSelecting) {
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

      if (isAlreadySelected) {
        setSelectedLetters(prev => prev.slice(0, -1));
        return;
      }

      setSelectedLetters(prev => [...prev, { row, col }]);
    }
  };

  const handleTouchStart = (row: number, col: number, evt: React.TouchEvent) => {
    evt.preventDefault();
    setIsSelecting(true);
    setSelectedLetters([{ row, col }]);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSelecting) {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target instanceof HTMLElement) {
        const row = parseInt(target.getAttribute('data-row') || '', 10);
        const col = parseInt(target.getAttribute('data-col') || '', 10);
        if (!isNaN(row) && !isNaN(col)) {
          handleMouseEnter(row, col);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  return (
    <div className={styles.boggleBoard}>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <>
              <tr key={rowIndex} className={styles.boggleRow}>
                {row.map((letter, columnIndex) => (
                  <>
                    <td
                      key={columnIndex}
                      className={`${styles.boggleCell} ${selectedLetters.some(sel => sel.row === rowIndex && sel.col === columnIndex) ? styles.selected : ''}`}
                      data-row={rowIndex}
                      data-col={columnIndex}
                      onMouseDown={(evt) => handleMouseDown(rowIndex, columnIndex, evt)}
                      onMouseUp={handleMouseUp}
                      onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}
                      onTouchStart={(evt) => handleTouchStart(rowIndex, columnIndex, evt)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {letter}
                    </td>
                    {columnIndex !== row.length -1 && <td className={styles.spacerCell}/>}
                  </>
                ))}
              </tr>
              <tr className={styles.spacerRow}/>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};