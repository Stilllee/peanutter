import ResetPasswordForm from "components/users/ResetPasswordForm";
import useTranslation from "hooks/useTranslation";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const nav = useNavigate();
  const translate = useTranslation();

  return (
    <>
      <div className="form__btn-back">
        <button
          type="button"
          aria-label={translate("HEADER_BACK")}
          title={translate("HEADER_BACK")}
          onClick={() => nav(-1)}
        >
          <div className="menu-btn">
            <HiArrowLeft />
          </div>
        </button>
      </div>
      <ResetPasswordForm />
    </>
  );
}
