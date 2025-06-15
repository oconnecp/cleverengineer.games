import './App.css'
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastHandler } from './components/Toast/ToastHandler'
import { Hamburger } from './components/Hamburger/Hamburger'
import { GithubLogoSVG } from './assets/GithubLogo'
import { LinkedInLogoSVG } from './assets/LinkedInLogo'
import User from './components/Authentication/User'
import { PersonSVG } from './assets/PersonSVG';
import { GameIconSVG } from './assets/GameIconSVG';

const About = React.lazy(() => import("./components/About/About"));
const BoggleGame = React.lazy(() => import("./components/Boggle/BoggleGame"));


function App() {
  const linkContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "end",
    marginRight: "5px",
  }

  const svgContainerStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
    marginRight: "2px",
  }

  return (
    <>
      <Hamburger>
        <a href="/">
          <div style={linkContainerStyle}>
            <div style={svgContainerStyle}><GameIconSVG /></div>
            <div>Home</div>
          </div>
        </a>
        <a href="/about">
          <div style={linkContainerStyle}>
            <div style={svgContainerStyle}><PersonSVG /></div>
            <div>About</div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/ChristopherOConnellDeveloper/">
          <div style={linkContainerStyle}>
            <div style={svgContainerStyle}><LinkedInLogoSVG /></div>
            <div>LinkedIn</div>
          </div>
        </a>
        <a href="https://www.github.com/oconnecp">
          <div style={linkContainerStyle}>
            <div style={svgContainerStyle}><GithubLogoSVG /></div>
            <div>Github</div>
          </div>
        </a>
      </Hamburger>
      {/* <User></User> */}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>

          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<BoggleGame />} />

          </Routes>
        </Suspense>

      </BrowserRouter>
      <ToastHandler />
    </>
  )
}

export default App
