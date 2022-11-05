import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Collapse,
  Paper,
  IconButton,
  InputBase,
  Divider,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import RecipeCard from "./RecipeCard";
import Filters from "./Filters";

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

  function handleCheckboxChange() {
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
        direction="row"
        alignItems="center"
        justifyContent="center"
        wrap="wrap"
      >
        <Grid item xs={11}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleCheckboxChange}
              sx={{ p: "10px" }}
              aria-label="expand"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <InputBase
              onChange={handleSearch}
              placeholder="Search Recipes"
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ "aria-label": "search recipes" }}
              value={search}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              onClick={handleSubmit}
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={11}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Filters
              handleValueChange={handleValueChange}
              minCalories={minCalories}
              maxCarbs={maxCarbs}
              minProtein={minProtein}
              includeIngredients={includeIngredients}
            />
          </Collapse>
        </Grid>
        {recipes[0] &&
          recipes.map((recipe) => {
            const id = uuidv4();
            const { imageUrl, title, url, nutrition } = recipe;
            return (
              <Grid key={id} item xs={11}>
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
    </>
  );
}

export default App;
