const UserService = require("../services/users.service");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req, res) => {
    try {
      await this.userService.createUser(req.body);
      return res.status(201).json({ message: "User created"});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  login = async (req, res) => {
    try {
      const token = await this.userService.login(req.body);
      return res.status(200).json({ token});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  deleteUserById = async (req, res) => {
    try {
      const user = req.user
      await this.userService.deleteUserById(user.id);
      return res.status(200).json({ message: "User deleted"});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}


module.exports = UserController;
