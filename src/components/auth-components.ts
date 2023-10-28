import { TbBrandPeanut } from "react-icons/tb";
import { styled } from "styled-components";
import { device } from "../constants/breakpoints";

export const Wrapper = styled.div`
  min-width: 340px;
  min-height: 280px;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 40px 60px 0 60px;

  @media ${device.mobile} {
    padding: 60px 10px 0 10px;
  }
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 31px;
  font-weight: 700;
`;

export const Logo = styled(TbBrandPeanut)`
  margin-right: 10px;
`;

export const Form = styled.form`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${device.tablet} {
    height: 70%;
  }
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.lineGray};
  height: 56px;
  font-size: 16px;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.yellow};
    border-color: ${({ theme }) => theme.yellow};
  }
  &[type="submit"] {
    cursor: pointer;
    border-radius: 30px;
    height: 52px;
    font-weight: 700;
    color: white;
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
  display: inline-block;
  margin-top: 15px;
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.p`
  position: absolute;
  bottom: 0;
  a {
    cursor: pointer;
    font-weight: 700;
    color: ${({ theme }) => theme.hoverYellow};
    text-decoration: none;
    padding: 0 3px;
    &:hover {
      text-decoration: underline;
    }
  }
`;
