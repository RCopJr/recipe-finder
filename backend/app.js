require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cardData = ["Protein", "Calories", "Fat", "Carbohydrates"];

app.get("/search", (req, res) => {
  const search = req.query.search;
  const params = req.query.queryParams;
  let filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != "")
  ); //Remove empty parameters

  axios
    .get("https://api.spoonacular.com/recipes/complexSearch", {
      params: {
        apiKey: process.env.API_KEY,
        number: 5,
        addRecipeInformation: true,
        addRecipeNutrition: true,
        query: search,
        ...filteredParams,
      },
    })
    .then((response) => {
      const results = response.data.results;
      const formattedRecipes = results.map((result) => {
        const {
          title,
          sourceUrl,
          image: imageUrl,
          nutrition: { nutrients },
        } = result;
        const nutrition = nutrients.filter((nutrient) => {
          return cardData.includes(nutrient.name);
        });

        return {
          imageUrl: imageUrl,
          title: title,
          url: sourceUrl,
          nutrition: nutrition,
        };
      });

      res.json({ recipes: formattedRecipes });
    });
});

app.listen(3001, function () {
  console.log("Server started on port 3001.");
});
