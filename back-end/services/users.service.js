const userModel = require("../models/users.model");

const userService = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Missing parameters");
    }
    return await userModel(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = userService;
