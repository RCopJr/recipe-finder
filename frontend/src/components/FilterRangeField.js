import { Grid, TextField } from "@mui/material";
import React from "react";

function FilterRangeField(props) {
  return (
    <>
      <Grid item xs={6}>
        <TextField
          onChange={(event) => {
            props.handleFilterChange(event);
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
            props.handleFilterChange(event);
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

export default FilterRangeField;
