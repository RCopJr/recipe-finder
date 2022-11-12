import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  AppBar,
  Button,
  Collapse,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import Filters from "./Filters";
import RecipeCard from "./RecipeCard";
import StyledInputBase from "./styled/StyledInputBase";
import StyledSearch from "./styled/StyledSearch";

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
  typography: {
    poster: {
      color: "white",
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
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Recipe Finder
          </Typography>
          <StyledSearch>
            <StyledInputBase
              onChange={handleSearch}
              value={search}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onKeyDown={handleKeyDown}
              color="textPrimary"
            ></StyledInputBase>
          </StyledSearch>
        </Toolbar>
      </AppBar>
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
              <>
                <Typography variant="h4">Results</Typography>
                <Typography variant="subtitle2">
                  {recipes.length} recipes found
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs="auto">
            <Button onClick={handleFilterClick} variant="contained">
              {expanded ? "Hide" : "Filters"}
              <MoreVertIcon fontSize="small" />
            </Button>
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
        {recipes[0] &&
          recipes.map((recipe) => {
            const id = uuidv4();
            const { imageUrl, title, url, nutrition } = recipe;
            return (
              <Grid key={id} item xs={11} md={4}>
                <RecipeCard
                  imageUrl={imageUrl}
                  title={title}
                  url={url}
                  nutrition={nutrition}
                />
              </Grid>
            );
          })}
      </Grid>
    </ThemeProvider>
  );
}

export default App;
