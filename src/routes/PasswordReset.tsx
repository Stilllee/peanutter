import styled from "styled-components";
import {
  Wrapper,
  Logo,
  Input,
  Title,
  Form,
} from "../components/auth-components";
import React, { useState } from "react";
import CloseModalButton from "../components/common/Modal/CloseModalButton";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useModal } from "../hooks/useCustomModal";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  min-width: 340px;
  font-size: 15px;
  line-height: 20px;
  margin: 8px 0 33px 0;
  color: ${({ theme }) => theme.darkGray};
`;

const EmailInput = styled(Input)`
  width: 100%;
`;

const ResetPwSubmit = styled(Input)`
  width: 100%;
`;

interface FirebaseError {
  code?: string;
  message: string;
}

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const { openModal, closeModal } = useModal();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    }
  };

  const onResetPw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("비밀번호 재설정 이메일을 보냈습니다. 이메일을 확인해주세요.");
      openModal("logIn");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log(firebaseError.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          <Logo />
          계정 찾기
        </Title>
        <Text>비밀번호를 변경하려면 계정에 연결된 이메일을 입력해 주세요.</Text>
        <Form onSubmit={onResetPw}>
          <EmailInput
            onChange={onChange}
            name="email"
            value={email}
            placeholder="이메일"
            type="email"
            required
          />
          <ResetPwSubmit
            type="submit"
            value={"비밀번호 재설정 이메일 보내기"}
          />
        </Form>
        <CloseModalButton onClose={closeModal} />
      </Wrapper>
    </Container>
  );
};

export default PasswordReset;
