import React, { useState } from "react";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Logo,
  Wrapper,
  Input,
  Switcher,
  Title,
  Error,
  Form,
} from "../components/auth-components";
import CloseModalButton from "../components/common/Modal/CloseModalButton";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import { useModal } from "../hooks/useCustomModal";

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

const LoginForm = styled(Form)`
  margin-top: 7px;
  a {
    cursor: pointer;
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
  width: 100%;
`;

const LogIn = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { openModal, closeModal } = useModal();

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
          <div>
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
            <a onClick={() => openModal("passwordReset")}>비밀번호찾기</a>
          </div>
          <LoginSubmit
            type="submit"
            value={isLoading ? "로그인 중..." : "로그인하기"}
          />
        </LoginForm>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          계정이 없으신가요?{" "}
          <a onClick={() => openModal("createAccount")}>가입하기</a>
        </Switcher>
        <CloseModalButton onClose={closeModal} />
      </Wrapper>
    </Container>
  );
};

export default LogIn;
