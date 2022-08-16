import React, { useState } from "react";
import styled from "styled-components";
import SelectBoxItens from "./SelectBoxItens";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

export default function SelectBox({
  list,
  setSelectedItem,
  placeholder,
  width,
  height,
  type = "text",
  id,
}) {
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState("");
  const [idInput, setIdInput] = useState();

  return (
    <SelectWrapper>
      <Form
        onBlur={() => setIsActive(false)}
        width={width}
        onSubmit={(e) => {
          e.preventDefault();
          setIsActive(false);

          const item = list?.find((list) => {
            if (list.year) return list.year.toString().includes(input);
            else return list.name.includes(input);
          });
          if (item) {
            setSelectedItem({ id: item.id, name: item.name || item.year });
            setInput(item.name || item.year);
            setIdInput(item.id);
          }
        }}
      >
        <InputDiv height={height}>
          {isActive ? (
            <FaSearch
              onClick={() => setIsActive(false)}
              className="search-icon"
            />
          ) : (
            <IoMdArrowDropdown
              onClick={() => setIsActive(true)}
              className="arrow-down-icon"
            />
          )}
          <input
            id={id}
            type={type}
            onFocus={() => setIsActive(true)}
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target.value.length === 0) setSelectedItem();
            }}
            placeholder={placeholder || ""}
            value={input}
          />
        </InputDiv>

        <SelectList isActive={isActive} height={height}>
          {list?.map(({ name, id, year }) => {
            return (
              <SelectBoxItens
                searchItem={input}
                key={id}
                name={name || year}
                id={id}
                setIsActive={(value) => setIsActive(value)}
                setSelectedItem={(value) => {
                  setSelectedItem(value);
                  setInput(value.name);
                  setIdInput(value.id);
                }}
              />
            );
          })}
        </SelectList>
      </Form>
    </SelectWrapper>
  );
}

const SelectWrapper = styled.section`
  width: fit-content;
  position: relative;
  height: fit-content;

  @media (max-width: 800px) {
    max-width: 200px;
  }
`;

const Form = styled.form`
  width: ${({ width }) => (width ? width : "200px")};
  height: fit-content;
  position: relative;

  @media (max-width: 800px) {
    max-width: 200px;
  }
`;

const SelectList = styled.div`
  display: ${({ isActive }) => (isActive ? "flex" : "none")};
  position: absolute;
  top: ${({ height }) => (height ? height : "0")};
  z-index: 10;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 10px;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;

  @media (max-width: 800px) {
    max-width: 200px;
  }
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    right: 10px;
    font-size: 20px;
    z-index: 15;
  }

  .arrow-down-icon {
    position: absolute;
    right: 0;
    font-size: 40px;
    z-index: 15;
  }

  input {
    min-width: 0;
    min-height: 0;
    height: ${({ height }) => (height ? height : "50px")};
    width: 100%;
    margin-bottom: 2px;
    padding-right: 0;

    @media (max-width: 800px) {
      max-width: 200px;
    }

    &::placeholder {
      font-size: 18px;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }
  }
`;
