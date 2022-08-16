import { useContext } from "react";
import { BsDisplayFill } from "react-icons/bs";
import { FaToriiGate } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { RiSearchEyeFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AnixLogo from "../assets/AnixLogo.png";
import { AuthContext } from "../contexts/AuthContext";
import __styledVariables from "../global/StyledVariables";

export default function Header() {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <img
        className="logo-image"
        src={AnixLogo}
        alt="Anix Reduce Logo"
        onClick={() => navigate(`/home`)}
      />
      <HeaderMenusDiv>
        <HeaderIconContainer>
          <h2 onClick={() => navigate("/search")}>SEARCH</h2>
          <RiSearchEyeFill
            className="browser-icon"
            onClick={() => navigate("/search")}
          />
        </HeaderIconContainer>
        <HeaderIconContainer>
          <h2 onClick={() => navigate(`/user/animes?s=watching`)}>MY ANIMES</h2>
          <BsDisplayFill
            className="user-anime-icon"
            onClick={() => navigate(`/user/animes?s=watching`)}
          />
        </HeaderIconContainer>

        <HeaderIconContainer>
          <h2 onClick={() => navigate("/home")}>HOME</h2>
          <FaToriiGate
            className="home-icon"
            onClick={() => navigate("/home")}
          />
        </HeaderIconContainer>

        <HeaderIconContainer>
          <h2 onClick={() => navigate(`/user`)}>PROFILE</h2>
          <MdPersonPin
            className="profile-icon"
            onClick={() => navigate(`/user`)}
          />
        </HeaderIconContainer>
      </HeaderMenusDiv>
      <img className="user-image" src={auth.image} alt="User" />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  background-color: #8f678b;
  height: 77px;
  width: 100vw;
  max-width: 1920px;
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  .user-image {
    width: 65px;
    min-height: 59px;
  }

  img {
    border-radius: 50%;
    cursor: pointer;
  }

  .logo-image {
    width: 80px;
    min-height: 53px;
    transition: 1s;

    &:hover {
      transform: skewX(5deg) rotateY(20deg);

      filter: drop-shadow(-4px 4px 2px ${__styledVariables.mainColor});
    }
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const HeaderMenusDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
`;

const HeaderIconContainer = styled.div`
  display: flex;

  font-size: 50px;

  .browser-icon {
    position: absolute;
    transform: translate(40%, -20%);
    filter: opacity(10%);
    cursor: pointer;
    z-index: 1;
  }

  .user-anime-icon {
    transform: translate(70%, -20%);
    position: absolute;
    filter: opacity(10%);
    cursor: pointer;
  }

  .home-icon {
    transform: translate(20%, -20%);
    position: absolute;

    filter: opacity(10%);
    cursor: pointer;
  }

  .profile-icon {
    transform: translate(40%, -20%);
    position: absolute;
    filter: opacity(10%);
    cursor: pointer;
  }

  h2 {
    position: relative;
    filter: drop-shadow(2px 2px 2px #000000);
    font-family: ${__styledVariables.mainFont};
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 29px;
    color: ${__styledVariables.buttonFontColor};
    cursor: pointer;
    z-index: 15;
    transition: 0.2s;

    &:hover {
      transform: scale(1.5);
    }
  }
`;
