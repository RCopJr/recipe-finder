import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import StyledInputBase from "./styled/StyledInputBase";
import StyledSearch from "./styled/StyledSearch";

function Header(props) {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Recipe Finder
        </Typography>
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
