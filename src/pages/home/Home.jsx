import styled from "styled-components";

import ForYou from "../../components/home/ForYou";
import Header from "../../components/Header";
import ThisSeason from "../../components/home/ThisSeason";
import MostPopular from "../../components/home/MostPopular";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HomeWrapper>
        <ForYou />
        <ThisSeason />
        <MostPopular />
      </HomeWrapper>
      <Footer />
    </>
  );
}

const HomeWrapper = styled.main`
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
`;
