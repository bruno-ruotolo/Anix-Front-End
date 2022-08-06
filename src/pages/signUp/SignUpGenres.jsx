import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";

import { SignUpContext } from "../../contexts/SignUpContext";

import AnixLogo from "../../assets/AnixLogo.png";
import "antd/dist/antd.css";
import __styledVariables from "../../global/StyledVariables";
import DropDown from "../../components/DropDown";
import signUpService from "../../services/signUpService";

export default function SignUpGenres() {
  const navigate = useNavigate();

  const { signUp, setSignUp } = useContext(SignUpContext);

  const [genresArr, setGenresArr] = useState();
  const [signUpData, setSignUpData] = useState({
    firstGenreId: "",
    secondGenreId: "",
    thirdGenreId: "",
  });
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (!signUp?.email || !signUp?.password) navigate("/signup");
    if (!signUp?.username || !signUp?.image || !signUp?.genderId)
      navigate("/signup/infos");
    async function getAllGenres() {
      try {
        const promise = await signUpService.getAllGenres();
        setGenresArr(promise);
      } catch (e) {
        console.log(
          "Somenthing Went Wrong on TryCatch Block (DropDown.jsx [12])"
        );
      }
    }
    getAllGenres();
  }, []);

  async function handleForm(e) {
    e.preventDefault();
    try {
      await signUpService.createUser({ ...signUp, ...signUpData });
      navigate("/home");
    } catch (error) {
      console.log(e.response.data);
    }
  }

  return (
    <SignUpCredentialsMain>
      <img src={AnixLogo} alt="AnixLogo" />
      <Form onSubmit={handleForm}>
        <h2>Select 3 of your favorites anime genres</h2>
        <DropDown
          className="drop-down"
          type="First Genre"
          array={genresArr}
          setCallBack={(value) =>
            setSignUpData({ ...signUpData, firstGenreId: value })
          }
        />

        <DropDown
          type="Second Genre"
          array={genresArr}
          setCallBack={(value) =>
            setSignUpData({ ...signUpData, secondGenreId: value })
          }
        />

        <DropDown
          type="Third Genre"
          array={genresArr}
          setCallBack={(value) =>
            setSignUpData({ ...signUpData, thirdGenreId: value })
          }
        />
        <button type="submit" disabled={pageLoading}>
          {pageLoading ? "Loading..." : "Register"}
        </button>
      </Form>
    </SignUpCredentialsMain>
  );
}

const SignUpCredentialsMain = styled.main`
  position: relative;
  height: 100vh;
  width: 100vw;

  img {
    position: absolute;
    width: 113px;
    height: 102px;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  p {
    position: absolute;
    width: 330px;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);

    text-align: center;
    font-family: ${__styledVariables.mainFont};
    color: #f2f2f2;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
  }
`;

const Form = styled.form`
  max-width: 1000px;
  top: 160px;

  h2 {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 15px;

    color: #ffffff;
  }

  button {
    position: relative;
    min-width: 258px;
    width: 65%;
    max-width: 500px;
    height: 54px;
    margin-top: 30px;
  }
`;
