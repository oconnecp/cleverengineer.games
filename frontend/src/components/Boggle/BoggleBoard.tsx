import React from 'react';

interface BoggleBoardProps {
  board: string[][];    
}

export const BoggleBoard: React.FC<BoggleBoardProps> = ({board}) => {
  return (
    <div className="boggle-board">
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex} className="boggle-row">
              {row.map((letter, columnIndex) => (
                <td key={columnIndex} className="boggle-cell">
                  {letter}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
    </table>
    </div >
  )
}