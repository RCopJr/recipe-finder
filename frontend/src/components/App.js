import React, { useState, useEffect } from "react";
import {
  AppBar,
  Grid,
  Collapse,
  Button,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import RecipeCard from "./RecipeCard";
import Filters from "./Filters";
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import "../App.css";

const client = axios.create({
  baseURL: "http://localhost:3000/",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#e67911",
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  margin: "auto",
  width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "25ch",
    "&:focus": {
      width: "30ch",
    },
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

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

  useEffect(() => {
    async function getInitialRecipes() {
      const newRecipes = await getRecipes(search, values);
      setRecipes(newRecipes);
    }
    getInitialRecipes();
  }, []);

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
          <Search>
            <StyledInputBase
              onChange={handleSearch}
              value={search}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onKeyDown={handleKeyDown}
            ></StyledInputBase>
          </Search>
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
            {recipes.length > 0 && (
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
