import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

export default function FavoriteButton({ favorite, setFavorite }) {
  return (
    <IconWrapper favorite={favorite}>
      <AiFillStar
        className="favorite-star"
        onClick={() => setFavorite(!favorite)}
      />
    </IconWrapper>
  );
}

const IconWrapper = styled.div`
  padding: 10px;
  display: flex;
  position: absolute;
  color: ${({ favorite }) => (favorite ? "#ff5edb" : "#28161C")};

  .favorite-star {
    cursor: pointer;
    filter: drop-shadow(0px 0px 2px rgba(246, 244, 244, 1));
    stroke-width: 70px;
    stroke: black;
    font-size: 30px;
  }
`;
