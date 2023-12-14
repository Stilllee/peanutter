import {
  RiUser3Line,
  RiUser3Fill,
  RiSearchLine,
  RiFileListLine,
  RiBookmarkLine,
} from "react-icons/ri";
import { PiDotsThreeCircle, PiDotsThreeBold } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { BiBell } from "react-icons/bi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { TbBrandPeanut, TbPencilPlus } from "react-icons/tb";
import React, { useEffect, useRef, useState } from "react";
import AuthBox from "./AuthBox";
import Button from "./common/Button";
import { device } from "../constants/breakpoints";
import { useModal } from "../hooks/useCustomModal";
import Modal from "./common/Modal/Modal";
import PostNutForm from "./PostNutForm";
import { auth } from "../firebase";

const Logo = styled(TbBrandPeanut)`
  margin: 10px 10px 4px 10px;
  font-size: 30px;
`;

const Wrapper = styled.div`
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
  @media ${device.mobile}, ${device.tablet} {
    width: 89px;
    align-items: center;
    justify-self: end;
    & span {
      display: none;
    }
  }
`;

const MenuItem = styled.div`
  display: inline-flex;
  align-items: center;
  height: 50px;
  border-radius: 50px;
  padding: 12px;
  transition: background-color 0.3s ease;
`;

const MenuLink = styled(Link)`
  cursor: pointer;
  font-size: 25px;
  border-radius: 50px;
  outline-color: ${({ theme }) => theme.brown};
  &:hover ${MenuItem} {
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
  &:focus {
    background-color: ${({ theme }) => theme.hoverYellow};
  }
  @media ${device.mobile}, ${device.tablet} {
    width: 52px;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const UploadIcon = styled(TbPencilPlus)`
  @media ${device.desktop} {
    display: none;
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
  border-radius: 50px;
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
  }
  &:focus {
    background-color: ${({ theme }) => theme.brown};
  }

  @media ${device.mobile}, ${device.tablet} {
    width: 65px;
    left: 4px;
  }
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

const MoreIcon = styled(PiDotsThreeBold)`
  @media ${device.mobile}, ${device.tablet} {
    display: none;
  }
`;

export const ProfileImg = styled.img`
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

const Menu = () => {
  const user = auth.currentUser;
  const [isAuthBoxVisible, setAuthBoxVisible] = useState(false);
  const [avatar] = useState(user?.photoURL);

  const { currentModal, openModal, closeModal } = useModal();

  const authBoxRef = useRef(null);

  const location = useLocation();

  const handleOpenAuthBox = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in e && e.key !== "Enter") return;

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
      <Logo />
      <MenuLink to="/home" aria-label="홈(안 읽은 새 게시물)">
        <MenuItem>
          {location.pathname === "/home" ? <GoHomeFill /> : <GoHome />}
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
          {location.pathname === "/profile" ? <RiUser3Fill /> : <RiUser3Line />}
          <MenuTitle>프로필</MenuTitle>
        </MenuItem>
      </MenuLink>
      <MenuLink to="#">
        <MenuItem>
          <PiDotsThreeCircle />
          <MenuTitle>더 보기</MenuTitle>
        </MenuItem>
      </MenuLink>
      <UploadBtn onClick={openModal("upload")}>
        <span>게시하기</span>
        <UploadIcon />
      </UploadBtn>
      {currentModal === "upload" && (
        <Modal width="auto" height="auto">
          <PostNutForm onSubmitSuccess={closeModal} />
        </Modal>
      )}
      {isAuthBoxVisible && <AuthBox ref={authBoxRef} />}
      <Auth onClick={handleOpenAuthBox}>
        <AuthItem tabIndex={0} onKeyDown={handleOpenAuthBox}>
          <Container>
            <ProfileImg src={avatar ?? "profile.webp"} />
            <div>
              <Name>{user?.displayName ?? "익명의 사용자"}</Name>
              <Email>{user?.email}</Email>
            </div>
          </Container>
          <MoreIcon />
        </AuthItem>
      </Auth>
    </Wrapper>
  );
};

export default Menu;
