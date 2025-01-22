require("dotenv").config({
  path: `.env${process.env.NODE_ENV === "test" ? ".test" : process.env.NODE_ENV === "production" ? ".production" : ""}`,
});

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const statusController = require("./controllers/status.controller");
const usersController = require("./controllers/users.controller");
const database = require("./infra/database");

app.use(express.json());

app.get("/status", statusController);
app.post("/users", usersController.createUser);
app.post("/login", usersController.login);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
