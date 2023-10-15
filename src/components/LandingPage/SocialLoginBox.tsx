import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Button from "./Button";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import useGoto from "../../hooks/useGoto";

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
  const goto = useGoto();

  const onGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      goto("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const onGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      goto("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <SocialLoginBtn
        onClick={onGoogleLogin}
        aria-label="Google 계정으로 가입하기"
      >
        <FcGoogle />
        Google에서 가입하기
      </SocialLoginBtn>
      <SocialLoginBtn
        onClick={onGithubLogin}
        aria-label="Github 계정으로 가입하기"
      >
        <FaGithub />
        Github에서 가입하기
      </SocialLoginBtn>
    </Container>
  );
};

export default SocialLoginBox;
