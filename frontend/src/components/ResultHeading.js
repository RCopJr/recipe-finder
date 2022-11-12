import { Typography } from "@mui/material";
import React from "react";
function ResultHeading(props) {
  return (
    <>
      <Typography variant="h4">Results</Typography>
      <Typography variant="subtitle2">
        {props.recipes.length} recipes found
      </Typography>
    </>
  );
}

export default ResultHeading;
