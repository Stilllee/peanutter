import styled from "styled-components";
import { INut } from "./Timeline";
import { PiDotsThreeBold } from "react-icons/pi";
import { useState } from "react";
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

const Nut = ({ username, photo, nut, userid, id }: INut) => {
  const [isAuthBoxVisible, setAuthBoxVisible] = useState(false);
  const handleClickDot = () => {
    setAuthBoxVisible(!isAuthBoxVisible);
  };

  return (
    <Wrapper>
      <Column>
        <UserBox>
          <Usename>{username}</Usename>
          <MoreBtn onClick={handleClickDot}>
            <PiDotsThreeBold />
          </MoreBtn>
          {isAuthBoxVisible && (
            <MoreBox userid={userid} id={id} photo={photo} />
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
