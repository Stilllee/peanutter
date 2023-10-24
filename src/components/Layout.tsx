import {
  RiUser3Line,
  RiUser3Fill,
  RiSearchLine,
  RiSearchFill,
  RiFileListLine,
  RiFileListFill,
  RiBookmarkLine,
  RiBookmarkFill,
} from "react-icons/ri";
import { PiDotsThreeCircle, PiDotsThreeBold } from "react-icons/pi";
import { HiOutlineMail, HiMail } from "react-icons/hi";
import { BiBell, BiSolidBell } from "react-icons/bi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { TbBrandPeanut } from "react-icons/tb";
import React, { useEffect, useRef, useState } from "react";
import AuthBox from "./AuthBox";
import Button from "./common/Button";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 20px;
  width: 100%;
  max-width: 860px;
  height: 100%;
`;

const Logo = styled(TbBrandPeanut)`
  margin: 10px 10px 4px 10px;
  font-size: 30px;
`;

const Menu = styled.div`
  color: ${({ theme }) => theme.brown};
  width: 270px;
  padding: 0 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const MenuLink = styled(Link)`
  cursor: pointer;
  font-size: 25px;
`;

const MenuItem = styled.div`
  display: inline-flex;
  align-items: center;
  height: 50px;
  border-radius: 50px;
  padding: 12px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
  }
`;

const MenuTitle = styled.span`
  margin-left: 20px;
  margin-right: 16px;
  font-size: 20px;
`;

const UploadBtn = styled(Button)`
  width: 100%;
  height: 52px;
  font-size: 20px;
  border-radius: 30px;
  color: ${({ theme }) => theme.brown};
  background-color: ${({ theme }) => theme.yellow};
  border-color: ${({ theme }) => theme.yellow};
  &:hover {
    background-color: ${({ theme }) => theme.hoverYellow};
    border-color: ${({ theme }) => theme.hoverYellow};
  }
`;

const Auth = styled.div`
  cursor: pointer;
  width: 254px;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 15px;
  margin: 8px;
`;

const AuthItem = styled(MenuItem)`
  width: 100%;
  height: 65px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 12px;
`;

const Name = styled.span`
  display: block;
  margin-bottom: 4px;
  font-weight: 700;
  color: ${({ theme }) => theme.brown};
`;

const Email = styled.span`
  color: ${({ theme }) => theme.darkGray};
`;

const Layout = () => {
  const [isAuthBoxVisible, setAuthBoxVisible] = useState(false);

  const authBoxRef = useRef(null);

  const handleClickDot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAuthBoxVisible(!isAuthBoxVisible);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        authBoxRef.current &&
        !(authBoxRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setAuthBoxVisible(false);
      }
    };

    if (isAuthBoxVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isAuthBoxVisible]);

  return (
    <Wrapper>
      <Menu>
        <Logo />
        <MenuLink to="/home" aria-label="홈(안 읽은 새 게시물)">
          <MenuItem>
            <GoHome />
            <MenuTitle>홈</MenuTitle>
          </MenuItem>
        </MenuLink>
        <MenuLink to="#">
          <MenuItem>
            <RiSearchLine />
            <MenuTitle>탐색하기</MenuTitle>
          </MenuItem>
        </MenuLink>
        <MenuLink to="#">
          <MenuItem>
            <BiBell />
            <MenuTitle>알림</MenuTitle>
          </MenuItem>
        </MenuLink>
        <MenuLink to="#">
          <MenuItem>
            <HiOutlineMail />
            <MenuTitle>쪽지</MenuTitle>
          </MenuItem>
        </MenuLink>
        <MenuLink to="#">
          <MenuItem>
            <RiFileListLine />
            <MenuTitle>리스트</MenuTitle>
          </MenuItem>
        </MenuLink>
        <MenuLink to="#">
          <MenuItem>
            <RiBookmarkLine />
            <MenuTitle>북마크</MenuTitle>
          </MenuItem>
        </MenuLink>
        <MenuLink to="#">
          <MenuItem>
            <TbBrandPeanut />
            <MenuTitle>Premium</MenuTitle>
          </MenuItem>
        </MenuLink>
        <MenuLink to="/profile" aria-label="프로필">
          <MenuItem>
            <RiUser3Line />
            <MenuTitle>프로필</MenuTitle>
          </MenuItem>
        </MenuLink>
        <MenuLink to="#">
          <MenuItem>
            <PiDotsThreeCircle />
            <MenuTitle>더 보기</MenuTitle>
          </MenuItem>
        </MenuLink>
        <UploadBtn>게시하기</UploadBtn>
        {isAuthBoxVisible && <AuthBox ref={authBoxRef} />}
        <Auth onClick={handleClickDot}>
          <AuthItem>
            <Container>
              <ProfileImg src="profile.webp" />
              <div>
                <Name>닉네임</Name>
                <Email>이메일</Email>
              </div>
            </Container>
            <PiDotsThreeBold />
          </AuthItem>
        </Auth>
      </Menu>
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
