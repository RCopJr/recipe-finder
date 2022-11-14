import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import StyledInputBase from "./styled/StyledInputBase";
import StyledSearch from "./styled/StyledSearch";

function Header(props) {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          component="img"
          sx={{
            display: { xs: "none", sm: "block" },
            pl: 1,
            height: 80,
          }}
          alt="logo"
          src="./recipe-finder-high-resolution-color-logo-2.png"
        />
        <Box
          component="img"
          sx={{
            display: { xs: "block", sm: "none" },
            height: 70,
          }}
          alt="logo"
          src="./recipe-finder-high-resolution-color-logo-small.png"
        />
        <StyledSearch>
          <StyledInputBase
            onChange={(event) => {
              props.handleSearch(event);
            }}
            value={props.search}
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            onKeyDown={(event) => {
              props.handleKeyDown(event);
            }}
            color="textPrimary"
          ></StyledInputBase>
        </StyledSearch>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
