const favoritesService = require('../services/favorites.service');

const createFavorites = async (req, res) => {
  try {
    const user = req.user;
    await favoritesService.createFavorites(req.body, user.id);
    return res.status(201).json({ message: "Favorites created"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getFavoritesByUserId = async (req, res) => {
  try {
    const user = req.user;
    const favorites = await favoritesService.getFavoritesByUserId(user.id);
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createFavorites,
  getFavoritesByUserId
};
