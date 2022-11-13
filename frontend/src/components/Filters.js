import { Grid, TextField } from "@mui/material";
import React from "react";
import FilterHeading from "./FilterHeading";
import FilterRangeField from "./FilterRangeField";
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
        <Grid container spacing={2} item xs={12} sm={6} md={3}>
          <Grid item xs={12}>
            <FilterHeading text="Calories (kcal):" />
          </Grid>
          <Grid container spacing={2} item xs={12}>
            <FilterRangeField
              min={props.minCalories}
              minName="minCalories"
              max={props.maxCalories}
              maxName="maxCalories"
              handleFilterChange={props.handleFilterChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} sm={6} md={3}>
          <Grid item xs={12}>
            <FilterHeading text="Carbs (g):" />
          </Grid>
          <Grid container spacing={2} item xs={12}>
            <FilterRangeField
              min={props.minCarbs}
              minName="minCarbs"
              max={props.maxCarbs}
              maxName="maxCarbs"
              handleFilterChange={props.handleFilterChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} sm={6} md={3}>
          <Grid item xs={12}>
            <FilterHeading text="Protein (g):" />
          </Grid>
          <Grid container spacing={2} item xs={12}>
            <FilterRangeField
              min={props.minProtein}
              minName="minProtein"
              max={props.maxProtein}
              maxName="maxProtein"
              handleFilterChange={props.handleFilterChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} sm={6} md={3}>
          <Grid item xs={12}>
            <FilterHeading text="Fat (g):" />
          </Grid>
          <Grid container spacing={2} item xs={12}>
            <FilterRangeField
              min={props.minFat}
              minName="minFat"
              max={props.maxFat}
              maxName="maxFat"
              handleFilterChange={props.handleFilterChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FilterHeading text="Ingredients:" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event) => {
              props.handleFilterChange(event);
            }}
            label="Include"
            InputLabelProps={{ shrink: true }}
            value={props.includeIngredients}
            name="includeIngredients"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event) => {
              props.handleFilterChange(event);
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
