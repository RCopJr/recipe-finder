import React from "react";
import { TextField, Grid, Typography, Divider, Paper } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

function Filters(props) {
  return (
    <StyledPaper>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        wrap="wrap"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography variant="h6">Carbs:</Typography>
          <Divider />
        </Grid>
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
        <Grid item xs={12}>
          <Typography variant="h6">Calories:</Typography>
          <Divider />
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
        <Grid item xs={12}>
          <Typography variant="h6">Protein:</Typography>
          <Divider />
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
        <Grid item xs={12}>
          <Typography variant="h6">Ingredients:</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
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
    </StyledPaper>
  );
}

export default Filters;
