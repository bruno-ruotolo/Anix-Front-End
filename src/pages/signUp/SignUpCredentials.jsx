import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RiEye2Line, RiEyeCloseFill } from "react-icons/ri";

import { SignUpContext } from "../../contexts/SignUpContext";

import AnixLogo from "../../assets/AnixLogo.png";
import __styledVariables from "../../global/StyledVariables";
import signUpService from "../../services/signUpService";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";

export default function SignUpCredentials() {
  const navigate = useNavigate();

  const { signUp, setSignUp } = useContext(SignUpContext);

  useEffect(() => {
    if (signUp?.email && signUp?.password) navigate("/signup/infos");
  }, [signUp, navigate]);

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
  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });

  async function handleForm(e) {
    e.preventDefault();
    e.persist();
    setPageLoading(true);
    if (signUpData.password !== signUpData.confirmPassword) {
      Swal.fire({
        title: "Passwords must be equals!",
        text: "Check your password confirmation",
        width: "90%",
        fontSize: 20,
        background: "#F3EED9",
        confirmButtonColor: `${__styledVariables.buttonMainColor}`,
        color: `${__styledVariables.inputFontColor}`,
        icon: "error",
      });
      setPageLoading(false);
      setValidations({ ...validations, password: true });
    } else {
      try {
        await signUpService.validateEmail({ email: signUpData.email });
        setValidations({ ...validations, password: false });
        delete signUpData.confirmPassword;
        setSignUp({ ...signUp, ...signUpData });
        setPageLoading(false);
        navigate("/signup/infos");
      } catch (e) {
        if (e.response.status === 409) {
          Swal.fire({
            title: "Invalid Email",
            text: "This email isn't available",
            width: "90%",
            fontSize: 20,
            background: "#F3EED9",
            confirmButtonColor: `${__styledVariables.buttonMainColor}`,
            color: `${__styledVariables.inputFontColor}`,
            icon: "error",
          });
          setPageLoading(false);
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
          setPageLoading(false);
        }
      }
    }
  }

  function handleInput(e, property) {
    setSignUpData({ ...signUpData, [property]: e.target.value });
  }

  function handleShowPassword(status, property) {
    if (status === false) {
      setShowPassword({ ...showPassword, [property]: true });
    } else setShowPassword({ ...showPassword, [property]: false });
  }

  return (
    <SignUpCredentialsMain>
      <img src={AnixLogo} alt="AnixLogo" />
      <Form onSubmit={handleForm}>
        <input
          id="signup-email"
          type="email"
          placeholder="Email"
          autoComplete="true"
          value={signUpData.email}
          onChange={(e) => handleInput(e, "email")}
          disabled={pageLoading}
          required
        />
        <PaswordInputDiv>
          <input
            id="signup-password"
            type={showPassword.password ? "text" : "password"}
            placeholder="Password"
            autoComplete="true"
            value={signUpData.password}
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
        <PaswordInputDiv passwordValidation={validations.password}>
          <input
            id="signup-confirm-password"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Confirm Password"
            autoComplete="true"
            pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            title="Must have 8 characters, at least one letter, one number and one special character"
            value={signUpData.confirmPassword}
            onChange={(e) => handleInput(e, "confirmPassword")}
            disabled={pageLoading}
            required
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
        <button
          id="signup-credential-button"
          type="submit"
          disabled={pageLoading}
        >
          {pageLoading ? (
            <TailSpin
              width="40"
              height="80"
              radius="2"
              color={__styledVariables.buttonFontColor}
            />
          ) : (
            "Continue"
          )}
        </button>
      </Form>

      <p id="navigate-signin" onClick={() => navigate("/")}>
        Have you already done it? Login here!
      </p>
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
    cursor: pointer;
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
  max-width: 700px;
  bottom: 150px;

  button {
    cursor: pointer;
    position: relative;
    min-width: 258px;
    width: 65%;
    max-width: 300px;
    height: 54px;
    margin-top: 30px;
  }

  @media (min-width: 800px) {
    bottom: 280px;
  }
`;

const PaswordInputDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 85%;

  .eyeIcon {
    cursor: pointer;
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
