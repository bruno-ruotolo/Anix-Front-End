import { BsMoonFill } from "react-icons/bs";
import styled from "styled-components";

export default function RateButton({ value, setRate, rate }) {
  return (
    <IconWrapper rate={rate} value={value}>
      <BsMoonFill
        value={value}
        className="moon-rate"
        onClick={() => setRate(value)}
      />
    </IconWrapper>
  );
}

const IconWrapper = styled.div`
  display: flex;
  color: ${({ rate, value }) => (value <= rate ? "#C274FF" : "#28161C")};

  .moon-rate {
    font-size: 22px;
    margin-right: 12px;
    cursor: pointer;
  }

  @media (min-width: 800px) {
    .moon-rate {
      font-size: 32px;
    }
  }
`;
