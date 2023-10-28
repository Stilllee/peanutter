import styled from "styled-components";
import { device } from "../../../constants/breakpoints";
import CloseModalButton from "./CloseModalButton";
import { useModal } from "../../../hooks/useCustomModal";

interface ContainerProps {
  width?: string;
  height?: string;
}

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
const Container = styled.div<ContainerProps>`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  width: ${(props) => props.width || "600px"};
  height: ${(props) => props.width || "650px"};

  @media ${device.tablet} {
    width: ${(props) => props.width || "500px"};
    height: ${(props) => props.width || "550px"};
  }
  @media ${device.mobile} {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

interface ModalProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Modal = ({ children, width, height }: ModalProps) => {
  const { closeModal } = useModal();

  return (
    <Overlay>
      <Container width={width} height={height}>
        <BtnWrapper>
          <CloseModalButton onClose={closeModal} />
        </BtnWrapper>
        {children}
      </Container>
    </Overlay>
  );
};

export default Modal;
