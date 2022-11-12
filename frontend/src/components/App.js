import { Collapse, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import FilterButton from "./FilterButton";
import Filters from "./Filters";
import Header from "./Header";
import RecipeList from "./RecipeList";
import ResultHeading from "./ResultHeading";
const client = axios.create({
  baseURL: "http://localhost:3000/",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#e67911",
      contrastText: "#fff",
    },
  },
});

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const [values, setValues] = useState({
    minFat: "",
    maxFat: "",
    minCarbs: "",
    maxCarbs: "",
    minProtein: "",
    maxProtein: "",
    minCalories: "",
    maxCalories: "",
    includeIngredients: "",
  });

  const [expanded, setExpanded] = useState(false);

  const {
    minCarbs,
    maxCarbs,
    minFat,
    maxFat,
    minProtein,
    maxProtein,
    minCalories,
    maxCalories,
    includeIngredients,
  } = values;

  async function getRecipes(search, values) {
    try {
      const response = await client.get("/search", {
        params: {
          search: search,
          queryParams: values,
        },
      });
      return response.data.recipes;
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      const newRecipes = await getRecipes(search, values);
      setRecipes(newRecipes);
    }
  }

  function handleFilterClick() {
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

  useEffect(() => {
    async function getInitialRecipes() {
      const newRecipes = await getRecipes(search, values);
      setRecipes(newRecipes);
    }
    //getInitialRecipes();
  });

  return (
    <ThemeProvider theme={theme}>
      <Header
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
        search={search}
      />
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        wrap="wrap"
      >
        <Grid container item justifyContent="space-between" xs={11}>
          <Grid item xs={5}>
            {recipes && recipes.length > 0 && (
              <ResultHeading recipes={recipes} />
            )}
          </Grid>
          <Grid item xs="auto">
            <FilterButton
              handleFilterClick={handleFilterClick}
              expanded={expanded}
            />
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Filters
              handleValueChange={handleValueChange}
              minCalories={minCalories}
              maxCalories={maxCalories}
              minFat={minFat}
              maxFat={maxFat}
              minCarbs={minCarbs}
              maxCarbs={maxCarbs}
              minProtein={minProtein}
              maxProtein={maxProtein}
              includeIngredients={includeIngredients}
            />
          </Collapse>
        </Grid>
        {recipes[0] && <RecipeList recipes={recipes} />}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
