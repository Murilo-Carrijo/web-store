const database = require("../infra/database");

const createUser = async (email, password) => {
  const dbResponse = await database.query({
    text: "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;",
    values: [email, password],
  });
  return dbResponse.rows[0];
};

const getByEmail = async (email) => {
  const dbResponse = await database.query({
    text: "SELECT * FROM users WHERE email = $1;",
    values: [email],
  });
  return dbResponse.rows[0];
};

module.exports = {
  createUser,
  getByEmail,
};
