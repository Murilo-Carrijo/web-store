const database = require("../infra/database");

const satatusModel = async () => {
  const dbVersion = await database.query("SHOW server_version;");
  const dbVersionResult = dbVersion.rows[0].server_version;
  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbMaxConnectionsResult = parseInt(dbMaxConnections.rows[0].max_connections);
  const dbOpenConnections = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });
  const dbOpenConnectionsResult = parseInt(dbOpenConnections.rows[0].count);

  return {
    update_at: new Date().toISOString(),
    server_version: dbVersionResult,
    max_connections: dbMaxConnectionsResult,
    open_connections: dbOpenConnectionsResult,
  };
};

module.exports = satatusModel;
