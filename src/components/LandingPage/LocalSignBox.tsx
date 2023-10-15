import styled from "styled-components";
import Button from "./Button";
import { device } from "../../constants/breakpoints";
import useGoto from "../../hooks/useGoto";

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

const LocalSignBox = () => {
  const goto = useGoto();
  return (
    <>
      <CreateAccountBox>
        <CreateAccountBtn
          onClick={() => goto("/create-account")}
          aria-label="새 계정 만들기"
        >
          계정 만들기
        </CreateAccountBtn>
        <Notice>
          가입하시려면 <Highlighted>쿠키사용</Highlighted>을 포함해{" "}
          <Highlighted>이용약관</Highlighted>과{" "}
          <Highlighted>개인정보 처리방침</Highlighted>에 동의해야 합니다.
        </Notice>
      </CreateAccountBox>
      <AlreadyHaveAccount aria-label="이미 계정을 가지고 계신 경우">
        이미 피너터에 가입하셨나요?
      </AlreadyHaveAccount>
      <LoginBtn onClick={() => goto("/login")} aria-label="로그인">
        로그인
      </LoginBtn>
    </>
  );
};

export default LocalSignBox;
