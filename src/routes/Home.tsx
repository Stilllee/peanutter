import styled from "styled-components";
import PostNutForm from "../components/PostNutForm";
import Timeline from "../components/Timeline";

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const Home = () => {
  return (
    <Wrapper>
      <PostNutForm />
      <Timeline />
    </Wrapper>
  );
};

export default Home;
