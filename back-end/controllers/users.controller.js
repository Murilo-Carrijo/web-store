const userService = require("../services/users.service");

const usersController = async (req, res) => {
  try {
    await userService(req.body);
    console.log('req.body', req.body);

    return res.status(201).json({ message: "User created"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = usersController;
