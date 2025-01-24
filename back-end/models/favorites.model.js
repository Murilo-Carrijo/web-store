const database = require("../infra/database");

const createFavorites = async ({values, userId}) => {
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
  const dbResponse = await database.query({
    text: queryText,
    values: [externalId, title, price, category, description, image, userId],
  });
  return dbResponse.rows[0];
};

const getFavoritesByUserId = async (userId) => {
  const queryText = `
    SELECT * FROM favorites WHERE "userId" = $1;
  `;

  const dbResponse = await database.query({
    text: queryText,
    values: [userId],
  });
  return dbResponse.rows;
};

module.exports = {
  createFavorites,
  getFavoritesByUserId
}
