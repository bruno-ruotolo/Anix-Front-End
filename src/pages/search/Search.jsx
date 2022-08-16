import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import Footer from "../../components/Footer";
import AnimeComponent from "../../components/AnimeComponent";
import searchService from "../../services/searchService";
import SearchHeader from "../../components/search/SearchHeader";
import Header from "../../components/Header";
import { __swalErrorMessage } from "../../utils/utils";
import { FallingLines } from "react-loader-spinner";

export default function Search() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { search: query } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [animes, setAnimes] = useState([1]);
  const [queryString, setQueryString] = useState(query || "");
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    (async () => {
      try {
        const result = await searchService.getSearchAnimes(
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

      <SearchHeader
        setSearchParams={(value) => setSearchParams(value)}
        searchParams={searchParams}
        queryString={queryString}
      />
      {!pageLoading ? (
        <>
          <SearchWrapper>
            <p>{animes.length === 0 ? "No Animes Found" : ""}</p>
            <AnimesContainer>
              {animes?.map((anime) => {
                const { id, image, title } = anime;

                return (
                  <AnimeInfosContainer key={id * Math.random()}>
                    <span className="anime-title-mobile">
                      {title?.slice(0, 16)}
                    </span>
                    <span className="anime-title-desktop">
                      {title?.slice(0, 30)}
                    </span>
                    <AnimeComponent
                      className="anime-component"
                      key={id * Math.random()}
                      id={id}
                      image={image}
                    />
                  </AnimeInfosContainer>
                );
              })}
            </AnimesContainer>
          </SearchWrapper>
        </>
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

const SearchWrapper = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  left: 0;
  padding-bottom: 50px;
  position: absolute;
  min-height: calc(100vh - 105px);
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

  @media (min-width: 800px) {
    min-height: calc(100vh - 182px);
  }
`;

const AnimesContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 15px;
  padding-left: 18px;
  flex-wrap: wrap;
  transition: 0.5s;

  img {
    margin-bottom: 15px;
  }

  @media (min-width: 800px) {
    padding: 15px 80px 0 80px;

    img {
      margin-bottom: 35px;
    }
  }
`;

const AnimeInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  height: fit-content;
  flex-wrap: wrap;
  max-width: fit-content;

  span {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    text-align: center;
    line-height: 12px;
    text-align: center;
    margin-right: 18px;
    color: ${__styledVariables.buttonFontColor};
  }

  @media (min-width: 800px) {
    max-width: 190px;
    .anime-title-mobile {
      display: none;
    }

    span {
      font-size: 15px;
      line-height: 17px;
      margin-bottom: 11px;
    }
  }

  @media (max-width: 800px) {
    .anime-title-desktop {
      display: none;
    }
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (min-width: 800px) {
    height: calc(100vh - 105px);
  }
`;
