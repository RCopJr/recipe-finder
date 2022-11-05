import React from "react";
import { TextField, Grid } from "@mui/material";
function Filters(props) {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="center"
      wrap="wrap"
      spacing={2}
    >
      <Grid item xs={6}>
        <TextField
          onChange={(event) => {
            props.handleValueChange(event);
          }}
          label="Maximum Carbs (g)"
          type="number"
          InputLabelProps={{ shrink: true }} //What does this do?
          value={props.maxCarbs}
          name="maxCarbs"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          onChange={(event) => {
            props.handleValueChange(event);
          }}
          label="Minimum Calories"
          type="number"
          InputLabelProps={{ shrink: true }}
          value={props.minCalories}
          name="minCalories"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          onChange={(event) => {
            props.handleValueChange(event);
          }}
          label="Minimum Protein (g)"
          type="number"
          InputLabelProps={{ shrink: true }} //What does this do?
          value={props.minProtein}
          name="minProtein"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          onChange={(event) => {
            props.handleValueChange(event);
          }}
          label="Include Ingredients"
          InputLabelProps={{ shrink: true }}
          value={props.includeIngredients}
          name="includeIngredients"
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default Filters;
