import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import __styledVariables from "../global/StyledVariables";

export default function DropDown({ type, array, setCallBack, disabled }) {
  const [value, setValue] = useState();
  const [genreSelect, setGenreSelect] = useState(false);
  const handleChange = (event) => {
    setCallBack(event.target.value);
  };

  return (
    <Box
      sx={{ minWidth: "85%", height: 55, marginBottom: 3 }}
      onMouseDown={() => setGenreSelect(!genreSelect)}
    >
      <GenderInputDiv>
        <FormControl variant="filled" fullWidth>
          <InputLabel id="demo-simple-select-label">{type}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            disabled={disabled}
            label={type}
            onChange={handleChange}
            styles={{ backgroundColor: "red" }}
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
