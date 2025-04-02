import './App.css'
import BoggleGame from './components/Boggle/BoggleGame'
import { ToastHandler } from './components/Toast/ToastHandler'
import { Hamburger } from './components/Hamburger/Hamburger'
import { GithubLogoSVG } from './assets/GithubLogo'
import { LinkedInLogoSVG } from './assets/LinkedInLogo'

function App() {
  const linkContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "end",
    marginRight: "3px",
  }

  const svgContainerStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
  }


  return (
    <>
      <Hamburger>
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
      <BoggleGame />
      <ToastHandler />
    </>
  )
}

export default App
