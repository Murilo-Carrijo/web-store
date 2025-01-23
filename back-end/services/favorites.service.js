const favoritesModel = require('../models/favorites.model');

const createFavorites = async (values) => {
  Object.entries(values).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
    if (!value || value.length === 0) {
      throw new Error(`The ${key} is missing parameters`);
    }
  });

  return await favoritesModel.createFavorites(values);
};

module.exports = {
  createFavorites
};
