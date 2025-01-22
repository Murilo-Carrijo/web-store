require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const statusController = require("./controllers/status.controller");
const usersController = require("./controllers/users.controller");

app.use(express.json());

app.get("/status", statusController);
app.post("/users", usersController);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
