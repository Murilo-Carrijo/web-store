const statusModal = require("../models/status.model");

const statusService = async () => {
  return await statusModal();
}

module.exports = statusService;
