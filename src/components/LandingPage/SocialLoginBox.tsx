import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialLoginBtn = styled(Button)`
  color: ${({ theme }) => theme.darkGray};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const SocialLoginBox = () => {
  return (
    <Container>
      <SocialLoginBtn aria-label="Google에서 가입하기">
        <FcGoogle />
        Google에서 가입하기
      </SocialLoginBtn>
      <SocialLoginBtn aria-label="Github에서 가입하기">
        <FaGithub />
        Github에서 가입하기
      </SocialLoginBtn>
    </Container>
  );
};

export default SocialLoginBox;
