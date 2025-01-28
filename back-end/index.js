require("dotenv").config({
  path: `.env${process.env.NODE_ENV === "test" ? ".test" : process.env.NODE_ENV === "production" ? ".production" : ""}`,
});

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const statusRoute = require("./routes/status.routes");
const usersRoute = require("./routes/user.routes");
const favoritesController = require("./controllers/favorites.controller");
const authenticateToken = require("./middleware/authorizarion");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use('/', statusRoute);
app.use('/', usersRoute);

app.post("/favorites", authenticateToken, favoritesController.createFavorites);
app.get("/favorites", authenticateToken, favoritesController.getFavoritesByUserId);
app.delete("/favorites", authenticateToken, favoritesController.deleteAllFavoritesByUserId);
app.delete("/favorites/:id", authenticateToken, favoritesController.deleteByFavoriteId);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
