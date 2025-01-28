require("dotenv").config({
  path: `.env${process.env.NODE_ENV === "test" ? ".test" : process.env.NODE_ENV === "production" ? ".production" : ""}`,
});

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const statusRoute = require("./routes/status.routes");
const usersRoute = require("./routes/user.routes");
const favoritesRoute = require("./routes/favorites.routes");
const authenticateToken = require("./middleware/authorizarion");
const cors = require("cors");

app.use(express.json());
app.use(cors());

console.log('cheguei');


app.use('/', statusRoute);
app.use('/', usersRoute);
app.use('/favorites', favoritesRoute);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
