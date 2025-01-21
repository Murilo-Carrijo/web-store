require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const database = require("./infra/database");

app.get("/", async (req, res) => {
  const result = await database.query("SELECT NOW()");
  console.log(result.rows[0]);
  res.status(200).json(result.rows[0]);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
