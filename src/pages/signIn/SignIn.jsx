import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RiEye2Line, RiEyeCloseFill } from "react-icons/ri";

import AnixLogo from "../../assets/AnixLogo.png";
import __styledVariables from "../../global/StyledVariables";
import signUpService from "../../services/signUpService";
import Swal from "sweetalert2";

export default function SignIn() {
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pageLoading, setPageLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });

  async function handleForm(e) {
    e.preventDefault();
    setValidations({ ...validations, password: true });
    try {
      await signUpService.validateEmail({ email: signInData.email });
      setValidations({ ...validations, password: false });
      navigate("/signIn/infos");
    } catch (e) {}
  }

  function handleInput(e, property) {
    setSignInData({ ...signInData, [property]: e.target.value });
  }

  function handleShowPassword(status, property) {
    if (status === false) {
      setShowPassword({ ...showPassword, [property]: true });
    } else setShowPassword({ ...showPassword, [property]: false });
  }

  return (
    <SignInCredentialsMain>
      <img src={AnixLogo} alt="AnixLogo" />
      <Form onSubmit={handleForm}>
        <input
          id="signUpEmail"
          type="email"
          placeholder="Email"
          autoComplete="true"
          onErrorCapture={console.log("erro")}
          value={signInData.email}
          onChange={(e) => handleInput(e, "email")}
          disabled={pageLoading}
          required
        />
        <PaswordInputDiv>
          <input
            id="signUpPassword"
            type={showPassword.password ? "text" : "password"}
            placeholder="Password"
            autoComplete="true"
            value={signInData.password}
            pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            onChange={(e) => handleInput(e, "password")}
            disabled={pageLoading}
            required
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
        <button type="submit" disabled={pageLoading}>
          {pageLoading ? "Loading..." : "login"}
        </button>
      </Form>

      <p onClick={() => navigate("/signup")}>
        Are you lost? Click here to sign up!
      </p>
    </SignInCredentialsMain>
  );
}

const SignInCredentialsMain = styled.main`
  position: relative;
  height: 100vh;
  width: 100vw;

  img {
    position: absolute;
    width: 177px;
    height: 160px;
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

  input {
    width: 100%;
    border-color: ${({ passwordValidation }) =>
      passwordValidation ? "#e50000" : "initial"};
  }
`;
