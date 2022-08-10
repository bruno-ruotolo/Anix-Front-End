import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function AnimeComponent({ image, title, key }) {
  const navigate = useNavigate();

  return (
    <SeasonAnimeWrapper onClick={() => navigate(`anime/${key}`)}>
      <img src={image} alt={title} />
    </SeasonAnimeWrapper>
  );
}

const SeasonAnimeWrapper = styled.section`
  width: fit-content;
  margin-right: 18px;
  cursor: pointer;
  transition: 0.5s;
  img {
    width: 98px;
    height: 130px;
    border-radius: 6px;
  }

  &:hover {
    filter: brightness(0.7);
  }
`;
