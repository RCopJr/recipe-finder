require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/search", function (req, res) {
  const search = req.query.search;
  const { maxCarbs, minProtein, minCal, ingredients } = req.query.queryParams;
  console.log(maxCarbs, minProtein, minCal, ingredients);

  axios
    .get("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        apiKey: process.env.API_KEY,
        number: 1,
        minCalories: minCal,
        minProtein: minProtein,
        maxCarbs: maxCarbs,
        ingredients: ingredients,
        addRecipeInformation: true,
        query: search,
      },
    })
    .then((response) => {
      const result = response.data.results[0];
      const title = result.title;
      const sourceUrl = result.sourceUrl;
      res.json({ title: title, url: sourceUrl });
    });
});

app.listen(5000, function () {
  console.log("Server started on port 3000.");
});
