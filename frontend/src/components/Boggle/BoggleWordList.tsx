import React from 'react';

interface BoggleWordListProps {
  words: string[]
}

const boggleWordListStyle : React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  margin: "0 0 5px 0",
}

const h2Style : React.CSSProperties = {
  textAlign: "center"
}

const scrollingStyle : React.CSSProperties = {
  display: "flex",
  height: "100%",
  overflow: "auto"
}

export const BoggleWordList: React.FC<BoggleWordListProps> = ({ words }) => {
  return (
    <div style={boggleWordListStyle}>
      <h2 style={h2Style}>{words.length > 0 ? 'Words Found:' : 'Find Words by swiping'}</h2>
      <div style={scrollingStyle}>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  )
};