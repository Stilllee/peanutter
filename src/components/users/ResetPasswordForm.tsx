import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "firebaseApp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const nav = useNavigate();

  const onResetPw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      nav("/");
      toast("Email sent. Please check your inbox.");
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
    <form className="form" onSubmit={onResetPw}>
      <h1 className="form__title">Find your account</h1>
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
        <button type="submit" className="form__btn-submit">
          Send Email
        </button>
      </div>
    </form>
  );
}
