const favoritesModel = require('../models/favorites.model');

const createFavorites = async (values, userId) => {
  Object.entries(values).forEach(([key, value]) => {
    if (!value || value.length === 0) {
      throw new Error(`The ${key} is missing parameters`);
    }
  });

  const favotiteList = await favoritesModel.getFavoritesByUserId(userId);

  favotiteList.forEach(favorite => {
    if(favorite.externalId === values.externalId) {
      throw new Error('The element already exist');
    }
  });

  if(favotiteList.length >= 5) {
    throw new Error('The user already has 5 favorites');
  }

  return await favoritesModel.createFavorites({values, userId});
};

const getFavoritesByUserId = async (userId) => {
  return await favoritesModel.getFavoritesByUserId(userId);
};

const deleteAllFavoritesByUserId = async (userId) => {
  const favoriteList = await favoritesModel.getFavoritesByUserId(userId);

  if (favoriteList.length === 0) throw new Error('The user does not have favorites');

  return await favoritesModel.deleteAllFavoritesByUserId(userId);
};

const deleteByFavoriteId = async (userId, favoriteId) => {
  const favoriteList = await favoritesModel.getFavoritesByUserId(userId);

  if (favoriteList.length === 0) throw new Error('The user does not have favorites');

  const favorite = favoriteList.find(favorite => favorite.id === favoriteId);

  if (!favorite) throw new Error('The favorite does not exist');

  return await favoritesModel.deleteByFavoriteId(userId, favoriteId);
};

module.exports = {
  createFavorites,
  getFavoritesByUserId,
  deleteAllFavoritesByUserId,
  deleteByFavoriteId
};
