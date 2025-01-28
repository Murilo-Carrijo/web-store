const express = require('express');
const FavoritesController = require("../controllers/favorites.controller");
const authenticateToken = require("../middleware/authorizarion");

const router = express.Router();

const favorites = new FavoritesController();
router.post("/", authenticateToken, (req, res) => favorites.createFavorites(req, res));
router.get("/", authenticateToken, (req, res) => favorites.getFavoritesByUserId(req, res));
router.delete("/", authenticateToken, (req, res,) =>favorites.deleteAllFavoritesByUserId(req, res));
router.delete("/:id", authenticateToken, (req, res) => favorites.deleteByFavoriteId(req, res));

module.exports = router;