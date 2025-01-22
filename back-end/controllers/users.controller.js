const userService = require("../services/users.service");

const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body);
    console.log('req.body', req.body);

    return res.status(201).json({ message: "User created"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createUser
};
