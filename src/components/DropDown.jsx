import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import __styledVariables from "../global/StyledVariables";

export default function DropDown({
  type,
  array,
  setCallBack,
  disabled,
  id,
  width = "85%",
  height = 55,
  statusId,
}) {
  const [value, setValue] = useState(statusId || "");
  const [select, setSelect] = useState(false);

  const handleChange = (event) => {
    setCallBack(event.target.value);
    setValue(event.target.value);
  };

  return (
    <Box
      id={id}
      sx={{ minWidth: "85%", marginBottom: 3 }}
      onMouseDown={() => setSelect(!select)}
    >
      <GenderInputDiv>
        <FormControl id={`${id}-form`} variant="filled">
          <InputLabel id="demo-simple-select-label">{type}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            disabled={disabled}
            label={type}
            onChange={handleChange}
          >
            {array?.map((genre) => {
              const { id, name } = genre;
              return (
                <MenuItem id="menu-item" key={id} value={id}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </GenderInputDiv>
    </Box>
  );
}

const GenderInputDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  #demo-simple-select {
    box-sizing: border-box;
    display: flex;

    align-items: center;
    background-color: ${__styledVariables.inputMainColor};
    border-radius: 10px;
    border-color: ${__styledVariables.inputFontColor};
    border-width: 2px;
    border-style: solid;

    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: ${__styledVariables.inputFontColor};
  }

  #demo-simple-select-label {
    font-family: ${__styledVariables.mainFont};
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    text-shadow: #ccc 0px 0 0px;
    color: ${__styledVariables.inputFontColor};
    filter: opacity(0.75);
  }

  svg {
    font-size: 40px;
    color: ${__styledVariables.inputFontColor};
  }
`;
