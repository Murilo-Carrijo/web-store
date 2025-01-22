const statusService = require("../services/status.service");

const statusController = async (req, res) => {
  const status = await statusService();
  return res.status(200).json(status);
}

module.exports = statusController;
