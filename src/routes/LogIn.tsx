import React, { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Logo,
  Input,
  Switcher,
  Title,
  Error,
} from "../components/auth-components";
import CloseModalButton from "../components/common/Modal/CloseModalButton";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import { device } from "../constants/breakpoints";

/* 
에러메세지 추후 구현예정

const errors = {
  "auth/email-already-in-use": "이미 사용중인 이메일입니다.",
}; 
*/

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  min-width: 340px;
  min-height: 280px;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 40px 60px 0 60px;
`;

const LoginForm = styled.form`
  margin-top: 7px;

  & > a {
    font-size: 13px;
    font-weight: 700;
    margin-left: 8px;
    color: ${({ theme }) => theme.hoverYellow};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginInput = styled(Input)`
  width: 100%;
  margin: 26px 0 1px 0;
`;

const LoginSubmit = styled(Input)`
  width: 440px !important;
  height: 52px !important;
  border-radius: 30px !important;
  position: absolute;
  bottom: 35px;
  left: 0;
  margin: 0 60px;

  @media ${device.tablet}, ${device.mobile} {
    width: 340px !important;
  }
`;

const LogIn = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { navigateTo } = useCustomNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email == "" || password == "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigateTo("/home", true);
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
          <Logo />
          로그인
        </Title>
        <LoginForm onSubmit={onSubmit}>
          <LoginInput
            onChange={onChange}
            name="email"
            value={email}
            placeholder="이메일"
            type="email"
            required
          />
          <LoginInput
            onChange={onChange}
            name="password"
            value={password}
            placeholder="비밀번호"
            type="password"
            required
          />
          <LoginSubmit
            type="submit"
            value={isLoading ? "Loading..." : "로그인하기"}
          />
          <Link to={"/password_reset"}>비밀번호찾기</Link>
        </LoginForm>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          계정이 없으신가요? <Link to="/create_account">가입하기</Link>
        </Switcher>
        <CloseModalButton />
      </Wrapper>
    </Container>
  );
};

export default LogIn;
