import React, { useState } from "react";
import { Button, TextField, Grid, Collapse } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import RecipeCard from "./RecipeCard";

const client = axios.create({
  baseURL: "http://localhost:3000/",
});

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const [values, setValues] = useState({
    maxCarbs: "",
    minProtein: "",
    minCalories: "",
    includeIngredients: "",
  });

  const [expanded, setExpanded] = useState(false);

  const { maxCarbs, minProtein, minCalories, includeIngredients } = values;

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
    setExpanded(!expanded);
  }

  function handleValueChange(event) {
    const name = event.target.name;
    let newValue = event.target.value;

    if (name !== "includeIngredients" && newValue < 0) {
      newValue = 0;
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        wrap="wrap"
      >
        <Grid item xs={12}>
          <Grid alignItems="center" justify="center" container spacing={2}>
            <Grid item xs={9}>
              <TextField
                onChange={handleSearch}
                name="search"
                label="Search field"
                type="search"
                variant="filled"
                value={search}
                // fullWidth // Used to take up full width of container
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleSubmit} variant="contained">
                Find
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleCheckboxChange} variant="contained" fullWidth>
            {expanded ? (
              <RemoveCircleOutlineRoundedIcon />
            ) : (
              <AddCircleOutlineRoundedIcon />
            )}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              wrap="wrap"
              spacing={2}
            >
              <Grid item xs={6}>
                <TextField
                  onChange={handleValueChange}
                  label="Maximum Carbs (g)"
                  type="number"
                  InputLabelProps={{ shrink: true }} //What does this do?
                  value={maxCarbs}
                  name="maxCarbs"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={handleValueChange}
                  label="Minimum Calories"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  value={minCalories}
                  name="minCalories"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={handleValueChange}
                  label="Minimum Protein (g)"
                  type="number"
                  InputLabelProps={{ shrink: true }} //What does this do?
                  value={minProtein}
                  name="minProtein"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={handleValueChange}
                  label="Include Ingredients"
                  InputLabelProps={{ shrink: true }}
                  value={includeIngredients}
                  name="includeIngredients"
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
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
    </>
  );
}

export default App;
