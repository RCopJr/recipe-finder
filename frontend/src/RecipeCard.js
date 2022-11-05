import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function RecipeCard(props) {
  const { imageUrl, title, url, nutrition } = props;
  return (
    <Card variant="outlined">
      <CardMedia component="img" height="160" image={imageUrl} />
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          variant="h5"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
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
      <CardActions>
        <Button href={url}>View</Button>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
