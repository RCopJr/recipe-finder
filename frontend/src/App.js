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
    nutrition: [],
  });

  const { title, url, nutrition } = recipe;

  const [extraQueryCheck, setExtraQueryCheck] = useState(false);

  const [values, setValues] = useState({
    maxCarbs: "",
    minProtein: "",
    minCal: "",
    ingredients: "",
  });

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
          queryParams: values,
        },
      })
      .then((res) => {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          title: res.data.title,
          url: res.data.url,
          nutrition: res.data.nutrition,
        }));
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
                value={minCal}
                name="minCal"
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
                    {title}
                  </Typography>
                  <a href={url}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      See recipe here.
                    </Typography>
                  </a>
                  {nutrition.map((nutrient) => {
                    return (
                      <Typography>
                        {nutrient.name}: {nutrient.amount} {nutrient.unit}
                      </Typography>
                    );
                  })}
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
