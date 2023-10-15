import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useCustomNavigate } from "../../../hooks/useCustomNavigate";

export const CloseBtn = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  width: 34px;
  height: 34px;
  padding: 7px;
  top: 0;
  left: 0;
  border: 1px solid ${({ theme }) => theme.lineGray};
  border-radius: 50%;
  background-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
    border-color: ${({ theme }) => theme.lightGray};
  }
`;

const CloseModalButton = () => {
  const { goBack } = useCustomNavigate();
  const onCloseModal = () => {
    goBack();
  };
  return <CloseBtn onClick={onCloseModal} />;
};

export default CloseModalButton;
