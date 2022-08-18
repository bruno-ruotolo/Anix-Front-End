import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";

import { SignUpContext } from "../../contexts/SignUpContext";

import AnixLogo from "../../assets/AnixLogo.png";
import __styledVariables from "../../global/StyledVariables";
import DropDown from "../../components/DropDown";
import signUpService from "../../services/signUpService";
import { TailSpin } from "react-loader-spinner";
import { __swalErrorMessage } from "../../utils/utils";

export default function SignUpInfos() {
  const navigate = useNavigate();
  const { signUp, setSignUp } = useContext(SignUpContext);

  const [gendersArr, setGendersArr] = useState();

  const [signUpData, setSignUpData] = useState({
    username: "",
    image: "",
    genderId: "",
  });

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(true);
    if (signUp?.username && signUp?.image && signUp?.genderId) {
      setPageLoading(false);
      navigate("/signup/genres");
    }

    if (!signUp?.email || !signUp?.password) {
      setPageLoading(false);
      navigate("/signup");
    }
    async function getAllGenders() {
      try {
        const promise = await signUpService.getAllGenders();
        setPageLoading(false);
        setGendersArr(promise);
      } catch (e) {
        __swalErrorMessage("Something got wrong", "Please, try again later!");
        setPageLoading(false);
      }
    }
    getAllGenders();
  }, [signUp, navigate]);

  function handleForm(e) {
    setPageLoading(true);
    e.preventDefault();
    setSignUp({ ...signUp, ...signUpData });
    setPageLoading(false);

    if (signUpData.genderId) navigate("/signup/genres");
  }

  function handleInput({ target }, property) {
    setSignUpData({ ...signUpData, [property]: target.value });
  }

  return (
    <SignUpCredentialsMain>
      <img src={AnixLogo} alt="AnixLogo" />
      <Form onSubmit={handleForm}>
        <input
          id="signup-username"
          type="text"
          placeholder="Username"
          autoComplete="true"
          value={signUpData.username}
          onChange={(e) => handleInput(e, "username")}
          disabled={pageLoading}
          required
        />
        <input
          id="signup-image"
          type="url"
          placeholder="Image Link"
          autoComplete="true"
          value={signUpData.image}
          onChange={(e) => handleInput(e, "image")}
          disabled={pageLoading}
          required
        />
        <DropDown
          id="select-box-infos"
          disabled={pageLoading}
          width="600px"
          type="Gender"
          array={gendersArr}
          setCallBack={(value) =>
            setSignUpData({ ...signUpData, genderId: value })
          }
        />
        <button id="signup-info-button" disabled={pageLoading}>
          {pageLoading ? (
            <TailSpin
              width="40"
              height="80"
              radius="2"
              color={__styledVariables.buttonFontColor}
            />
          ) : (
            "Next"
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
  .MuiFormControl-root {
    width: 100%;
  }

  @media (min-width: 800px) {
    img {
      top: 60px;
      width: 177px;
      height: 160px;
    }

    p {
      bottom: 200px;
      width: 700px;
    }
  }
`;

const Form = styled.form`
  max-width: 600px;
  top: 200px;

  button {
    cursor: pointer;
    position: relative;
    min-width: 258px;
    width: 65%;
    max-width: 300px;
    height: 54px;
    margin-top: 30px;

    &:hover {
      box-shadow: inset 6px 4px 10px 6px rgba(0, 0, 0, 0.5);
    }
  }

  @media (min-width: 800px) {
    top: 250px;
  }
`;
