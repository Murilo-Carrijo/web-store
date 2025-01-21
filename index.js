require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5432;

app.get("/", (req, res) => {
  res.status(200).json({messge: "Hello World"});
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
