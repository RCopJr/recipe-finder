import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import React from "react";

function FilterButton(props) {
  return (
    <Button
      onClick={(event) => {
        props.handleFilterClick(event);
      }}
      variant="contained"
    >
      {props.expanded ? "Hide" : "Filters"}
      <MoreVertIcon fontSize="small" />
    </Button>
  );
}

export default FilterButton;
