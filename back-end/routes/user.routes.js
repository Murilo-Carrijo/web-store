const express = require('express');
const UserController = require("../controllers/users.controller");
const { authenticateToken } = require("../middleware/authorizarion");

const router = express.Router();

const user = new UserController();
router.post("/user/create", (req, res) => user.createUser(req, res));
router.post("/login", (req, res) =>  user.login(req, res));
router.delete("/user/delete", (req, res, next) => {
  authenticateToken(req, res, next);
  user.deleteUserById(req, res);
});

module.exports = router;
