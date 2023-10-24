import styled from "styled-components";
import { INut } from "./Timeline";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.lightGray};
`;
const Column = styled.div``;
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

const Nut = ({ username, photo, nut }: INut) => {
  return (
    <Wrapper>
      <Column>
        <Usename>{username}</Usename>
        <Payload>{nut}</Payload>
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
};

export default Nut;
