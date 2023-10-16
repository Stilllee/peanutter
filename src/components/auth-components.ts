import { styled } from "styled-components";

export const Wrapper = styled.div`
  background-color: red;
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Title = styled.h1`
  background-color: green;
  display: flex;
  align-items: center;
  font-size: 31px;
  font-weight: 700;
`;
export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.lineGray};
  width: 300px;
  height: 56px;

  font-size: 16px;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.yellow};
    border-color: ${({ theme }) => theme.yellow};
  }
  &[type="submit"] {
    border-radius: 20px;
    height: 40px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    background-color: ${({ theme }) => theme.brown};
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.9;
    }
    &:focus {
      outline: 2px solid ${({ theme }) => theme.lineGray};
      border-color: ${({ theme }) => theme.lineGray};
      opacity: 0.9;
    }
  }
`;
export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: ${({ theme }) => theme.hoverYellow};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
