import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function AnimeComponent({ image, title, id }) {
  const navigate = useNavigate();

  return (
    <AnimeWrapper onClick={() => navigate(`/anime/${id}`)}>
      <img src={image} alt={title} />
    </AnimeWrapper>
  );
}

const AnimeWrapper = styled.section`
  width: fit-content;
  margin-right: 18px;
  cursor: pointer;
  transition: 0.5s;

  img {
    width: 98px;
    height: 130px;
    border-radius: 6px;
    object-fit: cover;
  }

  &:hover {
    filter: brightness(0.8);
    transform: scale(1.1);
  }

  @media (min-width: 800px) {
    img {
      width: 147px;
      height: 194px;
    }
  }
`;
