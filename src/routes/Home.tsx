import styled from "styled-components";
import PostNutForm from "../components/PostNutForm";
import Timeline from "../components/Timeline";

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostNutFormWrapper = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.lightGray};
`;

const Home = () => {
  return (
    <Wrapper>
      <PostNutFormWrapper>
        <PostNutForm />
      </PostNutFormWrapper>
      <Timeline />
    </Wrapper>
  );
};

export default Home;
