const { getDB } = require("./index");

function addFeed(feed) {
  const db = getDB();

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO feeds (feed_url, title, image, description, author, last_fetched)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    feed.link,
    feed.title,
    feed.image,
    feed.description,
    feed.author,
    new Date().toISOString()
  );

  feed.episodes.forEach(episode => {
    const episodeStmt = db.prepare(`
      INSERT OR IGNORE INTO episodes (episode_id, feed_url, title, description, audio_url, pub_date, duration)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    episodeStmt.run(
      episode.episodeId,
      episode.feedUrl,
      episode.title,
      episode.description,
      episode.audioUrl,
      episode.pubDate.toISOString(),
      episode.duration,
    );
  });
}

function listFeeds() {
  const db = getDB();
  return db.prepare("SELECT * FROM feeds").all();
  // TODO: check if the feed is outdated
}

module.exports = {
  addFeed,
  listFeeds,
};
