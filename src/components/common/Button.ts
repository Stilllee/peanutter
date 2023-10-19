import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.lineGray};
  background-color: white;
  font-size: 15px;
  font-weight: 700;
  transition: all 0.3s ease;
  &:focus {
    background-color: ${({ theme }) => theme.lightGray};
    outline: 2px solid ${({ theme }) => theme.lineGray};
  }
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
    border-color: ${({ theme }) => theme.lightGray};
  }
`;
export default Button;
