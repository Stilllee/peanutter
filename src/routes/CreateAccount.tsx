import styled from "styled-components";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Input,
  Switcher,
  Title,
  Wrapper,
  Error,
  Logo,
} from "../components/auth-components";
import CloseModalButton from "../components/common/Modal/CloseModalButton";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import { device } from "../constants/breakpoints";

/* 
// 에러핸들링 예정

const errors = {
  "auth/email-already-in-use": "이미 사용중인 이메일입니다.",
}; 
*/

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SignUpForm = styled.form`
  margin-top: 7px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${device.tablet} {
    height: 70%;
  }
`;

const SignUpInput = styled(Input)`
  width: 100%;
  margin: 26px 0 1px 0;
`;

const SignUpSubmit = styled(Input)`
  width: 100%;
  height: 52px !important;
  border-radius: 30px !important;
`;

const CreateAccount = () => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");

  const { navigateTo } = useCustomNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassowrd(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name == "" || email == "" || password == "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigateTo("/login", true);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <Logo /> 계정 생성
        </Title>
        <SignUpForm onSubmit={onSubmit}>
          <div>
            <SignUpInput
              onChange={onChange}
              name="name"
              value={name}
              placeholder="Name"
              type="text"
              required
            />
            <SignUpInput
              onChange={onChange}
              name="email"
              value={email}
              placeholder="Email"
              type="email"
              required
            />
            <SignUpInput
              onChange={onChange}
              name="password"
              value={password}
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <SignUpSubmit
            type="submit"
            value={isLoading ? "Loading..." : "가입하기"}
          />
        </SignUpForm>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </Switcher>
        <CloseModalButton />
      </Wrapper>
    </Container>
  );
};

export default CreateAccount;
