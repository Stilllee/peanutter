import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiLogoutBoxRLine, RiSearchFill, RiSearchLine } from "react-icons/ri";
import { BiBell, BiSolidBell } from "react-icons/bi";
import useTranslation from "hooks/useTranslation";
import { TbBrandPeanut } from "react-icons/tb";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { app } from "firebaseApp";

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

export default function Menu() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const nav = useNavigate();
  const translate = useTranslation();

  return (
    <div className="menu footer">
      <div className="menu__grid">
        <button
          className="menu__grid-tablet"
          type="button"
          aria-label={translate("HEADER_LOGO")}
          title={translate("HEADER_PEANUTTER")}
          onClick={() => nav("/")}
        >
          <div className="menu-btn logo">
            <TbBrandPeanut />
          </div>
        </button>
        <button
          type="button"
          aria-label={translate("MENU_HOME")}
          title={translate("MENU_HOME")}
          onClick={() => nav("/")}
        >
          <div className="menu-btn">
            {location.pathname === "/" ? <GoHomeFill /> : <GoHome />}
            <span className="menu__grid-text">{translate("MENU_HOME")}</span>
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
            <span className="menu__grid-text">{translate("MENU_SEARCH")}</span>
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
            <span className="menu__grid-text">
              {translate("MENU_NOTIFICATION")}
            </span>
          </div>
        </button>
        <button
          className="menu__grid-tablet"
          type="button"
          aria-label={translate("HEADER_PROFILE")}
          title={translate("HEADER_PROFILE")}
          onClick={() => nav("/profile")}
        >
          <div className="menu-btn">
            <img
              src={user?.photoURL || PROFILE_DEFAULT_URL}
              alt="user's profile"
              className="header__profile-img"
            />
            <span className="menu__grid-text">
              {translate("HEADER_PROFILE")}
            </span>
          </div>
        </button>
        <button
          className="menu__grid-tablet log-btn"
          type="button"
          aria-label={translate("HEADER_LOGOUT")}
          title={translate("HEADER_LOGOUT")}
          onClick={async () => {
            const auth = getAuth(app);
            await signOut(auth);
          }}
        >
          <div className="menu-btn">
            <RiLogoutBoxRLine />
            <span className="menu__grid-text">
              {translate("HEADER_LOGOUT")}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
