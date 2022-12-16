import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Scroll from "react-scroll";

import __styledVariables from "../../global/StyledVariables";

import homeService from "../../services/homeService";
import AnimeComponent from "../AnimeComponent";
import { __swalErrorMessage } from "../../utils/utils";
import { FallingLines } from "react-loader-spinner";

export default function MostPopular() {
  const scroll = Scroll.animateScroll;

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const ref = useRef(null);

  const [popularAnime, setPopularAnime] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    (async () => {
      try {
        const animesList = await homeService.getPopular(auth.token);
        setPopularAnime(animesList);
        setPageLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          __swalErrorMessage(
            "Session is Expired or Invalid",
            "Please, Login Again!"
          );
          setPageLoading(false);
          navigate("/");
        } else {
          __swalErrorMessage("Something got wrong", "Please, Try to login again!");
          localStorage.removeItem("auth");
          navigate("/");
          setPageLoading(false);
        }
      }
    })();
  }, [auth.token, navigate]);

  function handleScroll(direction) {
    scroll.scrollMore(direction ? 700 : -700, {
      duration: 900,
      delay: 0,
      smooth: true,
      containerId: "most-popular-animes-list",
      horizontal: true,
    });
  }

  return (
    <PopularWrapper>
      <hr />
      <PopularTitleDiv>
        <h1>Most Popular</h1>
      </PopularTitleDiv>
      {!pageLoading ? (
        <PopularAnimes id={"most-popular-animes-list"} ref={ref}>
          {popularAnime.map((anime, index) => {
            const { id, image, title } = anime;
            return (
              <AnimeComponent key={id} image={image} title={title} id={id} />
            );
          })}

          <FaArrowAltCircleRight
            className="scroll-arrow-right-class"
            onClick={() => handleScroll(true)}
          />

          <FaArrowAltCircleLeft
            className="scroll-arrow-left-class"
            onClick={() => handleScroll(false)}
          />
        </PopularAnimes>
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
    </PopularWrapper>
  );
}

const PopularWrapper = styled.section`
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

const PopularTitleDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .plusIcon {
    position: absolute;
    right: 0;
    color: ${__styledVariables.buttonFontColor};
    font-size: 28px;
  }

  h1 {
    margin-bottom: 5px;
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 27px;
    color: ${__styledVariables.inputMainColor};
  }

  @media (min-width: 800px) {
    h1 {
      font-size: 30px;
    }
  }
`;

const PopularAnimes = styled.div`
  display: flex;
  max-width: 328px;
  align-items: center;
  margin-top: 10px;

  overflow-x: scroll;
  overflow-y: hidden;

  .scroll-arrow-right-class {
    cursor: pointer;
    position: absolute;
    right: 30px;
    filter: drop-shadow(0px 0px 5px black);
    color: ${__styledVariables.buttonFontColor};
    font-size: 25px;
    overflow: scroll;
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
    filter: drop-shadow(0px 0px 5px black);
    color: ${__styledVariables.buttonFontColor};
    font-size: 25px;
    overflow: scroll;
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
