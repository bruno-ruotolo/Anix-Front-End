import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RiEye2Line, RiEyeCloseFill } from "react-icons/ri";
import jwt_decode from "jwt-decode";

import AnixLogo from "../../assets/AnixLogo.png";
import __styledVariables from "../../global/StyledVariables";
import signUpService from "../../services/signUpService";
import { AuthContext } from "../../contexts/AuthContext";
import { TailSpin } from "react-loader-spinner";
import { __swalErrorMessage } from "../../utils/utils";

export default function SignIn() {
  const navigate = useNavigate();
  const { setAuth, auth } = useContext(AuthContext);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
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

  useEffect(() => {
    if (auth.id) navigate("/home");
  }, [auth, navigate]);

  async function handleForm(e) {
    e.preventDefault();
    setPageLoading(true);
    setValidations({ ...validations, password: true });

    try {
      const token = await signUpService.createTokenAndLogin(signInData);
      setValidations({ ...validations, password: false });
      localStorage.setItem("auth", token);
      const userInfos = token ? jwt_decode(token) : null;
      setAuth({ ...userInfos, token });
      setPageLoading(false);
      navigate("/home");
    } catch (e) {
      if (e.response.status === 401) {
        __swalErrorMessage(
          "Invalid Email/Password",
          "Please, check your informations and try again"
        );
      } else {
        __swalErrorMessage("Something got wrong", "Please, try again later!");
      }
      setPageLoading(false);
    }
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
          id="signin-email"
          type="email"
          placeholder="Email"
          autoComplete="true"
          value={signInData.email}
          onChange={(e) => handleInput(e, "email")}
          disabled={pageLoading}
          required
        />
        <PaswordInputDiv>
          <input
            id="signin-password"
            type={showPassword.password ? "text" : "password"}
            placeholder="Password"
            autoComplete="true"
            value={signInData.password}
            pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            title="Must have 8 characters, at least one letter, one number and one special character"
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
        <button id="signin-button" type="submit" disabled={pageLoading}>
          {pageLoading ? (
            <TailSpin
              width="40"
              height="80"
              radius="2"
              color={__styledVariables.buttonFontColor}
            />
          ) : (
            "Login"
          )}
        </button>
      </Form>

      <p id="navigate-signup" onClick={() => navigate("/signup")}>
        Are you lost? Click here to sign up!
      </p>
    </SignInCredentialsMain>
  );
}

const SignInCredentialsMain = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    top: 550px;
    left: 50%;
    transform: translate(-50%, 0);
    cursor: pointer;

    text-align: center;
    font-family: ${__styledVariables.mainFont};
    color: #f2f2f2;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;

    &:hover {
      filter: drop-shadow(-4px 4px 2px #000000);
    }
  }

  @media (min-width: 800px) {
    height: 100vh;
    p {
      top: 650px;
    }

    img {
      top: 100px;
    }
  }
`;

const Form = styled.form`
  max-width: 600px;
  top: 250px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  button {
    position: relative;
    min-width: 258px;
    width: 65%;
    max-width: 200px;
    height: 54px;
    margin-top: 30px;
    cursor: pointer;

    &:hover {
      box-shadow: inset 6px 4px 10px 6px rgba(0, 0, 0, 0.5);
    }
  }

  @media (min-width: 800px) {
    top: 350px;
    button {
      min-width: 258px;
    }
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
    cursor: pointer;

    font-size: 22px;
  }

  input {
    width: 100%;
    border-color: ${({ passwordValidation }) =>
      passwordValidation ? "#e50000" : "initial"};
  }
`;
