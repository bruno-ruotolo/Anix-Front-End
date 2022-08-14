import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import Footer from "../../components/Footer";
import AnimeComponent from "../../components/AnimeComponent";
import searchService from "../../services/searchService";
import SearchHeader from "../../components/search/SearchHeader";

export default function Search() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { search: query } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [animes, setAnimes] = useState([1]);
  const [queryString, setQueryString] = useState(query || "");

  useEffect(() => {
    (async () => {
      try {
        const result = await searchService.getSearchAnimes(
          auth.token,
          queryString
        );
        setAnimes(result);
        setQueryString(query);
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
  }, [auth.token, queryString, navigate, searchParams, query]);

  return (
    <>
      <SearchHeader
        setSearchParams={(value) => setSearchParams(value)}
        searchParams={searchParams}
        queryString={queryString}
      />

      <SearchWrapper>
        <p>{animes.length === 0 ? "No Animes Found" : ""}</p>
        <AnimesContainer>
          {animes?.map((anime) => {
            const { id, image, title } = anime;

            return (
              <AnimeInfosContainer key={id * Math.random()}>
                <span>{title?.slice(0, 16)}</span>
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
`;

const AnimeInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  height: fit-content;
  flex-wrap: wrap;
  max-width: 116px;

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
`;
