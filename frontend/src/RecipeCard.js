import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function RecipeCard(props) {
  const { imageUrl, title, url, nutrition } = props;
  return (
    <Card variant="outlined">
      <CardMedia component="img" height="160" image={imageUrl} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <a href={url}>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            See recipe here.
          </Typography>
        </a>
        {nutrition.map((nutrient) => {
          const id = uuidv4();
          const { name, amount, unit } = nutrient;
          return (
            <Typography key={id}>
              {name}: {amount} {unit}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
