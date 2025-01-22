const database = require("../infra/database");

const userModel = async (email, password) => {
  const dbResponse = await database.query({
    text: "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;",
    values: [email, password],
  });
  return dbResponse.rows[0];
};

module.exports = userModel;
