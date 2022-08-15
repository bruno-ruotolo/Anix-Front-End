import styled from "styled-components";

import ForYou from "../../components/home/ForYou";
import ThisSeason from "../../components/home/ThisSeason";
import MostPopular from "../../components/home/MostPopular";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Home() {
  return (
    <>
      <HomeWrapper>
        <Header />
        <ForYou />
        <ThisSeason />
        <MostPopular />
      </HomeWrapper>
      <Footer />
    </>
  );
}

const HomeWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 108px;
  width: 100vw;
  position: relative;
  height: fit-content;
  background-image: linear-gradient(
    #009090,
    #013827,
    #009090,
    #013827,
    #594d7d
  );

  @media (min-width: 800px) {
    flex-wrap: wrap;
    padding-bottom: 80px;
  }
`;
