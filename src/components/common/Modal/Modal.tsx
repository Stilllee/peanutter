import styled from "styled-components";
import { device } from "../../../constants/breakpoints";

const Overlay = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  width: 600px;
  height: 650px;

  @media ${device.tablet} {
    width: 500px;
    height: 550px;
  }
  @media ${device.mobile} {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <Overlay>
      <Container>{children}</Container>
    </Overlay>
  );
};

export default Modal;
