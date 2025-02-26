import React from 'react';

interface BoggleBoardProps {
  board: string[][];    
}

export const BoggleBoard: React.FC<BoggleBoardProps> = ({board}) => {
  return (
    <div className="boggle-board">
      <table>
        <tbody>
          {board.map((row, i) => (
            <tr key={i} className="boggle-row">
              {row.map((letter, j) => (
                <td key={j} className="boggle-cell">
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