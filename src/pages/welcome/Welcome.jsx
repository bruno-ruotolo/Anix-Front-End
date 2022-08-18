import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import OpenGif from "../../assets/OpenGif.gif";
import AnixLogo from "../../assets/AnixLogo.png";
import __styledVariables from "../../global/StyledVariables";
import { AuthContext } from "../../contexts/AuthContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.id) navigate("/home");
  }, [auth, navigate]);

  return (
    <>
      <BackGroundImage></BackGroundImage>
      <OpenWrapper>
        <ImageTextDiv>
          <img src={AnixLogo} alt="Logo" />
          <p>A handy personal anime manager</p>
        </ImageTextDiv>
        <hr />
        <ButtonWrapper>
          <button onClick={() => navigate("/signin")}>Login</button>
          <button onClick={() => navigate("/signup")}>Register</button>
        </ButtonWrapper>
      </OpenWrapper>
    </>
  );
}

const OpenWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  position: relative;
  background-color: rgba(0, 0, 0, 0.85);
  width: 100vw;
  height: 100vh;
  opacity: 1;

  img {
    width: 150px;
    margin-top: 100px;
    animation-name: animation;
    animation-duration: 8s;
    animation-iteration-count: infinite;
  }

  hr {
    width: 50vh;
    height: 2px;

    margin-top: 50px;
  }

  @media (min-width: 800px) {
    flex-direction: row;
    hr {
      width: 2px;
      height: 90vh;

      margin: 0;
    }
    img {
      position: relative;
      top: -100px;
      width: 500px;
    }
  }

  @keyframes animation {
    0% {
      transform: rotateY(0) skewY(0);
      filter: none;
    }

    20% {
      transform: rotateY(-40deg) skewY(10deg);
      filter: drop-shadow(25px 0px 5px #b07eab);
    }

    40% {
      transform: rotateY(0) skewY(0);
      filter: none;
    }

    60% {
      transform: rotateY(0) skewY(0);
      filter: none;
    }

    80% {
      transform: rotateY(40deg) skewY(-10deg);
      filter: drop-shadow(-25px 0px 5px #b07eab);
    }

    100% {
      transform: rotateY(0) skewY(0);
      filter: none;
    }
  }
`;

const BackGroundImage = styled.section`
  position: absolute;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;
  background-image: url(${OpenGif});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  height: 100vh;

  button {
    margin-bottom: 50px;
    width: 180px;
    height: 60px;
    background-image: linear-gradient(#009090, #594d7d);
    color: ${__styledVariables.buttonFontColor};
  }
  @media (min-width: 800px) {
    button {
      margin-bottom: 100px;
      width: 400px;
      height: 100px;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        box-shadow: inset 6px 4px 10px 6px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;

const ImageTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-family: ${__styledVariables.mainFont};
    font-size: 20px;
    text-align: center;
    margin: 30px 20px 0 20px;
    line-height: 27px;
    color: ${__styledVariables.buttonFontColor};
  }

  @media (min-width: 800px) {
    p {
      font-size: 50px;
      line-height: 53px;
    }
  }
`;
