import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Footer from "../../components/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import animeService from "../../services/animeService";
import DropDown from "../../components/DropDown";
import RateButton from "../../components/anime/RateButton";
import FavoriteButton from "../../components/anime/FavoriteButton";
import Header from "../../components/Header";
import { __swalErrorMessage } from "../../utils/utils";
import { FallingLines, Oval } from "react-loader-spinner";

export default function Anime() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const [animeInfos, setAnimeInfos] = useState();
  const [statusArr, setStatusArr] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [rate, setRate] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);

  const rateIconsValues = [1, 2, 3, 4, 5];

  useEffect(() => {
    setPageLoading(true);
    (async () => {
      try {
        const animeInfos = await animeService.getAnimeInfos(auth.token, id);
        const status = await animeService.getAllStatus(auth.token, id);
        setCurrentStatus(animeInfos.UserStatusAnime[0]?.status.id);
        setAnimeInfos(animeInfos);
        setStatusArr(status);
        setRate(animeInfos.UserRateAnime[0]?.rate);
        setFavorite(animeInfos.UserFavoriteAnime.length > 0 ? true : false);
        setPageLoading(false);
      } catch (error) {
        if (error.response === 401) {
          __swalErrorMessage(
            "Session is Expired or Invalid",
            "Please, Login Again!"
          );

          navigate("/");
        } else {
          __swalErrorMessage("Something got wrong", "Please, Try again later!");
        }
        setPageLoading(false);
      }
    })();
  }, [navigate, auth.token, id]);

  async function handleStatus(statusId) {
    setStatusLoading(true);
    try {
      await animeService.createStatus(auth.token, id, statusId);
      setStatusLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        __swalErrorMessage(
          "Session is Expired or Invalid",
          "Please, Login Again!"
        );

        navigate("/");
      } else {
        __swalErrorMessage("Something got wrong", "Please, Try again later!");
      }
      setStatusLoading(false);
    }
  }

  async function handleRate(rate) {
    setRateLoading(true);
    try {
      await animeService.createRate(auth.token, id, rate);
      setRate(rate);
      setRateLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        __swalErrorMessage(
          "Session is Expired or Invalid",
          "Please, Login Again!"
        );

        navigate("/");
      } else {
        __swalErrorMessage("Something got wrong", "Please, Try again later!");
      }
      setRateLoading(false);
    }
  }

  async function handleFavorite(favorite) {
    setFavoriteLoading(true);
    try {
      if (favorite) await animeService.createFavorite(auth.token, id);
      else await animeService.deleteFavorite(auth.token, id);
      setFavorite(favorite);
      setFavoriteLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        __swalErrorMessage(
          "Session is Expired or Invalid",
          "Please, Login Again!"
        );

        navigate("/");
      } else {
        __swalErrorMessage("Something got wrong", "Please, Try again later!");
      }
      setFavoriteLoading(false);
    }
  }
  return (
    <>
      <Header />
      {!pageLoading && animeInfos ? (
        <AnimeWrapper>
          <AnimeStatusFavoriteRate>
            <FavoriteDiv>
              <FavoriteButton
                favorite={favorite}
                setFavorite={(value) => handleFavorite(value)}
              />
              {favoriteLoading ? (
                <Oval
                  width="25"
                  height="40"
                  wrapperClass="favorite-loader"
                  color={__styledVariables.buttonFontColor}
                  secondaryColor={__styledVariables.buttonMainColor}
                  strokeWidth={5}
                  strokeWidthSecondary={5}
                />
              ) : (
                <></>
              )}
            </FavoriteDiv>
            <img src={animeInfos.image} alt="Anime" />
            <AnimeMainInfos>
              <h2>
                {animeInfos.avgRate
                  ? `${animeInfos.title} (${animeInfos.avgRate.toFixed(1)})`
                  : animeInfos.title}
              </h2>
              <YourRateDiv>
                <h3>Your Rate</h3>
                <MoonsRateDiv>
                  {rateIconsValues.map((value) => {
                    return (
                      <RateButton
                        disabled={rateLoading}
                        key={value}
                        value={value}
                        setRate={(value) => handleRate(value)}
                        rate={rate}
                      />
                    );
                  })}
                  {rateLoading ? (
                    <Oval
                      width="30"
                      height="40"
                      wrapperClass="rate-loader"
                      color={__styledVariables.buttonFontColor}
                      secondaryColor={__styledVariables.buttonMainColor}
                      strokeWidth={5}
                      strokeWidthSecondary={5}
                    />
                  ) : (
                    <></>
                  )}
                </MoonsRateDiv>
              </YourRateDiv>
              <StatusDiv>
                <DropDown
                  id="#select-box-status"
                  width="200px"
                  type="Status"
                  disabled={statusLoading}
                  array={statusArr}
                  setCallBack={(value) => handleStatus(value)}
                  statusId={currentStatus}
                />
                {statusLoading ? (
                  <Oval
                    width="25"
                    height="40"
                    wrapperClass="status-loader"
                    color={__styledVariables.buttonFontColor}
                    secondaryColor={__styledVariables.buttonMainColor}
                    strokeWidth={5}
                    strokeWidthSecondary={5}
                  />
                ) : (
                  <></>
                )}
              </StatusDiv>
              <p className="description-desktop">{animeInfos.description}</p>
            </AnimeMainInfos>
          </AnimeStatusFavoriteRate>
          <AnimeOtherInfos>
            <p className="description-mobile">{animeInfos.description}</p>
            <EpisodesDiv>
              <h4>Episodes</h4>
              <h5>{animeInfos.episodes}</h5>
            </EpisodesDiv>

            <GenresDiv>
              <h4>Genres</h4>
              <Genres>
                {animeInfos.animesGenres?.map(({ genre }) => {
                  const { name, id } = genre;
                  return <h5 key={id}>{name}</h5>;
                })}
              </Genres>
            </GenresDiv>
            <AiredDiv>
              <h4>Aired</h4>
              <h5>
                {animeInfos.season.name} {animeInfos.year.year}
              </h5>
            </AiredDiv>
          </AnimeOtherInfos>
        </AnimeWrapper>
      ) : (
        <LoadingDiv>
          <FallingLines
            color={__styledVariables.buttonFontColor}
            width="150"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </LoadingDiv>
      )}

      <Footer position={"top"} />
    </>
  );
}

