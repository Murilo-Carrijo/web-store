const UserMOdal = require("../models/users.model");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

class UserService {
  constructor() {
    this.modal = new UserMOdal();
    this.emelRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  }
  createUser = async ({ email, password, name }) => {
    const trimNmae = name.trim();
    try {
      if (!email || email.length === 0) throw new Error("Missing parameters");
      if (!password || password.length === 0) throw new Error(`Missing parameters${password}`);
      if (!trimNmae || trimNmae.length === 0) throw new Error("Missing parameters");

      const checkEmail = emailRegex.test(email);
      if (!checkEmail) throw new Error("This email is invalid");
      const user = await this.modal.getByEmail(email);
      if (password.length < 6) throw new Error("The password must be at least 6 characters");
      if (trimNmae.length < 3) throw new Error("The name must be at least 3 characters");

      if (user) throw new Error("User already exists");

      const passwordCrypto = crypto.createHash('md5').update(password).digest('hex');
      return await this.modal.createUser(email, passwordCrypto, name);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  login = async (body) => {
    const { email, password } = body;
    if (!email || !password) throw new Error("Missing parameters");

    const checkEmail = emailRegex.test(email);
    if (!checkEmail) throw new Error("This email is invalid");
    if (password.length < 6) throw new Error("The password must be at least 6 characters");

    const passwordCrypto = crypto.createHash('md5').update(password).digest('hex');

    const user = await this.modal.login(email, passwordCrypto);
    if (!user) throw new Error("Email or password incorrect");

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    const secret = process.env.SECRET_KEY;

    const token = jwt.sign(payload, secret, { expiresIn: '24h' });

    return token;
  };

  deleteUserById = async (id) => {
    const user = await this.modal.deleteUserById(id);
    if (!user) throw new Error("User not found");
    return user;
  };
}




module.exports = UserService;
