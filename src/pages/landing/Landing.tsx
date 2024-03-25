import LocalSign from "components/landing/LocalSign";
import SocialLogin from "components/landing/SocialLogin";
import { TbBrandPeanut } from "react-icons/tb";

export default function Landing() {
  return (
    <div className="landing">
      <div className="auth-form">
        <TbBrandPeanut className="logo" />
        <p className="auth-form__title">Happening now</p>
        <p className="auth-form__subtitle">Join today.</p>
        <div className="auth-form__sign-area">
          <SocialLogin />
          <div className="or-box">
            <div className="or-box__line" />
            <span>Or</span>
            <div className="or-box__line" />
          </div>
          <LocalSign />
        </div>
      </div>
    </div>
  );
}
