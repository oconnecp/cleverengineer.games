import './App.css'
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastHandler } from './components/Toast/ToastHandler'
import { Hamburger } from './components/Hamburger/Hamburger'
import { GithubLogoSVG } from './assets/GithubLogo'
import { LinkedInLogoSVG } from './assets/LinkedInLogo'
import { FeatureFlags } from './components/FeatureFlags/FeatureFlags'
import { Features } from './components/FeatureFlags/FeatureService';
import { PersonSVG } from './assets/PersonSVG';
import { GameIconSVG } from './assets/GameIconSVG';
import Login from './components/Authentication/Login';
import { FeatureFlagWrapper } from './components/FeatureFlags/FeatureFlagWrapper';
import { InfoSVG } from './assets/InfoSVG';

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

  console.log("Features", Features);

  return (
    <BrowserRouter>
      <Hamburger>
        <Link to="/">
          <div style={linkContainerStyle}>
            <div style={svgContainerStyle}><GameIconSVG /></div>
            <div>Game</div>
          </div>
        </Link>
        <Link to="/about">
          <div style={linkContainerStyle}>
            <div style={svgContainerStyle}><InfoSVG /></div>
            <div>About</div>
          </div>
        </Link>
        <FeatureFlagWrapper featureId="LOGIN">
        <Link to="/login">
          <div style={linkContainerStyle}>
            <div style={svgContainerStyle}><PersonSVG /></div>
            <div>Login</div>
          </div>
        </Link>
        </FeatureFlagWrapper>
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

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setfeature/:featureId" element={<FeatureFlags/>} />
          <Route path="*" element={<BoggleGame />} />
        </Routes>
      </Suspense>

      <ToastHandler />
    </BrowserRouter>
  )
}

export default App
