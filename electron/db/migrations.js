function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS feeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      feed_url TEXT UNIQUE NOT NULL,
      title TEXT UNIQUE NOT NULL,
      image TEXT,
      description TEXT,
      author TEXT NOT NULL,
      last_fetched DATETIME NOT NULL,
      UNIQUE(feed_url, title)
    );

    CREATE TABLE IF NOT EXISTS episodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      episode_id TEXT UNIQUE NOT NULL,
      feed_url TEXT NOT NULL,
      title TEXT,
      description TEXT,
      audio_url TEXT NOT NULL,
      pub_date DATE NOT NULL,
      duration INTEGER NOT NULL,
      progress INTEGER DEFAULT 0,
      finished BOOLEAN DEFAULT FALSE,
      FOREIGN KEY(feed_url) REFERENCES feeds(feed_url) ON DELETE CASCADE
    );
  `);
}

module.exports = migrate;
