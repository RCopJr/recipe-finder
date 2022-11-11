import React from "react";
import { Typography, Divider } from "@mui/material";

function FilterHeading(props) {
  return (
    <>
      <Typography variant="h6">{props.text}</Typography>
      <Divider />
    </>
  );
}

export default FilterHeading;
