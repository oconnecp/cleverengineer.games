import { useState, useLayoutEffect } from 'react'
import './App.css'
import BoggleGame from './components/Boggle/BoggleGame'
import { ToastHandler } from './components/Toast/ToastHandler'
import { Hamburger } from './components/Hamburger/Hamburger'

function App() {
  return (
    <>
      <Hamburger>
        <a href="https://www.linkedin.com/in/ChristopherOConnellDeveloper/">LinkedIn</a>
        <a href="https://www.github.com/oconnecp">GitHub</a>
      </Hamburger>
      <BoggleGame />
      <ToastHandler />
    </>
  )
}

export default App
