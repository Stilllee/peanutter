import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { useContext } from "react";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import { TbBrandPeanut } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

export default function MobileHeader() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const translate = useTranslation();

  return (
    <header className="header">
      <div className="header__flex">
        <button
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
          </div>
        </button>
        <button
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
          aria-label={
            user === null
              ? translate("HEADER_LOGIN")
              : translate("HEADER_LOGOUT")
          }
          title={
            user === null
              ? translate("HEADER_LOGIN")
              : translate("HEADER_LOGOUT")
          }
          onClick={
            user === null
              ? () => nav("/login")
              : async () => {
                  const auth = getAuth(app);
                  await signOut(auth);
                }
          }
        >
          <div className="menu-btn">
            {user === null ? <RiLoginBoxLine /> : <RiLogoutBoxRLine />}
          </div>
        </button>
      </div>
    </header>
  );
}
