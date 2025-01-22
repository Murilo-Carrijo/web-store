const userModel = require("../models/users.model");
const crypto = require('crypto');

const createUser = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Missing parameters");
    }
    const user = await userModel.getByEmail(email);

    if (user) {
      throw new Error("User already exists");
    }

    const passwordCrypto = crypto.createHash('md5').update(password).digest('hex');
    return await userModel.createUser(email, passwordCrypto);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser
};
