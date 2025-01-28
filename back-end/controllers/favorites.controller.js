const FavoritesService = require('../services/favorites.service');

class FavoritesController {
  constructor() {
    this.services = new FavoritesService();
  }

  createFavorites = async (req, res) => {
    try {
      const user = req.user;
      await this.services.createFavorites(req.body, user.id);
      return res.status(201).json({ message: "Favorites created"});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  getFavoritesByUserId = async (req, res) => {
    try {
      const user = req.user;
      const favorites = await this.services.getFavoritesByUserId(user.id);
      return res.status(200).json(favorites);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  deleteAllFavoritesByUserId = async (req, res) => {
    try {
      const user = req.user;
      const deteleList = await this.services.deleteAllFavoritesByUserId(user.id);
      return res.status(200).json(deteleList);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  deleteByFavoriteId = async (req, res) => {
    try {
      const user = req.user;
      const favoriteId = Number(req.params.id);
      const message = await this.services.deleteByFavoriteId(user.id, favoriteId);
      return res.status(200).json({ message: message});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = FavoritesController;
