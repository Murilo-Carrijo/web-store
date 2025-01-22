require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const database = require("./infra/database");

app.get("/status", async (req, res) => {
  const dbVersion = await database.query("SHOW server_version;");
  const dbVersionResult = dbVersion.rows[0].server_version;
  const dbMaxConnections = await database.query("SHOW max_connections;");
  const dbMaxConnectionsResult = parseInt(dbMaxConnections.rows[0].max_connections);
  const dbOpenConnections = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });
  const dbOpenConnectionsResult = parseInt(dbOpenConnections.rows[0].count);

  result = {
    update_at: new Date().toISOString(),
    server_version: dbVersionResult,
    max_connections: dbMaxConnectionsResult,
    open_connections: dbOpenConnectionsResult,
  }

  return res.status(200).json(result);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
