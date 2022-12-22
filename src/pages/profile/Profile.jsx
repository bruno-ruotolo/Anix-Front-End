import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";

import Footer from "../../components/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import profileService from "../../services/profileService";
import AnimeComponent from "../../components/AnimeComponent";
import Header from "../../components/Header";
import { FallingLines } from "react-loader-spinner";

export default function Profile() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profileInfos, setProfileInfos] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    (async () => {
      try {
        const response = await profileService.getProfileInfos(auth.token);
        setProfileInfos(response);
        setPageLoading(false);
      } catch (error) {
        setPageLoading(false);
        setAuth("");
        localStorage.removeItem("auth");
        navigate("/");
      }
    })();
  }, [navigate, auth.token, auth.id, setAuth]);

  function handleLogout() {
    localStorage.clear();
    setAuth("");
    navigate("/");
  }

  return (
    <>
      <Header />
      {!pageLoading && profileInfos ? (
        <ProfileWrapper>
          <FiLogOut className="logout-icon" onClick={handleLogout} />
          <ProfileWrapperDesktop>
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
          </ProfileWrapperDesktop>

          <hr />
          <ProfileFavoriteContainer>
            <h3>Favorites</h3>
            <FavoriteAnimes>
              {profileInfos.UserFavoriteAnime.length > 0 ? (
                profileInfos.UserFavoriteAnime?.map((anime) => {
                  const {
                    animeId,
                    anime: { image },
                  } = anime;
                  return (
                    <AnimeComponent key={animeId} id={animeId} image={image} />
                  );
                })
              ) : (
                <p>You don't have any favorite animes yet </p>
              )}
            </FavoriteAnimes>
          </ProfileFavoriteContainer>
        </ProfileWrapper>
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

      <Footer />
    </>
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
    transition: 0.5s;
    filter: drop-shadow(4px 4px 2px #000000);

    cursor: pointer;

    &:hover {
      filter: drop-shadow(4px 4px 2px #000000);
      transform: translateX(-10px);
    }
  }

  hr {
    width: 90%;
    margin: 0 30px;
    margin-top: 50px;
  }

  @media (min-width: 933px) {
    min-height: calc(100vh - 77px);

    .logout-icon {
      font-size: 40px;
      right: 10%;
      filter: none;
    }

    h3 {
      font-size: 34px;
      margin: 30px;
      line-height: 36px;
    }
  }

  @media (max-width: 933px) {
    hr {
      display: none;
    }
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

  @media (min-width: 933px) {
    img {
      width: 150px;
      height: 150px;
    }

    h2 {
      font-size: 28px;
      margin-top: 30px;
      line-height: 32px;
      width: 100%;
    }
  }
`;

const ProfileAnimeInfosContainer = styled.article`
  display: flex;
  flex-direction: column;

  @media (min-width: 933px) {
    width: 100%;
    max-width: 700px;
    align-items: center;
    justify-content: space-between;
    margin-left: 150px;
  }
`;

const ProfileFavoriteContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

const AnimesInfos = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;

  @media (min-width: 933px) {
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
`;

const FavoriteAnimes = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
  justify-content: space-evenly;
  flex-wrap: wrap;

  padding-right: 7px;

  p {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
    line-height: 22px;
    color: ${__styledVariables.buttonFontColor};
  }

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

  @media (min-width: 933px) {
    h4 {
      font-size: 25px;
      margin-bottom: 10px;
      margin-right: 20px;
    }

    h5 {
      font-size: 25px;
      margin-right: 20px;
    }
  }
`;

const ProfileWrapperDesktop = styled.div`
  @media (min-width: 933px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px 300px;
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (min-width: 933px) {
    height: calc(100vh - 77px);
  }
`;
