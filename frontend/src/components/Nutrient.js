import { TableCell, Typography } from "@mui/material";
import React from "react";

function Nutrient(props) {
  const { amount } = props.nutrient;
  return (
    <TableCell align="center">
      <Typography variant="subtitle2">{Math.round(amount)}</Typography>
    </TableCell>
  );
}

export default Nutrient;
