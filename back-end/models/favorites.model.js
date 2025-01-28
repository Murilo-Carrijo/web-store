const database = require("../infra/database");

class FavoritesModal {
  constructor() {
    this.database = database;
  }

  createFavorites = async ({values, userId}) => {
    const queryText = `
      INSERT INTO favorites (
        "externalId",
        title,
        price,
        category,
        description,
        image,
        "userId"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      );
    `;

    const { externalId, title, price, category, description, image } = values;
    const dbResponse = await this.database.query({
      text: queryText,
      values: [externalId, title, price, category, description, image, userId],
    });
    return dbResponse.rows[0];
  };

  getFavoritesByUserId = async (userId) => {
    const queryText = `
      SELECT * FROM favorites WHERE "userId" = $1;
    `;

    const dbResponse = await this.database.query({
      text: queryText,
      values: [userId],
    });
    return dbResponse.rows;
  };

  deleteAllFavoritesByUserId = async (userId) => {
    const queryText = `
      DELETE FROM favorites WHERE "userId" = $1;
    `;

    await this.database.query({
      text: queryText,
      values: [userId],
    });

    return [];
  };

  deleteByFavoriteId = async (userId, favoriteId) => {
    const queryText = `
      DELETE FROM favorites WHERE "userId" = $1 AND "id" = $2;
    `;

    await this.database.query({
      text: queryText,
      values: [userId, favoriteId],
    });

    const otherFavorites = await this.getFavoritesByUserId(userId);

    return otherFavorites;
  };
}





module.exports = FavoritesModal;
