import { styled } from "styled-components";

const Wrapper = styled.div`
  background-color: greenyellow;
  width: 350px;
`;

const Preminum = styled.div``;

const Aside = () => {
  return (
    <Wrapper>
      <Preminum>Premium 구독하기</Preminum>
    </Wrapper>
  );
};

export default Aside;
