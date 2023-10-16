import styled from "styled-components";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import {
  Input,
  Switcher,
  Title,
  Wrapper,
  Error,
  Logo,
  Form,
} from "../components/auth-components";
import CloseModalButton from "../components/common/Modal/CloseModalButton";
import { useModal } from "../hooks/useCustomModal";

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

const SignUpForm = styled(Form)`
  margin-top: 7px;
`;

const SignUpInput = styled(Input)`
  width: 100%;
  margin: 26px 0 1px 0;
`;

const SignUpSubmit = styled(Input)`
  width: 100%;
`;

const CreateAccount = () => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");

  const { openModal, closeModal } = useModal();

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
      openModal("logIn");
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
            value={isLoading ? "가입 중..." : "가입하기"}
          />
        </SignUpForm>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          이미 계정이 있으신가요?{" "}
          <a onClick={() => openModal("logIn")}>로그인</a>
        </Switcher>
        <CloseModalButton onClose={closeModal} />
      </Wrapper>
    </Container>
  );
};

export default CreateAccount;
