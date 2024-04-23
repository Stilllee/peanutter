import useTranslation from "hooks/useTranslation";
import { useNavigate } from "react-router-dom";

export default function LocalSign() {
  const nav = useNavigate();
  const translate = useTranslation();

  return (
    <div className="local-sign">
      <button
        className="signup-btn"
        type="button"
        onClick={() => nav("/users/signup")}
      >
        {translate("FORM_SIGNUP")}
      </button>
      <p>{translate("ALREADY_HAVE_ACCOUNT")}</p>
      <button type="button" onClick={() => nav("/users/login")}>
        {translate("FORM_SIGNIN")}
      </button>
    </div>
  );
}
