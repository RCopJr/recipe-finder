import {
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Nutrient from "./Nutrient";
import StyledCard from "./styled/StyledCard";

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
            noWrap
            gutterBottom
          >
            {title}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100px" }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Cals (kcal)</TableCell>
                  <TableCell align="center">Fat (g)</TableCell>
                  <TableCell align="center">Carbs (g)</TableCell>
                  <TableCell align="center">Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {nutrition.map((nutrient) => {
                    const id = uuidv4();
                    return <Nutrient key={id} nutrient={nutrient} />;
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
