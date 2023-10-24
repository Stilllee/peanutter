import styled from "styled-components";
import { INut } from "./Timeline";
import { PiDotsThreeBold } from "react-icons/pi";
import React, { useEffect, useRef, useState } from "react";
import MoreBox from "./MoreBox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.lightGray};
`;
const Column = styled.div``;

const UserBox = styled.div`
  width: 514px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Usename = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;
const Photo = styled.img`
  width: 514px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.lineGray};
`;

const MoreBtn = styled.div<MoreBtnProps>`
  cursor: pointer;
  font-weight: 700;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
  }
`;

type MoreBtnProps = {
  isHidden?: boolean;
};

const Nut = ({ username, photo, nut, userid, id }: INut) => {
  const [isMoreBoxVisible, setMoreBoxVisible] = useState(false);

  const moreBoxRef = useRef(null);

  const handleClickDot = (e: React.MouseEvent) => {
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
        <UserBox>
          <Usename>{username}</Usename>
          <MoreBtn onClick={handleClickDot} isHidden={isMoreBoxVisible}>
            <PiDotsThreeBold />
          </MoreBtn>
          {isMoreBoxVisible && (
            <MoreBox userid={userid} id={id} photo={photo} ref={moreBoxRef} />
          )}
        </UserBox>
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
