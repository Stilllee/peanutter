import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "firebaseApp";
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
        setError("Please enter a valid email.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);
      if (value?.length < 8) {
        setError(
          "Your password needs to be at least 8 characters. Please enter a longer one."
        );
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
      <h1 className="form__title">Create your accont</h1>
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
          Username
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
          Create an account
        </button>
      </div>
      <div className="form__block form__info">
        Already have an account?
        <Link to="/users/login" className="form__link">
          Sign in
        </Link>
      </div>
    </form>
  );
}
