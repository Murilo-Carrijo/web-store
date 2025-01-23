const favoritesService = require('../services/favorites.service');

const createFavorites = async (req, res) => {
  try {
    await favoritesService.createFavorites(req.body);
    return res.status(201).json({ message: "Favorites created"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createFavorites
};
