import { Grid, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import FilterHeading from "./FilterHeading";
import MaxMinFilterField from "./MaxMinFilterField";
import StyledPaper from "./styled/StyledPaper";

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
          <FilterHeading text="Calories (kcal):" />
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <MaxMinFilterField
            min={props.minCalories}
            minName="minCalories"
            max={props.maxCalories}
            maxName="maxCalories"
            handleValueChange={props.handleValueChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FilterHeading text="Carbs (g):" />
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <MaxMinFilterField
            min={props.minCarbs}
            minName="minCarbs"
            max={props.maxCarbs}
            maxName="maxCarbs"
            handleValueChange={props.handleValueChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FilterHeading text="Protein (g):" />
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <MaxMinFilterField
            min={props.minProtein}
            minName="minProtein"
            max={props.maxProtein}
            maxName="maxProtein"
            handleValueChange={props.handleValueChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FilterHeading text="Fat (g):" />
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <MaxMinFilterField
            min={props.minFat}
            minName="minFat"
            max={props.maxFat}
            maxName="maxFat"
            handleValueChange={props.handleValueChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FilterHeading text="Include:" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => {
              props.handleValueChange(event);
            }}
            label="Ingredients"
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
