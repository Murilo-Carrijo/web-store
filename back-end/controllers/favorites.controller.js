const favoritesService = require('../services/favorites.service');

const createFavorites = async (req, res) => {
  try {
    await favoritesService.createFavorites(req.body);
    return res.status(201).json({ message: "Favorites created"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getFavoritesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favorites = await favoritesService.getFavoritesByUserId(userId);
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createFavorites,
  getFavoritesByUserId
};
