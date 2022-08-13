import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import __styledVariables from "../../global/StyledVariables";

import homeService from "../../services/homeService";
import AnimeComponent from "../AnimeComponent";

export default function ThisSeason() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const [seasonAnime, setSeasonAnime] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const animesList = await homeService.getSeason(auth.token);
        setSeasonAnime(animesList);
      } catch (error) {
        if (error.response.status === 401) {
          Swal.fire({
            title: "Session is Expired or Invalid",
            text: "Please Login Again",
            width: "90%",
            fontSize: 20,
            background: "#F3EED9",
            confirmButtonColor: `${__styledVariables.buttonMainColor}`,
            color: `${__styledVariables.inputFontColor}`,
            icon: "error",
          });
          navigate("/");
        } else {
          Swal.fire({
            title: "Something got wrong",
            text: "Try agains later!",
            width: "90%",
            fontSize: 20,
            background: "#F3EED9",
            confirmButtonColor: `${__styledVariables.buttonMainColor}`,
            color: `${__styledVariables.inputFontColor}`,
            icon: "error",
          });
        }
      }
    })();
  }, [auth.token, navigate]);

  return (
    <SeasonWrapper>
      <hr />
      <SeasonTitleDiv>
        <h1>This Season</h1>
        <BsFillPlusSquareFill
          className="plusIcon"
          id="plusIconSeason"
          onClick={() => {
            navigate("/season");
          }}
        />
      </SeasonTitleDiv>
      <SeasonAnimes ref={ref}>
        {seasonAnime.map((anime) => {
          const { id, image, title } = anime;
          return (
            <AnimeComponent key={id} image={image} id={id} title={title} />
          );
        })}

        <FaArrowAltCircleRight
          id="scroll-arrow-right"
          className="scrollArrowRight"
          onClick={() => scroll(330)}
        />

        <FaArrowAltCircleLeft
          className="scrollArrowLeft"
          onClick={() => scroll(-330)}
        />
      </SeasonAnimes>
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
  max-width: 1000px;

  hr {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const SeasonTitleDiv = styled.div`
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
    cursor: pointer;
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
`;

const SeasonAnimes = styled.div`
  display: flex;
  max-width: 328px;
  align-items: center;
  margin-top: 10px;

  overflow: scroll;

  .scrollArrowRight {
    cursor: pointer;
    position: absolute;
    right: 30px;
    filter: opacity(0.8);
    color: ${__styledVariables.buttonFontColor};
    font-size: 25px;
    overflow: scroll;
  }

  .scrollArrowLeft {
    cursor: pointer;
    position: absolute;
    left: 30px;
    filter: opacity(0.8);
    color: ${__styledVariables.buttonFontColor};
    font-size: 25px;
    overflow: scroll;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
