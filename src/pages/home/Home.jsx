import ForYou from "../../components/home/ForYou";
import Header from "../../components/Header";
import styled from "styled-components";

export default function Home() {
  return (
    <HomeWrapper>
      <Header />
      <ForYou />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.main`
  height: 100vh;
  background-image: linear-gradient(
    #009090,
    #013827,
    #009090,
    #013827,
    #8f678b
  );
`;
