import { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RiEye2Line, RiEyeCloseFill } from "react-icons/ri";

import { SignUpContext } from "../../contexts/SignUpContext";

import AnixLogo from "../../assets/AnixLogo.png";
import __styledVariables from "../../global/StyledVariables";

export default function SignUpCredentials() {
  const navigate = useNavigate();

  const { singUp, setSignUp } = useContext(SignUpContext);

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pageLoading, setPageLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  function handleForm(e) {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      console.log("Password must be equals");
    } else {
      console.log("Password must be equals");
    }
  }

  function handleInput({ target }, property) {
    setSignUpData({ ...signUpData, [property]: target.value });
  }

  function handleShowPassword(status, property) {
    if (status === false)
      setShowPassword({ ...showPassword, [property]: true });
    else setShowPassword({ ...showPassword, [property]: false });
  }

  return (
    <SignUpCredentialsMain>
      <img src={AnixLogo} alt="AnixLogo" />
      <Form onSubmit={handleForm}>
        <input
          id="signUpEmail"
          type="email"
          placeholder="Email"
          autoComplete="true"
          value={signUpData.email}
          onChange={(e) => handleInput(e, "email")}
          disabled={pageLoading}
        />
        <PaswordInputDiv>
          <input
            id="signUpPassword"
            type={showPassword.password ? "text" : "password"}
            placeholder="Password"
            autoComplete="true"
            value={signUpData.password}
            pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            onChange={(e) => handleInput(e, "password")}
            disabled={pageLoading}
          />
          {showPassword.password ? (
            <RiEye2Line
              className="eyeIcon"
              id="eyeOpen"
              onClick={() =>
                handleShowPassword(showPassword.password, "password")
              }
            />
          ) : (
            <RiEyeCloseFill
              className="eyeIcon"
              id="eyeClose"
              onClick={() =>
                handleShowPassword(showPassword.password, "password")
              }
            />
          )}
        </PaswordInputDiv>
        <PaswordInputDiv>
          <input
            id="signUpConfirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Confirm Password"
            autoComplete="true"
            pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            value={signUpData.confirmPassword}
            onChange={(e) => handleInput(e, "confirmPassword")}
            disabled={pageLoading}
          />
          {showPassword.confirm ? (
            <RiEye2Line
              className="eyeIcon"
              id="eyeOpen"
              onClick={() =>
                handleShowPassword(showPassword.confirm, "confirm")
              }
            />
          ) : (
            <RiEyeCloseFill
              className="eyeIcon"
              id="eyeClose"
              onClick={() =>
                handleShowPassword(showPassword.confirm, "confirm")
              }
            />
          )}
        </PaswordInputDiv>
        <button disabled={pageLoading}>
          {pageLoading ? "Loading..." : "Continue"}
        </button>
      </Form>

      <p>Have you already done it? Login here!</p>
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
  bottom: 150px;

  button {
    position: relative;
    min-width: 258px;
    width: 65%;
    max-width: 500px;
    height: 54px;
    margin-top: 30px;
  }
`;

const PaswordInputDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 85%;

  .eyeIcon {
    position: absolute;
    right: 8px;
    top: 18px;

    font-size: 22px;
  }
`;
