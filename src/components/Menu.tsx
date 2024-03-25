import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { BiBell } from "react-icons/bi";

export default function Menu() {
  const nav = useNavigate();
  return (
    <div className="menu">
      <div className="menu__grid">
        <button type="button" onClick={() => nav("/")}>
          <GoHome />
        </button>
        <button type="button" onClick={() => nav("/search")}>
          <RiSearchLine />
        </button>
        <button type="button" onClick={() => nav("/notifications")}>
          <BiBell />
        </button>
      </div>
    </div>
  );
}
