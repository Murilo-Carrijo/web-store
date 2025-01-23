const database = require("../infra/database");

const createUser = async (email, password, name) => {
  const dbResponse = await database.query({
    text: "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *;",
    values: [email, password, name],
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

const login = async (email, password) => {
  const dbResponse = await database.query({
    text: "SELECT * FROM users WHERE email = $1 AND password = $2;",
    values: [email, password],
  });
  return dbResponse.rows[0];
};

module.exports = {
  createUser,
  getByEmail,
  login
};
