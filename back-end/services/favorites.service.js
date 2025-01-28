const FavoritesModel = require('../models/favorites.model');

class FavoritesService {
  constructor() {
    this.modal = new FavoritesModel();
  }

  createFavorites = async (values, userId) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!value || value.length === 0) {
        throw new Error(`The ${key} is missing parameters`);
      }
    });

    const favotiteList = await this.modal.getFavoritesByUserId(userId);

    favotiteList.forEach(favorite => {
      if(favorite.externalId === values.externalId) {
        throw new Error('The element already exist');
      }
    });

    if(favotiteList.length >= 5) {
      throw new Error('The user already has 5 favorites');
    }

    return await this.modal.createFavorites({values, userId});
  };

  getFavoritesByUserId = async (userId) => {
    const favoriteList = await this.modal.getFavoritesByUserId(userId);
    if (favoriteList.length === 0) throw new Error('The user does not have favorites');
    return favoriteList;
  };

  deleteAllFavoritesByUserId = async (userId) => {
    const favoriteList = await this.modal.getFavoritesByUserId(userId);

    if (favoriteList.length === 0) throw new Error('The user does not have favorites');

    return await this.modal.deleteAllFavoritesByUserId(userId);
  };

  deleteByFavoriteId = async (userId, favoriteId) => {
    const favoriteList = await this.getFavoritesByUserId(userId);

    if (favoriteList.length === 0) throw new Error('The user does not have favorites');

    const favorite = favoriteList.find(favorite => favorite.id === favoriteId);

    if (!favorite) throw new Error('The favorite does not exist');

    await this.modal.deleteByFavoriteId(userId, favoriteId)

    return "Favorite deleted";
  };

}





module.exports = FavoritesService;
