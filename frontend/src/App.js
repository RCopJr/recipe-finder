import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import RecipeCard from "./RecipeCard";

const client = axios.create({
  baseURL: "http://localhost:3000/",
});

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const [extraQueryCheck, setExtraQueryCheck] = useState(false);

  const [values, setValues] = useState({
    maxCarbs: "",
    minProtein: "",
    minCalories: "",
    ingredients: "",
  });

  const { maxCarbs, minProtein, minCalories, ingredients } = values;

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("clicked");
    client
      .get("/search", {
        params: {
          search: search,
          queryParams: values,
        },
      })
      .then((res) => {
        console.log(res.data.recipes);
        setRecipes(res.data.recipes);
      });
  }

  function handleCheckboxChange(event) {
    setExtraQueryCheck(event.target.checked);
  }

  function handleValueChange(event) {
    const name = event.target.name;
    let newValue = event.target.value;

    if (name !== "ingredients" && newValue < 0) {
      newValue = 0;
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  }

  return (
    <div>
      <h1>Recipe Finder</h1>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justify="center"
        wrap="wrap"
      >
        <Grid item xs={8}>
          <TextField
            onChange={handleSearch}
            name="search"
            label="Search field"
            type="search"
            variant="filled"
            value={search}
            fullWidth // Used to take up full width of container
          />
        </Grid>
        <Grid item xs={4}>
          <Button onClick={handleSubmit} type="submit" variant="contained">
            Go
          </Button>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={extraQueryCheck}
                />
              } //The control is what type of input it is (Radio, Switch, Checkbox)
              label="Show query params" //The label assigned to the control field
            />
          </FormGroup>
        </Grid>
        {extraQueryCheck && (
          <Grid item xs={2}>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "10ch" },
              }}
            >
              <TextField
                onChange={handleValueChange}
                label="Carbs (g)"
                type="number"
                InputLabelProps={{ shrink: true }} //What does this do?
                value={maxCarbs}
                name="maxCarbs"
              />

              <TextField
                onChange={handleValueChange}
                label="Mininum Calories"
                type="number"
                InputLabelProps={{ shrink: true }}
                value={minCalories}
                name="minCalories"
              />
            </Box>
          </Grid>
        )}
        {extraQueryCheck && (
          <Grid item xs={2}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "10ch" },
              }}
            >
              <TextField
                onChange={handleValueChange}
                label="Protein (g)"
                type="number"
                InputLabelProps={{ shrink: true }} //What does this do?
                value={minProtein}
                name="minProtein"
              />
              <TextField
                onChange={handleValueChange}
                label="Ingredients"
                InputLabelProps={{ shrink: true }}
                value={ingredients}
                name="ingredients"
              />
            </Box>
          </Grid>
        )}
        {recipes[0] &&
          recipes.map((recipe) => {
            const id = uuidv4();
            const { imageUrl, title, url, nutrition } = recipe;
            return (
              <RecipeCard
                key={id}
                imageUrl={imageUrl}
                title={title}
                url={url}
                nutrition={nutrition}
              />
            );
          })}
      </Grid>
    </div>
  );
}

export default App;
