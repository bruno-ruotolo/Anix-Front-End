import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Scroll from "react-scroll";

import __styledVariables from "../../global/StyledVariables";

import homeService from "../../services/homeService";
import AnimeComponent from "../AnimeComponent";
import { FallingLines } from "react-loader-spinner";

export default function ThisSeason() {
  const scroll = Scroll.animateScroll;

  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const ref = useRef(null);

  const [seasonAnime, setSeasonAnime] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    (async () => {
      try {
        const animesList = await homeService.getSeason(auth.token);
        setSeasonAnime(animesList);
        setPageLoading(false);
      } catch (error) {
        setPageLoading(false);
        setAuth("");
        localStorage.removeItem("auth");
        navigate("/");
      }
    })();
  }, [auth.token, navigate, setAuth]);

  function handleScroll(direction) {
    scroll.scrollMore(direction ? 347 : -347, {
      duration: 700,
      delay: 0,
      smooth: true,
      containerId: "season-animes-list",
      horizontal: true,
    });
  }

  return (
    <SeasonWrapper>
      <hr />
      <SeasonTitleDiv>
        <h1 onClick={() => navigate("/season")}>This Season</h1>
        <BsFillPlusSquareFill
          className="plus-icon"
          id="plus-icon-season"
          onClick={() => {
            navigate("/season");
          }}
        />
      </SeasonTitleDiv>
      {!pageLoading ? (
        <SeasonAnimes id="season-animes-list" ref={ref}>
          {seasonAnime.map((anime, index) => {
            const { id, image, title } = anime;
            return (
              <AnimeComponent key={id} image={image} id={id} title={title} />
            );
          })}

          <FaArrowAltCircleRight
            id="scroll-arrow-right"
            className="scroll-arrow-right-class"
            onClick={() => handleScroll(true)}
          />

          <FaArrowAltCircleLeft
            id="scroll-arrow-left"
            className="scroll-arrow-left-class"
            onClick={() => handleScroll(false)}
          />
        </SeasonAnimes>
      ) : (
        <LoadingDiv>
          <FallingLines
            color={__styledVariables.buttonFontColor}
            width="130"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </LoadingDiv>
      )}
    </SeasonWrapper>
  );
}

const SeasonWrapper = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;

  margin-top: 20px;
  padding: 0 23px;

  hr {
    width: 100%;
    margin-bottom: 20px;
  }

  @media (min-width: 800px) {
    padding: 0 100px;
    width: 100%;
  }
`;

const SeasonTitleDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .plus-icon {
    position: absolute;
    right: 0;
    color: ${__styledVariables.buttonFontColor};
    font-size: 28px;
    cursor: pointer;
    transition: 0.3s;

    filter: drop-shadow(2px 2px 2px #000000);

    &:hover {
      transform: translate(-8px, -3px);
      filter: drop-shadow(4px 4px 2px #000000);
    }
  }

  h1 {
    margin-bottom: 5px;
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 27px;
    color: ${__styledVariables.inputMainColor};
    cursor: pointer;
  }

  @media (min-width: 800px) {
    h1 {
      font-size: 30px;
    }

    .plus-icon {
      filter: none;
    }
  }
`;

const SeasonAnimes = styled.div`
  display: flex;
  max-width: 328px;
  align-items: center;
  margin-top: 10px;
  transition: 0.5s;

  overflow-x: scroll;
  overflow-y: hidden;

  .scroll-arrow-right-class {
    cursor: pointer;
    position: absolute;
    right: 30px;
    color: ${__styledVariables.buttonFontColor};
    font-size: 25px;
    overflow: scroll;
    filter: drop-shadow(0px 0px 5px black);
    transition: 0.3s;

    &:hover {
      transform: translate(8px, -3px);
      filter: drop-shadow(-4px 4px 2px #000000);
    }
  }

  .scroll-arrow-left-class {
    cursor: pointer;
    position: absolute;
    left: 30px;
    color: ${__styledVariables.buttonFontColor};
    font-size: 25px;
    overflow: scroll;
    filter: drop-shadow(0px 0px 5px black);
    transition: 0.3s;

    &:hover {
      transform: translate(-8px, -3px);
      filter: drop-shadow(4px 4px 2px #000000);
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 800px) {
    max-width: 100%;

    h1 {
      font-size: 30px;
    }

    .scroll-arrow-left-class {
      font-size: 35px;
      left: 50px;
      filter: none;
    }

    .scroll-arrow-right-class {
      font-size: 35px;
      right: 50px;
      filter: none;
    }
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  @media (min-width: 800px) {
    height: 200px;

    svg {
      width: 150px;
    }
  }
`;
