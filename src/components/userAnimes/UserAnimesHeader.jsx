import styled from "styled-components";
import StatusButton from "./StatusButton";

export default function UserAnimesHeader({ setSearchParams, queryString }) {
  const status = ["Watching", "Maybe", "Done"];

  function handleButton(params) {
    setSearchParams({ s: params });
  }

  function handleForm(e) {
    e.preventDefault();
  }

  return (
    <HeaderWrapper>
      <Form onSubmit={handleForm}>
        {status.map((status, index) => {
          return (
            <StatusButton
              key={index}
              status={status}
              queryString={queryString}
              handleButton={(value) => handleButton(value)}
            />
          );
        })}
      </Form>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 62px;
  position: sticky;
  z-index: 10;
  top: -10px;

  background-color: #8f678b;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  @media (min-width: 800px) {
    background-color: #462b43;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  @media (min-width: 800px) {
    max-width: 800px;
    justify-content: space-between;
  }
`;
