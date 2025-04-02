interface MenuSVGProps {
  height?: string;
  width?: string;
  style?: React.CSSProperties;
}

const MenuSVG: React.FC<MenuSVGProps> = ({ height, width, style }) => {
  const thisHeight = height || '24px';
  const thisWidth = width || '24px';
  console.log(thisHeight);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={thisHeight} width={thisWidth} style={style} viewBox="0 -960 960 960"  fill="#e3e3e3">
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  )
}

export default MenuSVG;