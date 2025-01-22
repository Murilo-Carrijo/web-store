const userModel = require("../models/users.model");
const crypto = require('crypto');
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

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

const login = async (body) => {
  const { email, password } = body;
  if (!email || !password) throw new Error("Missing parameters");

  const checkEmail = emailRegex.test(email);
  if (!checkEmail) throw new Error("This email is invalid");
  if (password.length < 6) throw new Error("The password must be at least 6 characters");

  const passwordCrypto = crypto.createHash('md5').update(password).digest('hex');

  const user = await userModel.login(email, passwordCrypto);
  if (!user) throw new Error("Email or password incorrect");

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updateAt: user.updateAt
  };
};

module.exports = {
  createUser,
  login
};
