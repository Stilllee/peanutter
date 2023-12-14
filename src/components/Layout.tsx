import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { device } from "../constants/breakpoints";
import Aside from "./Aside";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  max-width: 1250px;
  height: 100%;
`;

const AsideWrapper = styled.div`
  @media ${device.mobile}, ${device.tablet} {
    display: none;
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <Menu />
      <Outlet />
      <AsideWrapper>
        <Aside />
      </AsideWrapper>
    </Wrapper>
  );
};

export default Layout;
