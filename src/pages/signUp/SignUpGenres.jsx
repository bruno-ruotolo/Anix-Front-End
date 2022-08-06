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
import { TailSpin } from "react-loader-spinner";

export default function SignUpGenres() {
  const navigate = useNavigate();

  const { signUp } = useContext(SignUpContext);

  const [genresArr, setGenresArr] = useState();
  const [signUpData, setSignUpData] = useState({
    firstGenreId: "",
    secondGenreId: "",
    thirdGenreId: "",
  });
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    if (!signUp?.email || !signUp?.password) {
      navigate("/signup");
      setPageLoading(false);
    }
    if (!signUp?.username || !signUp?.image || !signUp?.genderId) {
      navigate("/signup/infos");
      setPageLoading(false);
    }
    async function getAllGenres() {
      try {
        const promise = await signUpService.getAllGenres();
        setGenresArr(promise);
        setPageLoading(false);
      } catch (e) {
        console.log(
          "Somenthing Went Wrong on TryCatch Block (DropDown.jsx [12])"
        );
        setPageLoading(false);
      }
    }
    getAllGenres();
  }, [
    navigate,
    signUp?.email,
    signUp?.password,
    signUp?.username,
    signUp?.image,
    signUp?.genderId,
  ]);

  async function handleForm(e) {
    e.preventDefault();
    setPageLoading(true);
    try {
      await signUpService.createUser({ ...signUp, ...signUpData });
      setPageLoading(false);
      navigate("/home");
    } catch (error) {
      console.log(e.response.data);
      setPageLoading(false);
    }
  }

  return (
    <SignUpCredentialsMain>
      <img src={AnixLogo} alt="AnixLogo" />
      <Form onSubmit={handleForm}>
        <h2>Select 3 of your favorites anime genres</h2>
        <DropDown
          disabled={pageLoading}
          className="drop-down"
          type="First Genre"
          array={genresArr}
          setCallBack={(value) =>
            setSignUpData({ ...signUpData, firstGenreId: value })
          }
        />

        <DropDown
          disabled={pageLoading}
          type="Second Genre"
          array={genresArr}
          setCallBack={(value) =>
            setSignUpData({ ...signUpData, secondGenreId: value })
          }
        />

        <DropDown
          disabled={pageLoading}
          type="Third Genre"
          array={genresArr}
          setCallBack={(value) =>
            setSignUpData({ ...signUpData, thirdGenreId: value })
          }
        />
        <button type="submit" disabled={pageLoading}>
          {pageLoading ? (
            <TailSpin
              width="40"
              height="80"
              radius="2"
              color={__styledVariables.buttonFontColor}
            />
          ) : (
            "Register"
          )}
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