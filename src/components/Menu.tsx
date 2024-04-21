import { useLocation, useNavigate } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { BiBell, BiSolidBell } from "react-icons/bi";

export default function Menu() {
  const location = useLocation();
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
            {location.pathname === "/" ? <GoHomeFill /> : <GoHome />}
          </div>
        </button>
        <button
          type="button"
          aria-label="Search"
          title="Search"
          onClick={() => nav("/search")}
        >
          <div className="menu-btn">
            {location.pathname === "/search" ? (
              <RiSearchFill />
            ) : (
              <RiSearchLine />
            )}
          </div>
        </button>
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => nav("/notifications")}
        >
          <div className="menu-btn">
            {location.pathname === "/notifications" ? (
              <BiSolidBell />
            ) : (
              <BiBell />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
