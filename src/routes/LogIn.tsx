import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
  Error,
} from "../components/auth-components";
import { TbBrandPeanut } from "react-icons/tb";
import Button from "../components/LandingPage/Button";
import CloseModalButton from "../components/common/Modal/CloseModalButton";

const errors = {
  "auth/email-already-in-use": "이미 사용중인 이메일입니다.",
};

const Container = styled.div`
  position: relative;
`;

const ResetPwBtn = styled(Button)``;

const LogIn = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      navigate("/home");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onResetPw = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("변경 메일 발송 완료");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          Log into <TbBrandPeanut />
        </Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            onChange={onChange}
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            required
          />
          <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <ResetPwBtn onClick={onResetPw}>비밀번호를 잊으셨나요?</ResetPwBtn>
        <Switcher>
          계정이 없으신가요? <Link to="/create-account">가입하기</Link>
        </Switcher>
        <CloseModalButton />
      </Wrapper>
    </Container>
  );
};

export default LogIn;
