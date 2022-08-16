import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import userStatusAnime from "../../services/userStatusAnimes";
import Footer from "../../components/Footer";
import UserAnimesHeader from "../../components/userAnimes/UserAnimesHeader";
import AnimeComponent from "../../components/AnimeComponent";
import Header from "../../components/Header";
import { __swalErrorMessage } from "../../utils/utils";
import { FallingLines } from "react-loader-spinner";

export default function UserStatusAnime() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { search: query } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [animes, setAnimes] = useState();
  const [queryString, setQueryString] = useState(query || "?s=watching");
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    (async () => {
      try {
        const result = await userStatusAnime.getUserStatusAnime(
          auth.token,
          queryString
        );
        setAnimes(result);
        setQueryString(query);
        setPageLoading(false);
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
        setPageLoading(false);
      }
    })();
  }, [auth.token, queryString, navigate, searchParams, query]);

  return (
    <>
      <Header />
      <UserAnimesHeader
        setSearchParams={(value) => setSearchParams(value)}
        queryString={queryString}
      />
      {!pageLoading && animes ? (
        <UserAnimesWrapper>
          <h2>
            {animes.length > 1
              ? `${animes.length} Animes Found`
              : `${animes.length} Anime Found`}
          </h2>
          <AnimesContainer>
            {animes.map((anime) => {
              const {
                animeId,
                anime: { image },
              } = anime;

              return (
                <AnimeComponent key={animeId} id={animeId} image={image} />
              );
            })}
          </AnimesContainer>
        </UserAnimesWrapper>
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

      <Footer />
    </>
  );
}

const UserAnimesWrapper = styled.main`
  min-height: calc(100vh - 62px);
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

  h2 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
    line-height: 22px;
    color: ${__styledVariables.buttonFontColor};
  }

  @media (min-width: 800px) {
    padding-top: 40px;
    min-height: calc(100vh - 139px);
    h2 {
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
`;

const AnimesContainer = styled.section`
  display: flex;
  width: 100vw;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
  padding-left: 18px;
  justify-content: space-between;
  flex-wrap: wrap;
  transition: 0.5s;

  img {
    margin-bottom: 15px;
  }
  @media (min-width: 800px) {
    padding: 25px 60px 0 60px;
    justify-content: space-evenly;

    img {
      margin-bottom: 25px;
    }
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 62px);

  @media (min-width: 800px) {
    height: calc(100vh - 139px);
  }
`;
