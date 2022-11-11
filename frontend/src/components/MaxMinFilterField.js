import React from "react";
import { Grid, TextField } from "@mui/material";

function MaxMinFilterField(props) {
  return (
    <>
      <Grid item xs={6}>
        <TextField
          onChange={(event) => {
            props.handleValueChange(event);
          }}
          label="Min"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={props.min}
          name={props.minName}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          onChange={(event) => {
            props.handleValueChange(event);
          }}
          label="Max"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={props.max}
          name={props.maxName}
          fullWidth
        />
      </Grid>
    </>
  );
}

export default MaxMinFilterField;
