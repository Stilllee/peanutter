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
        <div>{leftChild}</div>
        <div className="header__grid-center">{centerChild}</div>
        <div>{rightChild}</div>
      </div>
    </header>
  );
}
