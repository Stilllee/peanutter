import styled from "styled-components";
import { auth } from "../firebase";
import { useModal } from "../hooks/useCustomModal";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import { forwardRef } from "react";

const AuthWrapper = styled.div`
  color: ${({ theme }) => theme.brown};
  font-size: 15px;
  font-weight: 700;
`;

const AuthBoxContent = styled.div`
  width: 254px;
  position: absolute;
  left: 8px;
  bottom: 70px;
  background-color: white;
  padding: 12px 0;
  border-radius: 15px;
  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px,
    rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
  z-index: 1; /* 다른 요소 위에 표시되도록 설정 */

  /* 말풍선 꼬리 부분 스타일링 */
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid white;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    filter: drop-shadow(0px 3px 3px rgba(101, 119, 134, 0.2))
      drop-shadow(0px 3px 1px rgba(101, 119, 134, 0.15));
    z-index: 2;
  }
`;

const AuthItem = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
  }
`;

const AuthBox = forwardRef<HTMLDivElement>((props, forwardedRef) => {
  const { openModal } = useModal();
  const { navigateTo } = useCustomNavigate();

  const onLogout = async () => {
    const ok = confirm("PeaNutter에서 로그아웃할까요?");
    if (ok) {
      openModal(null);
      await auth.signOut();
      navigateTo("/", true);
    }
  };

  return (
    <AuthWrapper ref={forwardedRef}>
      <AuthBoxContent>
        <AuthItem>기존 계정 추가</AuthItem>
        <AuthItem onClick={onLogout}>닉네임 계정에서 로그아웃</AuthItem>
      </AuthBoxContent>
    </AuthWrapper>
  );
});

export default AuthBox;
