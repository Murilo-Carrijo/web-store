const database = require("../infra/database");
const FavoritesModal = require("./favorites.model");

class UserModal {
  constructor() {
    this.database = database;
    this.favoritesModel = new FavoritesModal();
  }

  createUser = async (email, password, name) => {
    const dbResponse = await this.database.query({
      text: "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *;",
      values: [email, password, name],
    });
    return dbResponse.rows[0];
  };

  getByEmail = async (email) => {
    const dbResponse = await this.database.query({
      text: "SELECT * FROM users WHERE email = $1;",
      values: [email],
    });
    return dbResponse.rows[0];
  };

  login = async (email, password) => {
    const dbResponse = await this.database.query({
      text: "SELECT * FROM users WHERE email = $1 AND password = $2;",
      values: [email, password],
    });
    return dbResponse.rows[0];
  };

  deleteUserById = async (id) => {
    this.favoritesModel.deleteAllFavoritesByUserId(id);
    await this.database.query({
      text: "DELETE FROM users WHERE id = $1;",
      values: [id],
    });

    return true;
  };
}




module.exports = UserModal;
