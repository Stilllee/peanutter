import { useNavigate } from "react-router-dom";

export default function LocalSign() {
  const nav = useNavigate();
  return (
    <div className="local-sign">
      <button
        className="signup-btn"
        type="button"
        onClick={() => nav("/users/signup")}
      >
        Create an account
      </button>
      <p>Already have an account?</p>
      <button type="button" onClick={() => nav("/users/login")}>
        Sign in
      </button>
    </div>
  );
}
