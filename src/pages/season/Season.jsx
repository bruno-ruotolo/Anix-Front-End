import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import AnimeComponent from "../../components/AnimeComponent";

import Footer from "../../components/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import homeService from "../../services/homeService";
import Header from "../../components/Header";
import { __swalErrorMessage } from "../../utils/utils";
import { FallingLines } from "react-loader-spinner";

export default function Season() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [seasonAnimes, setSeasonAnimes] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    (async () => {
      try {
        const response = await homeService.getSeason(auth.token);
        setSeasonAnimes(response);
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
  }, [navigate, auth.token, auth.id]);

  return (
    <>
      <Header />

      <SeasonWrapper>
        <h2>Summer 2022</h2>
        {!pageLoading ? (
          <SeasonListContainer>
            {seasonAnimes.map((seasonAnime) => {
              const { id, title, image } = seasonAnime;
              return (
                <AnimeComponent key={id} id={id} title={title} image={image} />
              );
            })}
          </SeasonListContainer>
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
      </SeasonWrapper>
      <Footer />
    </>
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

  @media (min-width: 800px) {
    min-height: calc(100vh - 77px);
    h2 {
      font-size: 50px;
    }
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
  padding-right: 7px;
  margin-top: 20px;

  img {
    margin-bottom: 15px;
  }

  @media (min-width: 800px) {
    padding: 45px 60px 0 60px;
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
  height: calc(100vh - 400px);

  @media (min-width: 800px) {
    height: calc(100vh - 400px);
  }
`;
