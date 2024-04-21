import Header from "components/Header";
import AuthContext from "context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const PROFILE_DEFAULT_URL = "/src/assets/profile.webp";

export default function Notifications() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <>
      <Header
        leftChild={
          <button
            type="button"
            aria-label="Profile"
            title="Profile"
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
        }
        centerChild={"Notifications"}
      />
    </>
  );
}
