import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/",
});

function App() {
  const [search, setSearch] = useState("");
  const [recipe, setRecipe] = useState({
    title: "",
    url: "",
  });
  const [checkboxes, setCheckboxes] = useState({
    maxCarbs: false,
    minProtein: false,
    minCal: false,
    ingredients: false,
  });

  const [values, setValues] = useState({
    maxCarbs: "",
    minProtein: "",
    minCal: "",
    ingredients: "",
  });

  const { showMaxCarbs, showMinProtein, showMinCal, showIngredients } =
    checkboxes;

  const { maxCarbs, minProtein, minCal, ingredients } = values;

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    client
      .get("/search", {
        params: {
          search: search,
        },
      })
      .then((res) => {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          title: res.data.title,
          url: res.data.url,
        }));
      });
  }

  function handleCheckboxChange(event) {
    const name = event.target.name;
    const newCheckedValue = event.target.checked; //How does this work? Shouldn't we be returning opposite of checked?
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: newCheckedValue,
    }));
  }

  function handleValueChange(event) {
    const name = event.target.name;
    const newValue = event.target.value;
    console.log(name, newValue);
    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  }

  return (
    <div>
      <h1>Test</h1>
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
                  checked={showMaxCarbs}
                  name="maxCarbs"
                />
              } //The control is what type of input it is (Radio, Switch, Checkbox)
              label="Max Carbs" //The label assigned to the control field
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={showMinProtein}
                  name="minProtein"
                />
              }
              label="Min Protein"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={showMinCal}
                  name="minCal"
                />
              }
              label="Min Calories"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={showIngredients}
                  name="ingredients"
                />
              }
              label="Ingredients"
            />
          </FormGroup>
        </Grid>
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
              value={minCal}
              name="minCal"
            />
          </Box>
        </Grid>
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
              type="number"
              InputLabelProps={{ shrink: true }}
              value={ingredients}
              name="ingredients"
            />
          </Box>
        </Grid>
        {recipe.title && recipe.url && (
          <Grid item xs={8}>
            <Card variant="outlined">
              <CardContent>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {recipe.title}
                  </Typography>
                  <a href={recipe.url}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      See recipe here.
                    </Typography>
                  </a>
                </CardContent>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default App;
// useEffect(() => {
//   // client.get("/test").then((response) => console.log(response.data));
//   client
//     .post("", {
//       data: "poop",
//     })
//     .then((response) => {
//       console.log("Worked");
//     });
// }, []);
