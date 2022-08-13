import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

import Footer from "../../components/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import animeService from "../../services/animeService";
import DropDown from "../../components/DropDown";
import RateButton from "../../components/anime/RateButton";
import FavoriteButton from "../../components/anime/FavoriteButton";

export default function Anime() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const [animeInfos, setAnimeInfos] = useState();
  const [statusArr, setStatusArr] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [rate, setRate] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const rateIconsValues = [1, 2, 3, 4, 5];

  useEffect(() => {
    (async () => {
      try {
        const animeInfos = await animeService.getAnimeInfos(auth.token, id);
        const status = await animeService.getAllStatus(auth.token, id);
        setCurrentStatus(animeInfos.UserStatusAnime[0]?.status.id);
        setAnimeInfos(animeInfos);
        setStatusArr(status);
        setRate(animeInfos.UserRateAnime[0]?.rate);
        setFavorite(animeInfos.UserFavoriteAnime.length > 0 ? true : false);
      } catch (error) {
        if (error.response === 401) {
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
  }, [navigate, auth.token, id]);

  async function handleStatus(statusId) {
    try {
      await animeService.createStatus(auth.token, id, statusId);
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
  }

  async function handleRate(rate) {
    try {
      await animeService.createRate(auth.token, id, rate);
      setRate(rate);
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
  }

  async function handleFavorite(favorite) {
    try {
      if (favorite) await animeService.createFavorite(auth.token, id);
      else await animeService.deleteFavorite(auth.token, id);
      setFavorite(favorite);
    } catch (error) {
      console.log(
        "🚀 ~ file: Anime.jsx ~ line 139 ~ handleFavorite ~ error",
        error
      );
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
  }
  return animeInfos ? (
    <>
      <AnimeWrapper>
        <Footer position={"top"} />
        <AnimeStatusFavoriteRate>
          <FavoriteButton
            favorite={favorite}
            setFavorite={(value) => handleFavorite(value)}
          />
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
                      key={value}
                      value={value}
                      setRate={(value) => handleRate(value)}
                      rate={rate}
                    />
                  );
                })}
              </MoonsRateDiv>
            </YourRateDiv>
            <DropDown
              id="#select-box-status"
              type="Status"
              array={statusArr}
              setCallBack={(value) => handleStatus(value)}
              statusId={currentStatus}
            />
          </AnimeMainInfos>
        </AnimeStatusFavoriteRate>
        <AnimeOutherInfos>
          <p>{animeInfos.description}</p>
          <h4>Episodes</h4>
          <h5>{animeInfos.episodes}</h5>
          <h4>Genres</h4>
          <GenresDiv>
            {animeInfos.animesGenres?.map(({ genre }) => {
              const { name, id } = genre;
              return <h5 key={id}>{name}</h5>;
            })}
          </GenresDiv>
          <h4>Aired</h4>
          <h5>
            {animeInfos.season.name} {animeInfos.year.year}
          </h5>
        </AnimeOutherInfos>
      </AnimeWrapper>
    </>
  ) : (
    <></>
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

  #select-box-status {
    width: 50px;
  }

  .MuiFormControl-root {
    width: 182;
  }

  #demo-simple-select {
    height: 51px;
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
`;

const MoonsRateDiv = styled.div`
  display: flex;
`;

const AnimeOutherInfos = styled.div`
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
`;
