import LocalSign from "components/landing/LocalSign";
import SocialLogin from "components/landing/SocialLogin";
import useTranslation from "hooks/useTranslation";
import { TbBrandPeanut } from "react-icons/tb";

export default function Landing() {
  const translate = useTranslation();
  return (
    <div className="landing">
      <div className="auth-form">
        <TbBrandPeanut className="logo" />
        <p className="auth-form__title">{translate("TITLE")}</p>
        <p className="auth-form__subtitle">{translate("SUBTITLE")}</p>
        <div className="auth-form__sign-area">
          <SocialLogin />
          <div className="or-box">
            <div className="or-box__line" />
            <span>{translate("OR")}</span>
            <div className="or-box__line" />
          </div>
          <LocalSign />
        </div>
      </div>
    </div>
  );
}
