import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import userStatusAnime from "../../services/userStatusAnimes";
import Footer from "../../components/Footer";
import UserAnimesHeader from "../../components/userAnimes/UserAnimesHeader";
import AnimeComponent from "../../components/AnimeComponent";

export default function UserStatusAnime() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { search: query } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [animes, setAnimes] = useState([]);
  const [queryString, setQueryString] = useState(query || "?s=watching");

  useEffect(() => {
    (async () => {
      try {
        const result = await userStatusAnime.getUserStatusAnime(
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

  return animes.length > 0 ? (
    <>
      <UserAnimesHeader
        setSearchParams={(value) => setSearchParams(value)}
        queryString={queryString}
      />
      <UserAnimesWrapper>
        <h2> {animes.length} Animes Found</h2>
        <AnimesContainer>
          {animes.map((anime) => {
            const {
              animeId,
              anime: { image },
            } = anime;

            return <AnimeComponent key={animeId} id={animeId} image={image} />;
          })}
        </AnimesContainer>
      </UserAnimesWrapper>
      <Footer />
    </>
  ) : (
    <></>
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
`;
