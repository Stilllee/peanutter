import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isHide, setIsHide] = useState<boolean>(true);
  const nav = useNavigate();

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
      <h1 className="form__title">Sign in to PeaNutter</h1>
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
          Email Adress
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
          Password
        </label>
        <button type="button" className="toggle-hide" onClick={toggleHide}>
          {isHide ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>
      <Link to="/users/reset-password" className="form__link">
        Forgot password?
      </Link>
      <div className="form__block">
        <button type="submit" className="form__btn-submit">
          Sign in
        </button>
      </div>
      <div className="form__block form__info">
        Don't have an account?
        <Link to="/users/signup" className="form__link">
          Sign up
        </Link>
      </div>
    </form>
  );
}
