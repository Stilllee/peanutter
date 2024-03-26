import Header from "./Header";
import Menu from "./Menu";

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export default function Layout({ children, isAuthenticated }: LayoutProps) {
  return (
    <div className="layout">
      {isAuthenticated && <Header />}
      {children}
      {isAuthenticated && <Menu />}
    </div>
  );
}
