const path = require("path");
const Database = require("better-sqlite3");
const migrate = require("./migrations");
const { app } = require("electron");

let db;

function initDB() {
  const dbPath = path.join(app.getPath("userData"), "podcasts.db");

  db = new Database(dbPath);

  // Safety & performance defaults
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  migrate(db);

  return db;
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}

function getOrInitDB() {
  if (!db) {
    db = initDB();
  }
  return db;
}

module.exports = {
  initDB,
  getDB,
  getOrInitDB,
};
