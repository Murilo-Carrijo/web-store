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

const deleteAllFavoritesByUserId = async (req, res) => {
  try {
    const user = req.user;
    const deteleList = await favoritesService.deleteAllFavoritesByUserId(user.id);
    return res.status(200).json(deteleList);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteByFavoriteId = async (req, res) => {
  try {
    const user = req.user;
    const favoriteId = Number(req.params.id);
    await favoritesService.deleteByFavoriteId(user.id, favoriteId);
    return res.status(200).json({ message: "Favorite deleted"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createFavorites,
  getFavoritesByUserId,
  deleteAllFavoritesByUserId,
  deleteByFavoriteId
};
