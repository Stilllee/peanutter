import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { BiBell } from "react-icons/bi";

export default function Menu() {
  const nav = useNavigate();
  return (
    <div className="menu footer">
      <div className="menu__grid">
        <button
          type="button"
          aria-label="Home"
          title="Home"
          onClick={() => nav("/")}
        >
          <div className="menu-btn">
            <GoHome />
          </div>
        </button>
        <button
          type="button"
          aria-label="Search"
          title="Search"
          onClick={() => nav("/search")}
        >
          <div className="menu-btn">
            <RiSearchLine />
          </div>
        </button>
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => nav("/notifications")}
        >
          <div className="menu-btn">
            <BiBell />
          </div>
        </button>
      </div>
    </div>
  );
}
