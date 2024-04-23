import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isHide, setIsHide] = useState<boolean>(true);
  const nav = useNavigate();
  const translate = useTranslation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      nav("/");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log(firebaseError.message);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  const toggleHide = () => {
    setIsHide((prev) => !prev);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    const label = input.nextElementSibling;

    if (input.value.length > 0) {
      label?.classList.add("label--focused");
    } else {
      label?.classList.remove("label--focused");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="form__title">{translate("SIGNIN")}</h1>
      <div className="form__block">
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          required
          autoComplete="off"
          onChange={onChange}
          onBlur={handleBlur}
        />
        <label htmlFor="email" className="placeholder">
          {translate("FORM_EMAIL")}
        </label>
      </div>
      <div className="form__block">
        <input
          type={isHide ? "password" : "text"}
          id="password"
          name="password"
          value={password}
          required
          autoComplete="off"
          onChange={onChange}
          onBlur={handleBlur}
        />
        <label htmlFor="password" className="placeholder">
          {translate("FORM_PASSWORD")}
        </label>
        <button type="button" className="toggle-hide" onClick={toggleHide}>
          {isHide ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>
      <Link to="/users/reset-password" className="form__link">
        {translate("FORGOT_PASSWORD")}
      </Link>
      <div className="form__block">
        <button type="submit" className="form__btn-submit">
          {translate("FORM_SIGNIN")}
        </button>
      </div>
      <div className="form__block form__info">
        {translate("DONT_HAVE_ACCOUNT_LINK")}
        <Link to="/users/signup" className="form__link">
          {translate("FORM_SIGNUP")}
        </Link>
      </div>
    </form>
  );
}
