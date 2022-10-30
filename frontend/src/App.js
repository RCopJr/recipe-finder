import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} alignItems="center" justify="center">
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
            <Button type="submit" variant="contained">
              Go
            </Button>
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
      </form>
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
