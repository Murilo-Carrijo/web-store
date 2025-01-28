const StatusModal = require("../models/status.model");

class StatusService {
  constructor() {
    this.modal = new StatusModal();
  }


  getStatus = async () => {
    return await this.modal.getDbStatus();
  }
}


module.exports = StatusService;
