import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardActionArea,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 4,
  transition: "box-shadow .3s",
  ":hover": {
    "box-shadow": "0 2px 5px rgba(60, 60, 93, 0.33)",
  },
}));

function RecipeCard(props) {
  const { imageUrl, title, url, nutrition } = props;
  return (
    <StyledCard variant="outlined">
      <CardActionArea href={url}>
        <CardMedia component="img" height="140" image={imageUrl} />
        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            variant="h6"
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100px" }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Cals (kcal)</TableCell>
                  <TableCell align="center">Carbs (g)</TableCell>
                  <TableCell align="center">Protein (g)</TableCell>
                  <TableCell align="center">Fat (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {nutrition.map((nutrient) => {
                    const id = uuidv4();
                    const { amount } = nutrient;
                    return (
                      <TableCell key={id} align="center">
                        <Typography variant="subtitle2">
                          {Math.round(amount)}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

export default RecipeCard;
