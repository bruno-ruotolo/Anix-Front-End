import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import __styledVariables from "../../global/StyledVariables";
import searchService from "../../services/searchService";
import SelectBox from "../SelectBox";

export default function SearchHeader({ setSearchParams, searchParams }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [yearsList, setYearsList] = useState([]);
  const [genresList, setGeresList] = useState([]);
  const [inputHeader, setInputHeader] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const resultYear = await searchService.getAllYears(auth.token);
        setYearsList(resultYear);
        const resultGenre = await searchService.getAllGenres(auth.token);
        setGeresList(resultGenre);
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
  return yearsList.length > 0 && genresList.length > 0 ? (
    <HeaderWrapper>
      <input
        className="search-input"
        type="text"
        onChange={(e) => {
          setInputHeader(e.target.value);
        }}
      />
      <SelectBoxesContainer>
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
          width="120px"
          placeholder="Year"
          type="number"
          list={yearsList}
        />
        <SelectBox
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
      </SelectBoxesContainer>
    </HeaderWrapper>
  ) : (
    <></>
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
`;

const SelectBoxesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
