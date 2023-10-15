import styled from "styled-components";
import { TbBrandPeanut } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useGoto from "../hooks/useGoto";
import { device } from "../constants/breakpoints";
import Nav from "../components/LandingPage/Nav";

const Wrapper = styled.main`
  width: 100%;
  min-width: 372px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${device.mobile} {
    justify-content: flex-start;
  }
`;

const Main = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  @media ${device.mobile} {
    align-items: flex-start;
    height: auto;
  }
`;

const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media ${device.mobile}, ${device.tablet} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  @media ${device.tablet} {
    margin: 0 60px;
  }

  @media ${device.mobile} {
    margin: 0 30px 20px 30px;
  }
`;

const Logo = styled(TbBrandPeanut)`
  color: ${({ theme }) => theme.brown};
  font-size: 420px;

  @media ${device.mobile}, ${device.tablet} {
    font-size: 65px;
  }
`;

const AuthForm = styled.div`
  margin-right: 60px;

  @media ${device.mobile}, ${device.tablet} {
    margin-right: 0;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.brown};
  font-size: 63px;
  font-weight: 700;
  line-height: 84px;
  letter-spacing: -1.2px;
  margin: 48px 0;

  @media ${device.mobile} {
    font-size: 44px;
    line-height: 54px;
    margin: 40px 0;
  }
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.brown};
  font-size: 31px;
  font-weight: 700;
  margin-bottom: 32px;

  @media ${device.mobile} {
    font-size: 23px;
    margin-bottom: 20px;
  }
`;

const AuthBox = styled.div`
  width: 300px;
`;

const SocialLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Button = styled.button`
  cursor: pointer;
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.lineGray};
  background-color: white;
  font-size: 15px;
  font-weight: 700;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
    border-color: ${({ theme }) => theme.lightGray};
  }
`;

const SocialLoginBtn = styled(Button)`
  color: ${({ theme }) => theme.darkGray};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const OrBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`;

const Or = styled.span`
  color: ${({ theme }) => theme.darkGray};
  font-size: 15px;
`;

const Line = styled.div`
  width: 133px;
  height: 1px;
  background-color: ${({ theme }) => theme.lineGray};
`;

const CreateAccountBox = styled.div`
  margin-bottom: 60px;
`;

const CreateAccountBtn = styled(Button)`
  color: ${({ theme }) => theme.brown};
  background-color: ${({ theme }) => theme.yellow};
  border-color: ${({ theme }) => theme.yellow};
  margin: 8px 0;
  &:hover {
    background-color: ${({ theme }) => theme.hoverYellow};
    border-color: ${({ theme }) => theme.hoverYellow};
  }
`;

const Notice = styled.p`
  color: ${({ theme }) => theme.darkGray};
  font-size: 12px;
  line-height: 13px;
`;

const Highlighted = styled.span`
  color: ${({ theme }) => theme.hoverYellow};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const AlreadyHaveAccount = styled.h3`
  color: ${({ theme }) => theme.brown};
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 20px;

  @media ${device.mobile} {
    margin-bottom: 16px;
  }
`;

const LoginBtn = styled(Button)`
  color: ${({ theme }) => theme.brown};
`;

const LandingPage = () => {
  const goto = useGoto();
  return (
    <Wrapper>
      <Main>
        <Container>
          <Logo />
          <AuthForm>
            <Title>지금 일어나고 있는 일</Title>
            <SubTitle>지금 가입하세요.</SubTitle>
            <AuthBox>
              <SocialLoginBox>
                <SocialLoginBtn>
                  <FcGoogle />
                  Google에서 가입하기
                </SocialLoginBtn>
                <SocialLoginBtn>
                  <FaGithub />
                  Github에서 가입하기
                </SocialLoginBtn>
              </SocialLoginBox>
              <OrBox>
                <Line />
                <Or>또는</Or>
                <Line />
              </OrBox>
              <div>
                <CreateAccountBox>
                  <CreateAccountBtn onClick={() => goto("/create-account")}>
                    Create account
                  </CreateAccountBtn>
                  <Notice>
                    가입하시려면 <Highlighted>쿠키사용</Highlighted>을 포함해{" "}
                    <Highlighted>이용약관</Highlighted>과{" "}
                    <Highlighted>개인정보 처리방침</Highlighted>에 동의해야
                    합니다.
                  </Notice>
                </CreateAccountBox>
                <AlreadyHaveAccount>
                  이미 피너터에 가입하셨나요?
                </AlreadyHaveAccount>
                <LoginBtn onClick={() => goto("/login")}>로그인</LoginBtn>
              </div>
            </AuthBox>
          </AuthForm>
        </Container>
      </Main>
      <Nav />
    </Wrapper>
  );
};

export default LandingPage;
