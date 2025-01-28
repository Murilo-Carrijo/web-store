const database = require("../infra/database");

class StatusModal {
  constructor() {
    this.update_at = new Date().toISOString();
    this.server_version = "";
    this.max_connections = 0;
    this.open_connections = 0;
    this.db = database;
  }

  getDbStatus = async () => {
    const dbVersion = await database.query("SHOW server_version;");
    this.server_version = dbVersion.rows[0].server_version;
    const dbMaxConnections = await database.query("SHOW max_connections;");
    this.max_connections = parseInt(dbMaxConnections.rows[0].max_connections);
    const dbOpenConnections = await database.query({
      text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
      values: [process.env.POSTGRES_DB],
    });
    this.open_connections = parseInt(dbOpenConnections.rows[0].count);

    return {
    update_at: this.update_at,
    server_version: this.server_version,
    max_connections: this.max_connections,
    open_connections: this.open_connections,
  };
  }
}

// const satatusModel = async () => {
//   const dbVersion = await database.query("SHOW server_version;");
//   const dbVersionResult = dbVersion.rows[0].server_version;
//   const dbMaxConnections = await database.query("SHOW max_connections;");
//   const dbMaxConnectionsResult = parseInt(dbMaxConnections.rows[0].max_connections);
//   const dbOpenConnections = await database.query({
//     text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
//     values: [process.env.POSTGRES_DB],
//   });
//   const dbOpenConnectionsResult = parseInt(dbOpenConnections.rows[0].count);

//   return {
//     update_at: new Date().toISOString(),
//     server_version: dbVersionResult,
//     max_connections: dbMaxConnectionsResult,
//     open_connections: dbOpenConnectionsResult,
//   };
// };

module.exports = StatusModal;
