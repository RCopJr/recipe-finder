import { Grid, TextField } from "@mui/material";
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
        <Grid container spacing={2} item xs={12} md={3}>
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
        </Grid>
        <Grid container spacing={2} item xs={12} md={3}>
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
        </Grid>
        <Grid container spacing={2} item xs={12} md={3}>
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
        </Grid>
        <Grid container spacing={2} item xs={12} md={3}>
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
        </Grid>
        <Grid item xs={12}>
          <FilterHeading text="Ingredients:" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(event) => {
              props.handleValueChange(event);
            }}
            label="Include"
            InputLabelProps={{ shrink: true }}
            value={props.includeIngredients}
            name="includeIngredients"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(event) => {
              props.handleValueChange(event);
            }}
            label="Exclude"
            InputLabelProps={{ shrink: true }}
            value={props.excludeIngredients}
            name="excludeIngredients"
            fullWidth
          />
        </Grid>
      </Grid>
    </StyledPaper>
  );
}

export default Filters;
