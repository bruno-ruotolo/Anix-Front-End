import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import AnimeComponent from "../../components/AnimeComponent";

import Footer from "../../components/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import homeService from "../../services/homeService";

export default function Season() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [seasonAnimes, setSeasonAnimes] = useState([]);
  console.log(
    "🚀 ~ file: Profile.jsx ~ line 16 ~ Profile ~ profileInfos",
    seasonAnimes
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await homeService.getSeason(auth.token);
        setSeasonAnimes(response);
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

  return seasonAnimes.length > 0 ? (
    <>
      <SeasonWrapper>
        <h2>Summer 2022</h2>
        <SeasonListContainer>
          {seasonAnimes.map((seasonAnime) => {
            const { id, title, image } = seasonAnime;
            return (
              <AnimeComponent key={id} id={id} title={title} image={image} />
            );
          })}
        </SeasonListContainer>
      </SeasonWrapper>
      <Footer />
    </>
  ) : (
    <></>
  );
}

const SeasonWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100vw;
  left: 0;
  padding: 30px 12.5px;
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

  h2 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    text-align: center;
    color: ${__styledVariables.buttonFontColor};
  }
`;

const SeasonListContainer = styled.section`
  display: flex;
  width: 100vw;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 15px;
  justify-content: space-around;
  flex-wrap: wrap;
  transition: 0.5s;
  padding-right: 7px;
  margin-top: 20px;

  img {
    margin-bottom: 15px;
  }
`;
