import styled from "styled-components";
import { TbBrandPeanut } from "react-icons/tb";
import { device } from "../constants/breakpoints";
import Nav from "../components/LandingPage/Nav";
import SocialLoginBox from "../components/LandingPage/SocialLoginBox";
import LocalSignBox from "../components/LandingPage/LocalSignBox";

const Container = styled.div`
  width: 100%;
  min-width: 372px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${device.mobile} {
    justify-content: flex-start;
  }
`;

const Main = styled.main`
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

const Section = styled.section`
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

const SignBox = styled.div`
  width: 300px;
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

const LandingPage = () => {
  return (
    <Container>
      <Main>
        <Section>
          <Logo />
          <AuthForm>
            <Title>지금 일어나고 있는 일</Title>
            <SubTitle>지금 가입하세요.</SubTitle>
            <SignBox>
              <SocialLoginBox />
              <OrBox>
                <Line />
                <Or>또는</Or>
                <Line />
              </OrBox>
              <LocalSignBox />
            </SignBox>
          </AuthForm>
        </Section>
      </Main>
      <Nav />
    </Container>
  );
};

export default LandingPage;
