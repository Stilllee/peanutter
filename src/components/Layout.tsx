import { useLocation } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export default function Layout({ children, isAuthenticated }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="layout">
      {isAuthenticated && !isHome && <Header />}
      {children}
      {isAuthenticated && <Menu />}
    </div>
  );
}
