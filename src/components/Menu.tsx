import { useLocation, useNavigate } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { BiBell, BiSolidBell } from "react-icons/bi";
import useTranslation from "hooks/useTranslation";

export default function Menu() {
  const location = useLocation();
  const nav = useNavigate();
  const translate = useTranslation();

  return (
    <div className="menu footer">
      <div className="menu__grid">
        <button
          type="button"
          aria-label={translate("MENU_HOME")}
          title={translate("MENU_HOME")}
          onClick={() => nav("/")}
        >
          <div className="menu-btn">
            {location.pathname === "/" ? <GoHomeFill /> : <GoHome />}
          </div>
        </button>
        <button
          type="button"
          aria-label={translate("MENU_SEARCH")}
          title={translate("MENU_SEARCH")}
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
          aria-label={translate("MENU_NOTIFICATION")}
          title={translate("MENU_NOTIFICATION")}
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