const AnimeWrapper = styled.main`
  top: 50px;
  min-height: 100vh;
  overflow: hidden;
  width: 100vw;
  left: 0;
  padding-bottom: 50px;
  position: absolute;
  height: fit-content;
  background-image: linear-gradient(
    #009090,
    #013827,
    #009090,
    #013827,
    #594d7d
  );

  #demo-simple-select {
    height: 51px;
  }

  .MuiFormControl-root {
    width: 100%;
  }

  p {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    text-align: justify;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: ${__styledVariables.buttonFontColor};
  }

  @media (min-width: 800px) {
    min-height: calc(100vh - 77px);
    top: 77px;
    padding: 20px 40px 20px 40px;

    .MuiFormControl-root {
      width: 500px;
      margin-top: 30px;
    }

    p {
      font-size: 20px;
      line-height: 22px;
      margin-top: 30px;
    }

    .description-mobile {
      display: none;
    }
  }

  @media (max-width: 800px) {
    .description-desktop {
      display: none;
    }
  }
`;

const AnimeStatusFavoriteRate = styled.section`
  display: flex;
  padding: 25px 14px;
  img {
    width: 155px;
    height: 212px;
    border-radius: 10px;
  }

  @media (min-width: 800px) {
    img {
      width: 292px;
      height: 399px;
    }
  }
`;

const AnimeMainInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;

  h2 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: ${__styledVariables.buttonFontColor};
  }

  @media (min-width: 800px) {
    margin-left: 40px;

    h2 {
      text-align: center;
      font-size: 30px;
      line-height: 32px;
    }
  }
`;

const YourRateDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 30px;

  h3 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: ${__styledVariables.buttonFontColor};
    margin-bottom: 10px;
  }

  @media (min-width: 800px) {
    h3 {
      text-align: center;
      font-size: 25px;
      margin-top: 35px;
    }
  }
`;

const MoonsRateDiv = styled.div`
  display: flex;
  position: relative;
  .rate-loader {
    position: absolute;
    left: 40%;
    top: -10px;
    transform: translate(-50%, 0);
  }

  @media (min-width: 800px) {
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    .rate-loader {
      position: absolute;
      left: 50%;
      top: -10px;
      transform: translate(-50%, 0);
    }
  }
`;

const AnimeOtherInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 14px;

  p {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    text-align: justify;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: ${__styledVariables.buttonFontColor};
  }

  h4 {
    margin-top: 20px;

    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;
    font-family: ${__styledVariables.mainFont};
    color: ${__styledVariables.buttonFontColor};
  }

  h5 {
    font-family: "Courier New", Courier, monospace;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #ff94e7;
    margin-top: 5px;
  }

  @media (min-width: 800px) {
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    left: 50%;
    transform: translate(-50%, 0);
    max-width: 1200px;
    margin-top: 30px;

    h4 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    h5 {
      font-size: 28px;
      margin-bottom: 10px;
    }
  }
`;

const GenresDiv = styled.div`
  h5 {
    margin-right: 30px;
  }

  h5:first-child {
    margin-left: 0;
  }
  h5:last-child {
    margin-right: 0;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;

  @media (min-width: 800px) {
    flex-direction: column;

    max-width: 500px;
  }
`;

const EpisodesDiv = styled.div`
  text-align: center;

  @media (min-width: 800px) {
    flex-direction: column;
  }
`;

const AiredDiv = styled.div`
  text-align: center;
`;

const Genres = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (min-width: 800px) {
    height: calc(100vh - 77px);
  }
`;

const FavoriteDiv = styled.div`
  position: relative;

  .favorite-loader {
    position: absolute;
    top: 3px;
    left: 10px;
  }
`;

const StatusDiv = styled.div`
  position: relative;

  .status-loader {
    position: absolute;
    top: 3px;
    right: 12px;
  }

  @media (min-width: 800px) {
    .status-loader {
      top: 33px;
      right: 33.5%;
    }
  }
`;
