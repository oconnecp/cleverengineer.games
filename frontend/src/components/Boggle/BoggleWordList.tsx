import React from 'react';
import styles from './BoggleBoard.module.scss';


interface BoggleWordsProps {
  words: string[]
}

export const BoggleWordList:React.FC<BoggleWordsProps> = ({words}) => {
  return (
    <div className={styles.boggleWordList}>
      <h2>{words.length > 0 ? 'Words Found:' : 'Find Words by swiping'}</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  )
};