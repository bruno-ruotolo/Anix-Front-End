import ForYou from "../../components/home/ForYou";
import Header from "../../components/Header";
import styled from "styled-components";
import ThisSeason from "../../components/home/ThisSeason";
import MostPopular from "../../components/home/MostPopular";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <HomeWrapper>
      <Header />
      <ForYou />
      <ThisSeason />
      <MostPopular />
      <Footer />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.main`
  min-height: 100vh;
  padding-bottom: 108px;
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
