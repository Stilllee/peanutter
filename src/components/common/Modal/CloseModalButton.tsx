import styled from "styled-components";
import { MdClose } from "react-icons/md";

export const CloseBtn = styled(MdClose)`
  z-index: 9;
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

export type CloseModalButtonProps = {
  onClose: () => void;
};

const CloseModalButton = ({ onClose }: CloseModalButtonProps) => {
  return <CloseBtn onClick={onClose} />;
};

export default CloseModalButton;
