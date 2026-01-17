const { getDB } = require("./index");

async function addFeed(feed) {
  const db = getDB();

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO feeds (feed_url, title, image, description, author, last_fetched)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  await stmt.run(
    feed.link,
    feed.title,
    feed.image,
    feed.description,
    feed.author,
    new Date().toISOString()
  );

  await Promise.all(feed.episodes.map(async episode => {
    const episodeStmt = db.prepare(`
      INSERT OR IGNORE INTO episodes (episode_id, feed_url, title, description, audio_url, pub_date, duration)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    await episodeStmt.run(
      episode.episodeId,
      feed.link,
      episode.title,
      episode.description,
      episode.audioUrl,
      episode.pubDate.toISOString(),
      episode.duration,
    );
  }));
}

async function refreshFeed(feed) {
  const db = getDB();
  const exisingEpisodes = await db.prepare("SELECT * FROM episodes WHERE feed_url = ?").all(feed.link);
  const newEpisodes = feed.episodes.filter(episode => !exisingEpisodes.some(e => e.episode_id === episode.episodeId));
  await Promise.all(newEpisodes.map(async episode => {
    const episodeStmt = db.prepare(`
      INSERT OR IGNORE INTO episodes (episode_id, feed_url, title, description, audio_url, pub_date, duration)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    await episodeStmt.run(episode.episodeId, feed.link, episode.title, episode.description, episode.audioUrl, episode.pubDate.toISOString(), episode.duration);
  }));
  await db.prepare("UPDATE feeds SET last_fetched = ? WHERE feed_url = ?").run(new Date().toISOString(), feed.link);
}

function listFeeds() {
  const db = getDB();
  return db.prepare("SELECT * FROM feeds").all();
  // TODO: check if the feed is outdated
}

function getDBFeedByUrl(feedUrl) {
  const db = getDB();
  return db.prepare("SELECT * FROM feeds WHERE feed_url = ?").get(feedUrl);
}

module.exports = {
  addFeed,
  listFeeds,
  refreshFeed,
  getDBFeedByUrl
};
