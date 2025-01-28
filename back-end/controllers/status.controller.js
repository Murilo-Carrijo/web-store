const StatusService = require('../services/status.service');

class StatusController {
  constructor() {
    this.statusService = new StatusService();
  }

  getStatus = async (_req, res) => {
    const status = await this.statusService.getStatus();
    return res.status(200).json(status);
  }
}

module.exports = StatusController;
