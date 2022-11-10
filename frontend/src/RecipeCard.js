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
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function RecipeCard(props) {
  const { imageUrl, title, url, nutrition } = props;
  return (
    <Card variant="outlined">
      <CardMedia component="img" height="140" image={imageUrl} />
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          variant="h5"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100px" }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Cals</TableCell>
                <TableCell align="center">Carbs(g)</TableCell>
                <TableCell align="center">Protein(g)</TableCell>
                <TableCell align="center">Fat(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {nutrition.map((nutrient) => {
                  const id = uuidv4();
                  const { amount } = nutrient;
                  return (
                    <TableCell key={id} align="center">
                      {Math.round(amount)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Button href={url}>View</Button>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
