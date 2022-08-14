import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import AnimeComponent from "../../components/AnimeComponent";
import { FiLogOut } from "react-icons/fi";

import Footer from "../../components/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import profileService from "../../services/profileService";

export default function Profile() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profileInfos, setProfileInfos] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await profileService.getProfileInfos(
          auth.token,
          auth.id
        );
        setProfileInfos(response);
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
  }, [navigate, auth.token, auth.id]);

  function handleLogout() {
    localStorage.clear();
    setAuth("");
    navigate("/");
  }

  return profileInfos ? (
    <>
      <ProfileWrapper>
        <FiLogOut className="logout-icon" onClick={handleLogout} />
        <UserInfos>
          <img src={profileInfos.image} alt="Profile" />
          <h2>{profileInfos.username}</h2>
        </UserInfos>

        <ProfileAnimeInfosContainer>
          <h3>Animes Infos</h3>
          <AnimesInfos>
            <InfosContainer>
              <h4>{profileInfos.animeDoneQuantity}</h4>
              <h5>Dones</h5>
            </InfosContainer>
            <InfosContainer>
              <h4>{profileInfos.durationTime}</h4>
              <h5>Hours</h5>
            </InfosContainer>
            <InfosContainer>
              <h4>{profileInfos.episodesNumber}</h4>
              <h5>Episodes</h5>
            </InfosContainer>
          </AnimesInfos>
        </ProfileAnimeInfosContainer>

        <ProfileAnimeInfosContainer>
          <h3>Favorites</h3>
          <FavoriteAnimes>
            {profileInfos.UserFavoriteAnime?.map((anime) => {
              const {
                animeId,
                anime: { image },
              } = anime;
              return (
                <AnimeComponent key={animeId} id={animeId} image={image} />
              );
            })}
          </FavoriteAnimes>
        </ProfileAnimeInfosContainer>
      </ProfileWrapper>
      <Footer />
    </>
  ) : (
    <></>
  );
}

const ProfileWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100vw;
  left: 0;
  padding: 15px 12.5px;
  padding-bottom: 70px;
  position: absolute;
  height: fit-content;
  background-image: linear-gradient(
    #009090,
    #013827,
    #009090,
    #013827,
    #594d7d
  );

  h3 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 27px;
    color: ${__styledVariables.buttonFontColor};
    margin-top: 60px;
  }

  .logout-icon {
    position: absolute;
    top: 30px;
    right: 20px;
    font-size: 30px;
    color: ${__styledVariables.buttonFontColor};
    filter: drop-shadow(4px 4px 2px #000000);
  }
`;

const UserInfos = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 94px;
    height: 94px;
    border-radius: 50%;
  }

  h2 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    margin-top: 10px;
    color: ${__styledVariables.buttonFontColor};
  }
`;

const ProfileAnimeInfosContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

const AnimesInfos = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const FavoriteAnimes = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  transition: 0.5s;
  padding-right: 7px;

  img {
    margin-bottom: 15px;
  }
`;

const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 29px;
    color: #c274ff;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.55);
  }

  h5 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    color: ${__styledVariables.buttonFontColor};
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.55);
  }
`;
