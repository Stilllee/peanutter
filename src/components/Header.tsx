import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useContext } from "react";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import { TbBrandPeanut } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <header className="header">
      <div className="header__flex">
        <button
          type="button"
          aria-label="Profile"
          title="Profile"
          onClick={() => nav("/")}
        >
          <div className="menu-btn">
            <img
              src="/src/assets/profile.webp"
              alt="user's profile"
              className="header__profile-img"
            />
          </div>
        </button>
        <button
          type="button"
          aria-label="Home"
          title="Home"
          onClick={() => nav("/search")}
        >
          <div className="menu-btn logo">
            <TbBrandPeanut />
          </div>
        </button>
        <button
          type="button"
          aria-label={user === null ? "Login" : "Logout"}
          title={user === null ? "Login" : "Logout"}
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
