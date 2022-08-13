import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RiSearchEyeFill } from "react-icons/ri";
import { BsDisplayFill } from "react-icons/bs";
import { FaToriiGate } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

export default function Footer({ position }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <FooterWrapper position={position}>
      <RiSearchEyeFill
        className="browserFooter"
        onClick={() => navigate("/browser")}
      />
      <BsDisplayFill
        className="userAnimeFooter"
        onClick={() => navigate(`/user/animes?s=watching`)}
      />
      <FaToriiGate className="homeFooter" onClick={() => navigate("/home")} />
      <MdPersonPin
        className="profileFooter"
        onClick={() => navigate(`/user/${auth.id}`)}
      />
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background-color: #8f678b;
  height: 58px;
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
  top: ${({ position }) => (position ? 0 : "none")};
  bottom: ${({ position }) => (position ? "none" : 0)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 27px;
  box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: 10;

  font-size: 38px;

  .browserFooter {
    cursor: pointer;
  }

  .userAnimeFooter {
    cursor: pointer;
  }

  .homeFooter {
    cursor: pointer;
  }

  .profileFooter {
    cursor: pointer;
  }
`;
