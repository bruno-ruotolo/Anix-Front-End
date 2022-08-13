import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import homeService from "../../services/homeService";

export default function ForYou() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [forYouAnime, setForYouAnime] = useState({
    image: "",
    title: "",
    description: "",
    episodes: "",
  });
  const { image, title, description, episodes, id } = forYouAnime;

  useEffect(() => {
    (async () => {
      try {
        const { anime } = await homeService.getForYou(auth.token);
        setForYouAnime(anime);
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
    <ForYouWrapper>
      <h1>For You</h1>
      <ForYouInfosDiv
        id="for-you-anime"
        onClick={() => navigate(`/anime/${id}`)}
      >
        <img src={image} alt="Anime" />
        <AnimeTextInfosDiv>
          <h2>{title.split(" ").slice(0, 8).join(" ")}</h2>
          <h3>Episodes: {episodes}</h3>
          <p>{description.slice(0, 200)}...</p>
        </AnimeTextInfosDiv>
      </ForYouInfosDiv>
    </ForYouWrapper>
  );
}

const ForYouWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 20px;
  padding: 0 23px;
  max-width: 1000px;

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

const ForYouInfosDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  img {
    border-radius: 6px;
    object-fit: cover;
    min-width: 148px;
    height: 195px;
    transition: 0.5s;

    &:hover {
      filter: brightness(0.7);
    }
  }
`;

const AnimeTextInfosDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin-bottom: 20px;
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    margin-left: 15px;
    text-align: justify;
    color: ${__styledVariables.inputMainColor};
  }

  h3 {
    margin-bottom: 20px;
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: ${__styledVariables.inputMainColor};
  }

  p {
    margin-left: 15px;
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: ${__styledVariables.inputMainColor};
    text-align: justify;
  }
`;
