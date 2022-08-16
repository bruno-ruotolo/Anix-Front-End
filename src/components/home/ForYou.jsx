import { useContext, useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import homeService from "../../services/homeService";
import { __swalErrorMessage } from "../../utils/utils";

export default function ForYou() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [forYouAnime, setForYouAnime] = useState({
    image: "",
    title: "",
    description: "",
    episodes: "",
  });

  const [pageLoading, setPageLoading] = useState(false);

  const { image, title, description, episodes, id } = forYouAnime;

  useEffect(() => {
    setPageLoading(true);

    (async () => {
      try {
        const { anime } = await homeService.getForYou(auth.token);
        setForYouAnime(anime);
        setPageLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          __swalErrorMessage(
            "Session is Expired or Invalid",
            "Please, Login Again!"
          );
          navigate("/");
          setPageLoading(false);
        } else {
          __swalErrorMessage("Something got wrong", "Please, Try again later!");
        }
        setPageLoading(false);
      }
    })();
  }, [auth.token, navigate]);

  return !pageLoading ? (
    <ForYouWrapper>
      <h1>For You</h1>
      <ForYouInfosDiv
        id="for-you-anime"
        onClick={() => navigate(`/anime/${id}`)}
      >
        <img src={image} alt="Anime" />
        <AnimeTextInfosDiv>
          <h2 className="title-mobile">
            {title.split(" ").slice(0, 8).join(" ")}
          </h2>
          <h2 className="title-desktop">
            {title.split(" ").slice(0, 20).join(" ")}
          </h2>
          <h3>Episodes: {episodes}</h3>
          <p className="description-mobile">{description.slice(0, 200)}...</p>
          <p className="description-desktop">{description.slice(0, 900)}...</p>
        </AnimeTextInfosDiv>
      </ForYouInfosDiv>
    </ForYouWrapper>
  ) : (
    <LoadingDiv>
      <FallingLines
        color={__styledVariables.buttonFontColor}
        width="150"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </LoadingDiv>
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

  @media (min-width: 800px) {
    flex-wrap: wrap;
    left: 50%;
    transform: translate(50%, 0);
    margin-top: 30px;

    h1 {
      font-size: 33px;
      margin-bottom: 25px;
    }
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

  @media (min-width: 800px) {
    img {
      min-width: 210px;
      height: 277px;
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
  @media (max-width: 800px) {
    .title-desktop {
      display: none;
    }

    .description-desktop {
      display: none;
    }
  }

  @media (min-width: 800px) {
    height: 250px;

    .description-mobile {
      display: none;
    }

    .title-mobile {
      display: none;
    }

    .title-desktop {
      line-height: 28px;
    }

    .description-desktop {
      font-size: 15px;
      line-height: 17px;
    }

    h2 {
      font-size: 25px;
    }

    h3 {
      font-size: 18px;
    }
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 800px) {
    height: 400px;
  }
`;
