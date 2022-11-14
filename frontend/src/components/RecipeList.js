import { Grid } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeCard from "./RecipeCard";

function RecipeList(props) {
  return props.recipes.map((recipe) => {
    const id = uuidv4();
    const { imageUrl, title, url, nutrition } = recipe;
    return (
      <Grid key={id} item xs={12} md={3}>
        <RecipeCard
          imageUrl={imageUrl}
          title={title}
          url={url}
          nutrition={nutrition}
        />
      </Grid>
    );
  });
}

export default RecipeList;
