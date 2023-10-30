import styled from "styled-components";
import { INut } from "./Timeline";
import { PiDotsThreeBold } from "react-icons/pi";
import React, { useEffect, useRef, useState } from "react";
import MoreBox from "./MoreBox";
import { ProfileImg } from "./Layout";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.lightGray};
`;
const Column = styled.div`
  width: 514px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  margin-right: 10px;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.brown};
`;
const Email = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.darkGray};
`;
const Payload = styled.p`
  margin: 10px 0;
  white-space: pre-line;
  line-height: 20px;
`;
const Photo = styled.img`
  width: 514px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.lineGray};
  margin: 14px 0;
`;

const MoreBtn = styled.div`
  cursor: pointer;
  font-weight: 700;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
  }
`;

const Nut = ({
  username,
  photo,
  nut,
  userid,
  id,
  email,
  authorPhotoURL,
}: INut) => {
  const [isMoreBoxVisible, setMoreBoxVisible] = useState(false);

  const moreBoxRef = useRef(null);

  const handleOpenMore = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.stopPropagation();
    setMoreBoxVisible(!isMoreBoxVisible);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        moreBoxRef.current &&
        !(moreBoxRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setMoreBoxVisible(false);
      }
    };

    if (isMoreBoxVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMoreBoxVisible]);

  return (
    <Wrapper>
      <Column>
        <Top>
          <UserBox>
            <ProfileImg src={authorPhotoURL ?? "profile.webp"} />
            <div>
              <Username>{username}</Username>
              <Email>{email}</Email>
            </div>
          </UserBox>
          <MoreBtn
            tabIndex={0}
            onClick={handleOpenMore}
            onKeyDown={handleOpenMore}
          >
            <PiDotsThreeBold />
          </MoreBtn>
          {isMoreBoxVisible && (
            <MoreBox
              email={email}
              userid={userid}
              id={id}
              photo={photo}
              ref={moreBoxRef}
            />
          )}
        </Top>
        <Payload>{nut}</Payload>
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
};

export default Nut;
