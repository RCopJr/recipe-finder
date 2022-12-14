import { Collapse, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/App.css";
import FilterButton from "./FilterButton";
import Filters from "./Filters";
import Header from "./Header";
import RecipeList from "./RecipeList";
import ResultHeading from "./ResultHeading";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f77f00",
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
    excludeIngredients: "",
  });
  const [filtersExpanded, setFiltersExpanded] = useState(false);

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
    excludeIngredients,
  } = values;

  async function getRecipes(search, values) {
    try {
      const response = await axios.get("/search", {
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
    setFiltersExpanded(!filtersExpanded);
  }

  function handleFilterChange(event) {
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
    getInitialRecipes();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <ResultHeading recipes={recipes} />
          </Grid>
          <Grid item xs="auto">
            <FilterButton
              handleFilterClick={handleFilterClick}
              filtersExpanded={filtersExpanded}
            />
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <Collapse in={filtersExpanded} timeout="auto" unmountOnExit>
            <Filters
              handleFilterChange={handleFilterChange}
              minCalories={minCalories}
              maxCalories={maxCalories}
              minFat={minFat}
              maxFat={maxFat}
              minCarbs={minCarbs}
              maxCarbs={maxCarbs}
              minProtein={minProtein}
              maxProtein={maxProtein}
              includeIngredients={includeIngredients}
              excludeIngredients={excludeIngredients}
            />
          </Collapse>
        </Grid>
        <Grid container spacing={2} item xs={11}>
          {recipes[0] && <RecipeList recipes={recipes} />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
