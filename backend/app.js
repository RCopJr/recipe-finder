require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));

app.get("/test", function (req, res) {
  res.json({ testData: "estsetse" });
});

app.listen(5000, function () {
  console.log("Server started on port 3000.");
});
