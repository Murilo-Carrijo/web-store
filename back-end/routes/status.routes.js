const express = require('express');
const statusController = require("../controllers/status.controller");

const router = express.Router();

const status = new statusController();
router.get("/status", (req, res) => status.getStatus(req, res));

module.exports = router;
