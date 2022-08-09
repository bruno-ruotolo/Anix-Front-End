import { useContext } from "react";
import styled from "styled-components";

import AnixReduceLogo from "../assets/AnixReduceLogo.png";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { auth } = useContext(AuthContext);
  console.log("🚀 ~ file: Header.jsx ~ line 9 ~ Header ~ auth", auth);

  return (
    <HeaderWrapper>
      <img className="logo-image" src={AnixReduceLogo} alt="Anix Reduce Logo" />
      <input type="text" />
      <img className="user-image" src={auth.image} alt="User" />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  background-color: #8f678b;
  height: 77px;
  width: 100vw;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;

  .user-image {
    min-height: 59px;
  }

  .logo-image {
    min-height: 53px;
  }

  img {
    width: 58px;
    border-radius: 50%;
  }

  input {
    border: none;
    border-style: none;
    min-width: 233px;
    max-width: 233px;
    height: 38px;
    margin-bottom: 0;
    padding: 0;
    padding-left: 10px;

    &:focus {
      outline: none;
    }
  }
`;
