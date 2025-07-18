import React from 'react';

interface BoggleWordListProps {
  words: string[]
}

const boggleWordListStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  margin: "0 0 5px 0",
}

const h2Style: React.CSSProperties = {
  textAlign: "center"
}

const scrollingStyle: React.CSSProperties = {
  display: "flex",
  height: "100%",
  overflow: "auto"
}

const spacerStyle: React.CSSProperties = {
  width: "25%",
}
const listStyle: React.CSSProperties = {
  width: "100%",
  listStyleType: "none",
  textAlign: "center",
}

export const BoggleWordList: React.FC<BoggleWordListProps> = ({ words }) => {
  return (
    <div style={boggleWordListStyle}>
      <h2 style={h2Style}>{words.length > 0 ? 'Words Found:' : 'Find Words by swiping'}</h2>
      <div style={scrollingStyle}>
        <div style={spacerStyle}/>
        {/* todo: refactor so that we get rid of the ul styling */}
        <div style={listStyle}>
          {words.map((word, index) => (
            index % 2 === 0 && (<div key={index}>{word}</div>)
          ))}
        </div>
        <div style={listStyle}>
          {words.map((word, index) => (
            index % 2 === 1 && (<div key={index}>{word}</div>)
          ))}
        </div>
        <div style={spacerStyle}/>
      </div>
    </div>
  )
};