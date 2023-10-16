import styled from "styled-components";
import { TbBrandPeanut } from "react-icons/tb";
import { Input, Title } from "../components/auth-components";
import { useState } from "react";
import CloseModalButton from "../components/common/Modal/CloseModalButton";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 40px 60px 0 60px;
`;

const Logo = styled(TbBrandPeanut)`
  margin: 0 10px;
`;

const Text = styled.p`
  font-size: 15px;
  margin: 8px 0 33px 0;
  color: ${({ theme }) => theme.darkGray};
`;

const ResetPwForm = styled.form``;

const EmailInput = styled(Input)`
  width: 100%;
`;

const ResetPwSubmit = styled(Input)`
  width: 440px;
  height: 52px !important;
  border-radius: 30px !important;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0 60px;
`;

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          내 <Logo />
          계정 찾기
        </Title>
        <Text>비밀번호를 변경하려면 계정에 연결된 이메일을 입력해 주세요.</Text>
        <ResetPwForm>
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
        </ResetPwForm>
        <CloseModalButton />
      </Wrapper>
    </Container>
  );
};

export default PasswordReset;
