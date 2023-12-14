import { styled } from "styled-components";
import { Input } from "./auth-components";
import { RiSearchLine } from "react-icons/ri";

const Wrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchBox = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.lightGray};
  border-radius: 50px;
`;

const SearchIcon = styled.div`
  margin-left: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 12px 0;
  margin: 0 12px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  outline: none;
  width: 100%;
`;

const Box = styled.div`
  border-radius: 15px;
  gap: 10px;
  background-color: ${({ theme }) => theme.lightGray};
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  font-size: 17px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.brown};
`;

const SubmitBtn = styled(Input)`
  width: 93.6px;
  height: 37.6px;
  font-size: 15px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.yellow};
  border-color: ${({ theme }) => theme.yellow};
  color: ${({ theme }) => theme.brown};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.hoverYellow};
    border-color: ${({ theme }) => theme.hoverYellow};
  }
`;

const Item = styled.div`
  padding-top: 12px;
`;

const Trend = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.darkGray};
`;

const SubTitle = styled.p`
  font-weight: bold;
  margin-top: 2px;
  color: ${({ theme }) => theme.brown};
`;

const Text = styled.p`
  margin-top: 2px;
`;

const Aside = () => {
  return (
    <Wrapper>
      <SearchBox>
        <SearchIcon>
          <RiSearchLine />
        </SearchIcon>
        <SearchInput placeholder="검색" />
      </SearchBox>
      <Box>
        <Title>Premium 구독하기</Title>
        <p>
          구독하여 새로운 기능을 이용해 보세요. 자격을 충족하는 경우 광고 수익
          배분금도 받을 수 있습니다.
        </p>
        <SubmitBtn value={"구독하기"} />
      </Box>
      <Box>
        <Title>나를 위한 트렌드</Title>
        <Item>
          <Trend>대한민국에서 트렌드 중</Trend>
          <SubTitle>프론트엔드</SubTitle>
        </Item>
        <Item>
          <Trend>대한민국에서 트렌드 중</Trend>
          <SubTitle>React</SubTitle>
        </Item>
        <Item>
          <SubTitle>#Type_Script</SubTitle>
          <Text>
            타입스크립트는 자바스크립트를 기반으로 하는 강력한 타입 프로그래밍
            언어로, 규모에 관계없이 더 나은 툴을 제공합니다.
          </Text>
        </Item>
        <Item>
          <Trend>대한민국에서 트렌드 중</Trend>
          <SubTitle>Vite</SubTitle>
        </Item>
        <Item>
          <Trend>대한민국에서 트렌드 중</Trend>
          <SubTitle>ChatGPT</SubTitle>
        </Item>
        <Item>
          <SubTitle>#Nomad_Coders</SubTitle>
          <Text>
            코딩은 진짜를 만들어보는거야! 실제 서비스를 따라 만들면서 코딩을
            배우세요.
          </Text>
        </Item>
        <Item>
          <Trend>대한민국에서 트렌드 중</Trend>
          <SubTitle>Next.js</SubTitle>
        </Item>
      </Box>
    </Wrapper>
  );
};

export default Aside;
