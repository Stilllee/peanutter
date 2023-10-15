import { styled } from "styled-components";

const Container = styled.nav`
  width: 100%;
  padding: 16px 20px;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const NavItem = styled.li`
  white-space: nowrap;
  cursor: pointer;
  font-size: 13px;
  color: ${({ theme }) => theme.darkGray};
  &:hover {
    text-decoration: underline;
  }
`;

const NavItems = [
  "소개",
  "PeaNutter 앱 다운로드하기",
  "고객센터",
  "이용약관",
  "개인정보 처리방침",
  "쿠키 정책",
  "접근성",
  "광고 정보",
  "블로그",
  "상태",
  "채용",
  "브랜드 리소스",
  "광고",
  "마케팅",
  "비즈니스용 PeaNutter",
  "개발자",
  "디렉터리",
  "설정",
  "© 2023 Wood Corp.",
];

const Nav = () => {
  return (
    <Container>
      <NavList>
        {NavItems.map((item) => (
          <NavItem key={item}>{item}</NavItem>
        ))}
      </NavList>
    </Container>
  );
};

export default Nav;
