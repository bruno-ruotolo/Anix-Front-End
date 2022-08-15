import styled from "styled-components";
import __styledVariables from "../../global/StyledVariables";

export default function StatusButton({ handleButton, queryString, status }) {
  const value = status.toLowerCase();

  return (
    <StatusButtonWrapper value={value} queryString={queryString}>
      <button onClick={() => handleButton(value)}>{status}</button>
    </StatusButtonWrapper>
  );
}

const StatusButtonWrapper = styled.div`
  button {
    width: 94px;
    height: 44.29px;
    cursor: pointer;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    color: ${({ value, queryString }) =>
      `?s=${value}` === queryString
        ? __styledVariables.inputFontColor
        : __styledVariables.buttonFontColor};
    box-shadow: inset 0px 2px 2px 3px rgba(0, 0, 0, 0.25);

    background-color: ${({ value, queryString }) =>
      `?s=${value}` === queryString || null
        ? "#009190"
        : __styledVariables.buttonMainColor};
  }

  @media (min-width: 800px) {
    button {
      width: 150px;
      font-size: 23px;
    }
  }
`;
