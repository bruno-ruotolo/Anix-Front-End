import { useContext, useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import searchService from "../../services/searchService";
import { __swalErrorMessage } from "../../utils/utils";
import SelectBox from "../SelectBox";

export default function SearchHeader({ setSearchParams, searchParams }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [yearsList, setYearsList] = useState([]);
  const [genresList, setGeresList] = useState([]);
  const [inputHeader, setInputHeader] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    (async () => {
      try {
        const resultYear = await searchService.getAllYears(auth.token);
        setYearsList(resultYear);
        const resultGenre = await searchService.getAllGenres(auth.token);
        setGeresList(resultGenre);
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
          localStorage.removeItem("auth");
          window.location.reload();
        }
        setPageLoading(false);
      }
    })();
  }, [auth.token, navigate]);

  useEffect(() => {
    if (searchParams.has("g") && !searchParams.has("y"))
      setSearchParams({ g: searchParams.get("g"), s: inputHeader });
    else if (searchParams.has("y") && !searchParams.has("g"))
      setSearchParams({ y: searchParams.get("y"), s: inputHeader });
    else if (searchParams.has("y") && searchParams.has("g"))
      setSearchParams({
        g: searchParams.get("g"),
        y: searchParams.get("y"),
        s: inputHeader,
      });
    else
      setSearchParams({
        s: inputHeader,
      });
  }, [inputHeader, searchParams]);

  return (
    <HeaderWrapper>
      <input
        className="search-input"
        type="text"
        onChange={(e) => {
          setInputHeader(e.target.value);
        }}
      />

      <SelectBoxesContainer>
        {!pageLoading ? (
          <SelectBox
            setSelectedItem={(value) => {
              if (searchParams.has("g") && value)
                setSearchParams({ g: searchParams.get("g"), y: value.id });
              else if (value) setSearchParams({ y: value.id });
              else if (!value && searchParams.has("g"))
                setSearchParams({ g: searchParams.get("g"), y: "" });
              else setSearchParams({ y: "" });
            }}
            height="35px"
            width="110px"
            placeholder="Year"
            type="number"
            list={yearsList}
          />
        ) : (
          <LoadingDiv>
            <FallingLines
              color={__styledVariables.buttonFontColor}
              width="50px"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          </LoadingDiv>
        )}

        {!pageLoading ? (
          <SelectBox
            id="select-box-genre"
            height="35px"
            width="200px"
            placeholder="Genre"
            setSelectedItem={(value) => {
              if (searchParams.has("y") && value)
                setSearchParams({ y: searchParams.get("y"), g: value.id });
              else if (value) setSearchParams({ g: value.id });
              else if (!value && searchParams.has("y"))
                setSearchParams({ y: searchParams.get("y"), g: "" });
              else setSearchParams({ g: "" });
            }}
            list={genresList}
          />
        ) : (
          <LoadingDiv>
            <FallingLines
              color={__styledVariables.buttonFontColor}
              width="50"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          </LoadingDiv>
        )}
      </SelectBoxesContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  position: sticky;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 105px;
  position: sticky;
  padding: 10px 20px;
  z-index: 10;
  top: -50px;

  background-color: #8f678b;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  .search-input {
    margin-bottom: 0;
    min-height: 0;
    height: 39px;
  }

  @media (min-width: 800px) {
    background-color: #462b43;
  }
`;

const SelectBoxesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 800px) {
    max-width: 1000px;
    section {
      &:first-child {
        form {
          width: 180px;
        }
      }

      &:last-child {
        form {
          width: 500px;
        }
      }
    }
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 100px;
  @media (min-width: 800px) {
    width: 200px;
  }
`;
