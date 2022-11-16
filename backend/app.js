require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

const cardData = ["Protein", "Calories", "Fat", "Carbohydrates"];

async function searchRecipes(search, filteredParams) {
  try {
    return await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: process.env.API_KEY,
          number: 5,
          addRecipeInformation: true,
          addRecipeNutrition: true,
          query: search,
          ...filteredParams,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
}

app.get("/search", async (req, res) => {
  const { search, queryParams } = req.query;
  let filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(([_, v]) => v != "")
  ); //Remove empty parameters
  const response = await searchRecipes(search, filteredParams);
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

app.listen(PORT, function () {
  console.log("Server started on port 3001.");
});
