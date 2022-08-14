import styled from "styled-components";
import __styledVariables from "../global/StyledVariables";

export default function SelectBoxItens({
  searchItem,
  name,
  id,
  setSelectedItem,
}) {
  return (
    <SelectItemWrapper
      searchItem={searchItem}
      name={name}
      onMouseDown={() => setSelectedItem({ id, name })}
    >
      <p>{name}</p>
    </SelectItemWrapper>
  );
}

const SelectItemWrapper = styled.div`
  font-family: ${__styledVariables.mainFont};
  display: ${({ searchItem, name }) =>
    name.toString().includes(searchItem) ? "block" : "none"};
  width: 100%;
  font-size: 18px;
  margin-top: 10px;

  &::after {
    content: "";
    width: 100%;
    margin-top: 3px;
    height: 1px;
    background-color: #00000043;
    display: block;
  }

  &:hover,
  &:active {
    background-color: #00000043;
  }
`;
