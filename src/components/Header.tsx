interface NewHeaderProps {
  leftChild?: React.ReactNode;
  centerChild: React.ReactNode;
  rightChild?: React.ReactNode;
}

export default function Header({
  leftChild,
  centerChild,
  rightChild,
}: NewHeaderProps) {
  return (
    <header className="header">
      <div className="header__flex header__grid">
        <div className="header__grid-left">{leftChild}</div>
        <div className="header__grid-center">{centerChild}</div>
        <div className="header__grid-right">{rightChild}</div>
      </div>
    </header>
  );
}
