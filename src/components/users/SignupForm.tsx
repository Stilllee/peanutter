import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isHide, setIsHide] = useState<boolean>(true);
  const nav = useNavigate();
  const translate = useTranslation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: username,
        });

        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          uid: userCredential.user.uid,
          displayName: username,
          email,
          photoURL: null,
        });
      }
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
    if (name === "username") {
      setUsername(value);
    }

    if (name === "email") {
      setEmail(value);
      const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!value?.match(validRegex)) {
        setError(translate("ERROR_INVALID_EMAIL"));
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);
      if (value?.length < 8) {
        setError(translate("ERROR_INVALID_PASSWORD"));
      } else {
        setError("");
      }
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
      <h1 className="form__title">{translate("SIGNUP")}</h1>
      <div className="form__block">
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          maxLength={10}
          required
          autoComplete="off"
          onChange={onChange}
          onBlur={handleBlur}
        />
        <label htmlFor="username" className="placeholder">
          {translate("FORM_USERNAME")}
        </label>
      </div>
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
      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        <button
          type="submit"
          className="form__btn-submit"
          disabled={error?.length > 0}
        >
          {translate("FORM_SIGNUP")}
        </button>
      </div>
      <div className="form__block form__info">
        {translate("ALREADY_HAVE_ACCOUNT_LINK")}
        <Link to="/users/login" className="form__link">
          {translate("FORM_SIGNIN")}
        </Link>
      </div>
    </form>
  );
}
