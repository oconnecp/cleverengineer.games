import React, { useState, useLayoutEffect } from 'react';
import MenuSVG from '../../assets/MenuSVG'

interface HamburgerProps {
  children?: React.ReactNode;
}

export const Hamburger: React.FC<HamburgerProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  const hamburgerWideStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    backgroundColor: "#f0f0f0",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100
  }

  if (width > 768) {
    return (
      <div style={hamburgerWideStyle}>
        {children}
      </div>
    )
  }

  const hamburgerThinStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
  }

  return (
    <div>
      <div
        style={hamburgerThinStyle}
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <MenuSVG />
      </div>
      {drawerOpen && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

//<a target="_blank" href="https://icons8.com/icon/106562/github">GitHub</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>